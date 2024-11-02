#!/bin/bash

# Print starting message
echo "Starting the setup and running process for 'upfilex' project..."

# Step 1: Stop and remove all running containers to avoid conflicts
echo "Stopping and removing all running Docker containers..."
docker stop $(docker ps -aq) 2>/dev/null
docker rm $(docker ps -aq) 2>/dev/null

# Step 2: Pull the latest changes from your Git repository
echo "Pulling the latest changes from the repository..."
git pull origin main  # Replace 'main' with your branch name if different

# Step 3: Build and run the Docker containers
echo "Building and running Docker containers..."
docker-compose up --build -d

# Step 4: Display the status of running containers
echo "Showing the status of running containers..."
docker ps

# Final message
echo "The 'upfilex' project is now up and running! You can access it at http://localhost or http://your_server_ip"
