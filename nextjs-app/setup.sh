#!/bin/bash

# Setup script for Next.js Image Stylization App
# This script will copy model files and images from the original project

echo "Setting up Next.js Image Stylization App..."
echo ""

# Check if we're in the nextjs-app directory
if [[ ! "$PWD" =~ nextjs-app$ ]]; then
    echo "ERROR: Please run this script from the nextjs-app directory"
    exit 1
fi

# Check if parent directory has the required files
PARENT_DIR=$(dirname "$PWD")
REQUIRED_DIRS=(
    "saved_model_style_js"
    "saved_model_style_inception_js"
    "saved_model_transformer_js"
    "saved_model_transformer_separable_js"
    "images"
)

echo "Checking for required model directories..."
MISSING_DIRS=()
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ ! -d "$PARENT_DIR/$dir" ]; then
        MISSING_DIRS+=("$dir")
    fi
done

if [ ${#MISSING_DIRS[@]} -gt 0 ]; then
    echo "ERROR: Missing required directories:"
    for dir in "${MISSING_DIRS[@]}"; do
        echo "  - $dir"
    done
    echo ""
    echo "Please ensure you have the original project files in the parent directory."
    exit 1
fi

# Create public directory if it doesn't exist
echo "Creating public directory..."
mkdir -p public

# Copy directories
echo ""
echo "Copying model files and images..."
for dir in "${REQUIRED_DIRS[@]}"; do
    echo "  Copying $dir..."
    rm -rf "public/$dir"
    cp -r "$PARENT_DIR/$dir" "public/$dir"
done

echo ""
echo "✓ Model files and images copied successfully!"
echo ""

# Install dependencies
echo "Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Setup completed successfully!"
    echo ""
    echo "To start the development server, run:"
    echo "  npm run dev"
    echo ""
    echo "Then open http://localhost:3000 in your browser"
else
    echo ""
    echo "ERROR: Failed to install dependencies"
    echo "Please run 'npm install' manually"
    exit 1
fi
