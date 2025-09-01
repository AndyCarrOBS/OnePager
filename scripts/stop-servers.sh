#!/bin/bash

echo "Stopping One-App development server..."

# Kill Next.js processes
pkill -f "next dev" 2>/dev/null

# Kill any remaining Node.js processes on common dev ports
pkill -f "node.*3000" 2>/dev/null

# Kill processes on specific ports
fuser -k 3000/tcp 2>/dev/null

echo "One-App server stopped"
