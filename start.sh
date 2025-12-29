#!/bin/bash

echo "🚀 Starting GUSAR - SAR Data Visualizer"
echo "========================================"
echo ""

# Start backend in background
echo "🔧 Starting backend server..."
cd server
node server.js &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

# Start frontend
echo "🎨 Starting frontend..."
cd client
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Application started!"
echo ""
echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
