#!/bin/bash

echo "🚀 GUSAR - SAR Data Visualizer Setup"
echo "===================================="
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    echo ""
    echo "Please install Node.js and npm first:"
    echo "  Ubuntu/Debian: sudo apt install nodejs npm"
    echo "  Fedora/RHEL: sudo dnf install nodejs npm"
    echo "  Arch: sudo pacman -S nodejs npm"
    echo ""
    exit 1
fi

echo "📦 Installing backend dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..

echo ""
echo "📦 Installing frontend dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..

echo ""
echo "✅ Installation complete!"
echo ""
echo "To start the application:"
echo "  1. Start the backend:  cd server && npm start"
echo "  2. Start the frontend: cd client && npm run dev"
echo ""
echo "Or use: ./start.sh"
