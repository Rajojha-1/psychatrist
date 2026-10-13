# 🧠 AI Stealth Psychiatric Waiting-Room Intake & Clinical Telemetry Engine

A dual-pass psychiatric intake application that serves as a soothing, casual conversational companion for patients in a clinical waiting room while silently compiling a comprehensive Mental Status Examination (MSE) and diagnostic dossier for the attending psychiatrist.

---

## 🌟 Key Features

1. **Anti-Cringe Rogerian Companion (Pass A):**
   - Engages waiting patients in grounded, natural conversation.
   - Zero therapy clichés or robotic liability scripts (`"I hear you"`, `"Your feelings are valid"` are strictly banned).
   - Culturally aware and adapts to patient energy (including informal venting and Hinglish).

2. **9-Domain Psychiatric Intake Battery (Pass B):**
   - Silent background clinical evaluation running on an advanced LLM (Groq / OpenAI compatible).
   - Evaluates:
     - Linguistic Self-Focus & Fatalism
     - DSM-5 Affect & Emotional Valence
     - Cognitive Distortions (Catastrophizing, All-or-Nothing, Personalization, etc.)
     - Somatic & Sleep Architecture
     - Triage Safety Rating (Green / Amber / Red)
     - 9-Domain Intake Coverage with strict 8–12 turn pacing.
   - Dynamic Turn Steering: Injects secret directives into Pass A to explore missing clinical domains without interrogating.

3. **Confidential Doctor Clinical Dossier (Pass C):**
   - Synthesizes the dialogue and telemetry into a board-certified Psychiatric Mental Status Examination (MSE).
   - Provides provisional diagnostic impressions and high-yield consultation angles for the doctor's upcoming appointment.

4. **ChatGPT-Inspired Web Interface:**
   - Dark minimalist chat canvas with real-time streaming bubbles.
   - Secret **Doctor Clinical HUD Drawer** to observe live psychometrics, affect gauges, and dynamic steering directives.
   - Printable confidential medical dossier modal.

---

## 🚀 Quick Start

### 1. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # On Windows
pip install -r requirements.txt

# Configure your API key in .env (copy from .env.example)
cp .env.example .env

# Run FastAPI server
uvicorn app.main:app --port 8000 --reload
```

*Or run the interactive CLI terminal test harness:*
```bash
python terminal_test.py
```

### 2. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
Click **Doctor HUD** in the top-right navbar to view live clinical telemetry.

---

## ☁️ AWS EC2 Deployment (Production)

### 1. Launch EC2 Instance:
- **AMI:** Ubuntu 22.04 or 24.04 LTS
- **Instance Type:** `t3.small` or `t3.medium` (recommended)
- **Security Group (Inbound Rules):**
  - **SSH (Port 22):** Your IP
  - **HTTP (Port 80):** `0.0.0.0/0` (Web UI & Nginx Reverse Proxy)
  - **HTTPS (Port 443):** `0.0.0.0/0` (SSL if configured)
  - **Custom TCP (Port 8000):** Optional / testing direct API access

### 2. SSH into your EC2 and Run:

```bash
git clone https://github.com/Rajojha-1/psychatrist.git
cd psychatrist

# Create your .env and insert your Groq/OpenAI API key:
cp backend/.env.example backend/.env
nano backend/.env

# Run automated deployment:
chmod +x deploy_ec2.sh
./deploy_ec2.sh
```

Done! Your full stack (MongoDB + FastAPI + React Nginx) is now live on your EC2 public IP.

---

## 🔄 Automated CI/CD (GitHub Actions)

A full CI/CD pipeline is configured in `.github/workflows/deploy.yml`. On every `git push` to `main`, GitHub Actions will:
1. Validate and test backend dependencies and Pydantic schemas.
2. Build the production React application bundle.
3. SSH into your EC2 instance, pull the latest code, and rebuild Docker containers with zero downtime!

### To activate CI/CD:
In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**:
- `EC2_HOST`: Your EC2 Public IP (e.g. `100.30.202.11`)
- `EC2_USER`: `ubuntu`
- `EC2_SSH_KEY`: The entire content of your AWS `.pem` private key file (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`).

