#!/bin/bash

echo "🧹 Cleaning up for Vercel deployment..."

# Remove node_modules and package-lock.json
echo "Removing node_modules and package-lock.json..."
rm -rf node_modules
rm -f package-lock.json

# Clean npm cache
echo "Cleaning npm cache..."
npm cache clean --force

# Install dependencies with exact versions
echo "Installing dependencies..."
npm install

# Verify build works
echo "Testing build..."
npm run build

echo "✅ Cleanup complete! Ready for Vercel deployment."