#!/bin/bash

echo "Starting One-App development server..."

# Start Next.js One-App server on port 3000
cd /home/andy/cursor/obs-cur/work/onpager/One-App
echo "Starting Next.js One-App server on port 3000..."
npm run dev &
NEXT_PID=$!

# Wait for server to start
sleep 5

echo "Server started:"
echo "Next.js One-App: http://localhost:3000 (PID: $NEXT_PID)"

# Keep script running and show status
echo "Press Ctrl+C to stop the server"
trap "echo 'Stopping server...'; kill $NEXT_PID 2>/dev/null; exit" INT

while true; do
    sleep 10
    if ! kill -0 $NEXT_PID 2>/dev/null; then
        echo "Next.js server stopped"
        break
    fi
done
