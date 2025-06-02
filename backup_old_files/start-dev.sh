#!/bin/bash

# AI Assistant Landing Page - Development Startup Script
# This script ensures you're always in the right directory

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change to the ai-assistant-landing directory (our main app)
cd "$SCRIPT_DIR/ai-assistant-landing"

# Verify we're in the right place
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in ai-assistant-landing directory."
    echo "📍 Current directory: $(pwd)"
    exit 1
fi

# Show where we are
echo "✅ Ready to develop!"
echo "📍 Project directory: $(pwd)"
echo "🚀 Starting development server..."
echo ""

# Start the development server
npm run dev 