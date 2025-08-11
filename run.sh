#!/bin/bash

# Stop on any error
set -e

echo "Installing dependencies..."
npm install

echo "Starting the development server..."
npm run dev
