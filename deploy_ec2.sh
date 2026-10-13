#!/bin/bash
set -e

echo "=========================================================="
echo "🚀 Deploying AI Psychiatric Engine to AWS EC2"
echo "=========================================================="

# 1. Install Docker & Docker Compose if missing
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker $USER
fi

# 2. Check for backend/.env
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env from .env.example..."
    cp backend/.env.example backend/.env
    echo "⚠️ Please edit backend/.env with your real OPENAI_API_KEY / GROQ_API_KEY before starting containers!"
    echo "Run: nano backend/.env"
    exit 1
fi

# 3. Build & start containers
echo "Building and launching containers via Docker Compose..."
sudo docker compose down --remove-orphans || true
sudo docker compose up -d --build

echo ""
echo "=========================================================="
echo "✅ Deployment Complete!"
echo "Containers running:"
sudo docker compose ps
echo ""
echo "🌐 Access your app at: http://$(curl -s ifconfig.me)"
echo "=========================================================="
