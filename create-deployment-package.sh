#!/bin/bash

# Create Production Deployment Package
# This script creates a clean deployment package with only necessary files

echo "🚀 Creating production deployment package..."

# Create deployment directory
DEPLOY_DIR="deployment-package"
rm -rf $DEPLOY_DIR
mkdir $DEPLOY_DIR

# Copy essential files and directories
echo "📁 Copying essential files..."

# Application files
cp -r app $DEPLOY_DIR/
cp -r components $DEPLOY_DIR/
cp -r data $DEPLOY_DIR/
cp -r lib $DEPLOY_DIR/
cp -r public $DEPLOY_DIR/
cp -r utils $DEPLOY_DIR/

# Configuration files
cp package.json $DEPLOY_DIR/
cp package-lock.json $DEPLOY_DIR/
cp next.config.js $DEPLOY_DIR/
cp server.js $DEPLOY_DIR/
cp tsconfig.json $DEPLOY_DIR/
cp tailwind.config.js $DEPLOY_DIR/
cp postcss.config.mjs $DEPLOY_DIR/
cp eslint.config.mjs $DEPLOY_DIR/
cp next-env.d.ts $DEPLOY_DIR/

# Documentation (keep only essential)
cp CPANEL_QUICK_START.md $DEPLOY_DIR/
cp SECURITY_CHECKLIST.md $DEPLOY_DIR/
cp CTA_BUTTON_README.md $DEPLOY_DIR/

# Create .gitignore for deployment
cat > $DEPLOY_DIR/.gitignore << EOF
# Dependencies
node_modules/

# Production build
.next/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# next.js build output
.next

# TypeScript cache
*.tsbuildinfo

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF

# Create deployment instructions
cat > $DEPLOY_DIR/DEPLOYMENT_INSTRUCTIONS.md << EOF
# Deployment Instructions

## Quick Deploy to cPanel

1. **Upload Files**: Upload all files in this directory to your cPanel `public_html` folder
2. **Install Dependencies**: Run \`npm install --production\`
3. **Configure Node.js App**: 
   - Create Node.js application in cPanel
   - Set startup file to \`server.js\`
   - Configure environment variables
4. **Set Permissions**: Run the permission commands from CPANEL_QUICK_START.md
5. **Start Application**: Start the Node.js application in cPanel

## Environment Variables Required

Set these in cPanel Node.js app settings:

\`\`\`env
NODE_ENV=production
JWT_SECRET=your-generated-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-generated-hash
\`\`\`

## Security Setup

1. Generate password hash: \`node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 12));"\`
2. Generate JWT secret: \`node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"\`

## Health Check

After deployment, test: \`https://yourdomain.com/api/health\`

For detailed instructions, see CPANEL_QUICK_START.md
EOF

# Create production build
echo "🔨 Building production application..."
cd $DEPLOY_DIR
npm install --production
npm run build
cd ..

# Create deployment archive
echo "📦 Creating deployment archive..."
tar -czf siclapp-deployment-$(date +%Y%m%d-%H%M%S).tar.gz $DEPLOY_DIR/

echo "✅ Deployment package created successfully!"
echo "📁 Package location: siclapp-deployment-$(date +%Y%m%d-%H%M%S).tar.gz"
echo "📋 Upload this archive to your cPanel and extract it in public_html"
echo "📖 See DEPLOYMENT_INSTRUCTIONS.md in the package for detailed steps" 