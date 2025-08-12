# Deployment Guide for cPanel

## Overview

This guide will help you deploy your Next.js application to cPanel with proper security measures and production optimizations.

## Prerequisites

- cPanel hosting account with Node.js support
- SSH access (recommended)
- Domain name configured
- SSL certificate (recommended)

## Step 1: Prepare Your Application for Production

### 1.1 Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test the production build locally
npm start
```

### 1.2 Environment Configuration

Create a `.env.production` file:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

### 1.3 Security Configuration

Update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  generateEtags: false,
  experimental: {
    serverComponentsExternalPackages: ['pdfjs-dist']
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

## Step 2: cPanel Deployment Methods

### Method 1: Git Deployment (Recommended)

#### 2.1 Set up Git Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub/GitLab
# Push your code
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

#### 2.2 Configure cPanel Git Version Control

1. Log into cPanel
2. Find "Git Version Control"
3. Click "Create"
4. Enter your repository URL
5. Set deployment path to `public_html`
6. Configure deployment settings

#### 2.3 Set up Deployment Hook

Create a deployment script in your repository:

```bash
#!/bin/bash
# deploy.sh

# Navigate to project directory
cd /home/username/public_html

# Pull latest changes
git pull origin main

# Install dependencies
npm install --production

# Build the application
npm run build

# Set proper permissions
chmod 755 /home/username/public_html
chmod 644 /home/username/public_html/.next/**/*

# Restart Node.js application
pm2 restart your-app-name
```

### Method 2: Manual Upload

#### 2.1 Prepare Files for Upload

```bash
# Create deployment package
npm run build
tar -czf deployment.tar.gz .next package.json package-lock.json public data
```

#### 2.2 Upload via File Manager

1. Log into cPanel
2. Open File Manager
3. Navigate to `public_html`
4. Upload and extract your deployment package
5. Install dependencies via SSH or Terminal

## Step 3: Node.js Configuration

### 3.1 Set up Node.js App

1. In cPanel, find "Node.js"
2. Click "Create Application"
3. Configure:
   - Node.js version: 18.x or higher
   - Application mode: Production
   - Application root: `public_html`
   - Application URL: `yourdomain.com`
   - Application startup file: `server.js`

### 3.2 Create Custom Server

Create `server.js` in your project root:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
```

### 3.3 Configure Environment Variables

In cPanel Node.js app settings:
- Add environment variables
- Set `NODE_ENV=production`
- Configure any API keys or secrets

## Step 4: Security Enhancements

### 4.1 Admin Panel Security

Create a secure admin authentication system:

```javascript
// app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    if (username !== ADMIN_USERNAME) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
```

### 4.2 Rate Limiting

Install and configure rate limiting:

```bash
npm install express-rate-limit
```

```javascript
// middleware/rateLimit.js
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later.',
});
```

### 4.3 Content Security Policy

Add CSP headers to your `next.config.js`:

```javascript
headers: async () => {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            font-src 'self' https://fonts.gstatic.com;
            img-src 'self' data: https:;
            connect-src 'self' https://readdy.ai;
            frame-ancestors 'none';
          `.replace(/\s+/g, ' ').trim()
        }
      ]
    }
  ]
}
```

### 4.4 File Upload Security

Secure your content API:

```javascript
// app/api/content/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../utils/auth';

export async function PUT(request: NextRequest) {
  try {
    // Verify admin token
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Validate input
    const body = await request.json();
    if (!validateContent(body)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    
    const success = saveContent(body);
    
    if (success) {
      return NextResponse.json({ message: 'Content updated successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

function validateContent(content: any) {
  // Add validation logic here
  return true;
}
```

## Step 5: SSL Configuration

### 5.1 Enable SSL in cPanel

1. Go to "SSL/TLS" in cPanel
2. Install SSL certificate
3. Force HTTPS redirect

### 5.2 Update Application for HTTPS

```javascript
// next.config.js
const nextConfig = {
  // ... other config
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : '',
}
```

## Step 6: Performance Optimization

### 6.1 Enable Compression

```javascript
// next.config.js
const nextConfig = {
  compress: true,
  // ... other config
}
```

### 6.2 Configure Caching

```javascript
// next.config.js
headers: async () => {
  return [
    {
      source: '/api/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-cache, no-store, must-revalidate'
        }
      ]
    },
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ]
}
```

## Step 7: Monitoring and Maintenance

### 7.1 Set up Error Logging

```javascript
// utils/logger.js
export const logger = {
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
    // Add your logging service here (e.g., Sentry, LogRocket)
  },
  info: (message: string) => {
    console.log(`[INFO] ${message}`);
  }
};
```

### 7.2 Health Check Endpoint

```javascript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Check if content file exists and is readable
    const contentPath = path.join(process.cwd(), 'data', 'content.json');
    fs.accessSync(contentPath, fs.constants.R_OK);
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0'
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'unhealthy',
      error: error.message 
    }, { status: 500 });
  }
}
```

## Step 8: Backup Strategy

### 8.1 Automated Backups

Create a backup script:

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/username/backups"
PROJECT_DIR="/home/username/public_html"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup project files
tar -czf $BACKUP_DIR/project_$DATE.tar.gz -C $PROJECT_DIR .

# Backup database (if applicable)
# mysqldump -u username -p database_name > $BACKUP_DIR/database_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

### 8.2 Set up Cron Job

In cPanel Cron Jobs:
```bash
0 2 * * * /home/username/backup.sh
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Check if another Node.js app is running
   - Use different port in cPanel Node.js settings

2. **Permission Denied**
   - Set proper file permissions (755 for directories, 644 for files)
   - Check ownership of files

3. **Build Failures**
   - Ensure all dependencies are installed
   - Check Node.js version compatibility

4. **SSL Issues**
   - Verify SSL certificate installation
   - Check for mixed content warnings

### Performance Issues

1. **Slow Loading**
   - Enable compression
   - Optimize images
   - Use CDN for static assets

2. **Memory Issues**
   - Monitor memory usage
   - Restart Node.js app periodically
   - Optimize bundle size

## Security Checklist

- [ ] SSL certificate installed
- [ ] Admin authentication implemented
- [ ] Rate limiting configured
- [ ] CSP headers set
- [ ] Input validation added
- [ ] Error logging configured
- [ ] Regular backups scheduled
- [ ] File permissions set correctly
- [ ] Environment variables secured
- [ ] Dependencies updated regularly

## Support

For deployment issues:
1. Check cPanel error logs
2. Verify Node.js version compatibility
3. Test locally before deploying
4. Contact hosting provider for Node.js support

For security concerns:
1. Regularly update dependencies
2. Monitor access logs
3. Use security scanning tools
4. Implement proper authentication 