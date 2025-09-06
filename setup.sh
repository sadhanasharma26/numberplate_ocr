#!/bin/bash

echo "🚀 Setting up Number Plate OCR Web Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ npm dependencies installed successfully"
else
    echo "❌ Failed to install npm dependencies"
    exit 1
fi

# Check if Python is installed (optional for backend)
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 detected: $(python3 --version)"
    echo "📦 Installing Python dependencies for backend OCR..."
    pip3 install opencv-python easyocr imutils numpy pillow
    
    if [ $? -eq 0 ]; then
        echo "✅ Python dependencies installed successfully"
    else
        echo "⚠️  Failed to install Python dependencies. Backend OCR will not be available."
    fi
else
    echo "⚠️  Python 3 not detected. Backend OCR will not be available."
    echo "   You can still use the client-side OCR functionality."
fi

# Create uploads directory for backend
mkdir -p server/uploads

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "  Frontend only: npm run dev"
echo "  With backend:  npm run server (in another terminal)"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "📚 For more information, see README_WEBAPP.md"
