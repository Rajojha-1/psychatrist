import os
import json
import logging
from typing import Dict, Any, Optional, List
from datetime import datetime
from dotenv import load_dotenv
import time

load_dotenv()

logger = logging.getLogger("psychologist_db")

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "psychiatric_intake_db"

# Fallback local in-memory/file storage if Mongo daemon isn't running
local_sessions: Dict[str, Dict[str, Any]] = {}
local_dossiers: Dict[str, Dict[str, Any]] = {}

MAX_LOCAL_SESSIONS = 100
SESSION_TTL_SECONDS = 7200  # 2 hours


def _evict_stale_local_sessions():
    """Remove expired sessions and enforce max capacity for in-memory fallback."""
    now = time.time()
    expired = [sid for sid, data in local_sessions.items()
               if now - data.get("_created_ts", now) > SESSION_TTL_SECONDS]
    for sid in expired:
        del local_sessions[sid]
    while len(local_sessions) > MAX_LOCAL_SESSIONS:
        oldest = min(local_sessions, key=lambda s: local_sessions[s].get("_created_ts", 0))
        del local_sessions[oldest]

mongo_client = None
db = None
use_mongo = False

async def init_db():
    global mongo_client, db, use_mongo
    try:
        from motor.motor_asyncio import AsyncIOMotorClient
        client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        # Test connection
        await client.server_info()
        mongo_client = client
        db = client[DB_NAME]
        use_mongo = True
        logger.info("Successfully connected to MongoDB!")
    except Exception as e:
        logger.warning(f"MongoDB not reachable ({e}). Using robust in-memory/file fallback storage.")
        use_mongo = False

async def save_session(session_data: Dict[str, Any]):
    session_id = session_data["session_id"]
    if use_mongo and db is not None:
        try:
            await db.sessions.update_one(
                {"session_id": session_id},
                {"$set": session_data},
                upsert=True
            )
            return
        except Exception as e:
            logger.error(f"Mongo save error: {e}")
    _evict_stale_local_sessions()
    session_data.setdefault("_created_ts", time.time())
    local_sessions[session_id] = session_data

async def get_session(session_id: str) -> Optional[Dict[str, Any]]:
    if use_mongo and db is not None:
        try:
            doc = await db.sessions.find_one({"session_id": session_id})
            if doc and "_id" in doc:
                del doc["_id"]
            return doc
        except Exception as e:
            logger.error(f"Mongo fetch error: {e}")
    return local_sessions.get(session_id)

async def list_active_sessions() -> List[Dict[str, Any]]:
    if use_mongo and db is not None:
        try:
            cursor = db.sessions.find().sort("created_at", -1)
            results = []
            async for doc in cursor:
                if "_id" in doc:
                    del doc["_id"]
                results.append(doc)
            return results
        except Exception as e:
            logger.error(f"Mongo list error: {e}")
    return list(local_sessions.values())

async def save_dossier(dossier_data: Dict[str, Any]):
    session_id = dossier_data["session_id"]
    if use_mongo and db is not None:
        try:
            await db.dossiers.update_one(
                {"session_id": session_id},
                {"$set": dossier_data},
                upsert=True
            )
            return
        except Exception as e:
            logger.error(f"Mongo dossier save error: {e}")
    local_dossiers[session_id] = dossier_data

async def get_dossier(session_id: str) -> Optional[Dict[str, Any]]:
    if use_mongo and db is not None:
        try:
            doc = await db.dossiers.find_one({"session_id": session_id})
            if doc and "_id" in doc:
                del doc["_id"]
            return doc
        except Exception as e:
            logger.error(f"Mongo dossier fetch error: {e}")
    return local_dossiers.get(session_id)
