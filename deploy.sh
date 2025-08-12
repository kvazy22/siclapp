#!/bin/bash

# Deployment script for cPanel
# Make sure to update the paths and username according to your cPanel setup

# Configuration
PROJECT_DIR="/home/username/public_html"
BACKUP_DIR="/home/username/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment...${NC}"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create backup of current version
echo -e "${YELLOW}Creating backup...${NC}"
if [ -d "$PROJECT_DIR" ]; then
    tar -czf $BACKUP_DIR/backup_$DATE.tar.gz -C $PROJECT_DIR .
    echo -e "${GREEN}Backup created: backup_$DATE.tar.gz${NC}"
else
    echo -e "${YELLOW}No existing project found, skipping backup${NC}"
fi

# Navigate to project directory
cd $PROJECT_DIR

# Pull latest changes (if using git)
if [ -d ".git" ]; then
    echo -e "${YELLOW}Pulling latest changes...${NC}"
    git pull origin main
else
    echo -e "${YELLOW}Git repository not found, skipping pull${NC}"
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install --production

# Build the application
echo -e "${YELLOW}Building application...${NC}"
npm run build

# Set proper permissions
echo -e "${YELLOW}Setting permissions...${NC}"
chmod 755 $PROJECT_DIR
find $PROJECT_DIR -type d -exec chmod 755 {} \;
find $PROJECT_DIR -type f -exec chmod 644 {} \;

# Make sure data directory is writable
chmod 755 $PROJECT_DIR/data
chmod 644 $PROJECT_DIR/data/*.json

# Restart Node.js application (if using PM2)
if command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Restarting PM2 application...${NC}"
    pm2 restart your-app-name || pm2 start server.js --name your-app-name
else
    echo -e "${YELLOW}PM2 not found, please restart your Node.js application manually${NC}"
fi

# Clean up old backups (keep last 7 days)
echo -e "${YELLOW}Cleaning up old backups...${NC}"
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete

# Health check
echo -e "${YELLOW}Performing health check...${NC}"
sleep 5
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}Health check passed!${NC}"
else
    echo -e "${RED}Health check failed! Please check your application.${NC}"
fi

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${YELLOW}Backup location: $BACKUP_DIR/backup_$DATE.tar.gz${NC}" 