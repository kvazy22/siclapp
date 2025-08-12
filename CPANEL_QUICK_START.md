# cPanel Quick Start Guide

## 🚀 Quick Deployment Steps

### Step 1: Prepare Your Application

```bash
# 1. Build for production
npm run build

# 2. Test locally
npm start

# 3. Create deployment package
tar -czf deployment.tar.gz .next package.json package-lock.json public data server.js next.config.js
```

### Step 2: Upload to cPanel

1. **Log into cPanel**
2. **Open File Manager**
3. **Navigate to `public_html`**
4. **Upload `deployment.tar.gz`**
5. **Extract the archive**

### Step 3: Configure Node.js App

1. **In cPanel, find "Node.js"**
2. **Click "Create Application"**
3. **Configure settings:**
   - **Node.js version**: 18.x or higher
   - **Application mode**: Production
   - **Application root**: `public_html`
   - **Application URL**: `yourdomain.com`
   - **Application startup file**: `server.js`

### Step 4: Set Environment Variables

In cPanel Node.js app settings, add:

```env
NODE_ENV=production
JWT_SECRET=your-super-secret-key-change-this
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$12$your.hashed.password.here
```

### Step 5: Install Dependencies

Via cPanel Terminal or SSH:

```bash
cd public_html
npm install --production
```

### Step 6: Set Permissions

```bash
chmod 755 public_html
find public_html -type d -exec chmod 755 {} \;
find public_html -type f -exec chmod 644 {} \;
chmod 755 public_html/data
chmod 644 public_html/data/*.json
```

### Step 7: Start Application

1. **In cPanel Node.js, click "Start"**
2. **Check the logs for any errors**
3. **Test your application at `yourdomain.com`**

## 🔧 Common Issues & Solutions

### Issue: "Port Already in Use"
**Solution**: 
- Check if another Node.js app is running
- Use different port in cPanel settings
- Restart the Node.js application

### Issue: "Permission Denied"
**Solution**:
```bash
chmod 755 public_html
chown -R username:username public_html
```

### Issue: "Module Not Found"
**Solution**:
```bash
cd public_html
npm install --production
```

### Issue: "Build Failed"
**Solution**:
- Check Node.js version (needs 18+)
- Ensure all dependencies are installed
- Check for TypeScript errors

## 🔒 Security Quick Setup

### 1. Generate Secure Password Hash

```bash
# Install bcryptjs globally
npm install -g bcryptjs

# Generate password hash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 12));"
```

### 2. Generate JWT Secret

```bash
# Generate random secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
```

### 3. Update Environment Variables

Replace in cPanel Node.js settings:
- `ADMIN_PASSWORD_HASH` with your generated hash
- `JWT_SECRET` with your generated secret
- `ADMIN_USERNAME` with your desired username

## 📊 Monitoring

### Health Check
Visit: `https://yourdomain.com/api/health`

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

### Admin Panel
Visit: `https://yourdomain.com/admin`

## 🔄 Updates & Maintenance

### Update Application
1. **Upload new files to cPanel**
2. **Restart Node.js application**
3. **Check health endpoint**

### Backup
```bash
# Create backup
tar -czf backup_$(date +%Y%m%d).tar.gz public_html/

# Restore from backup
tar -xzf backup_20240101.tar.gz
```

## 📞 Support

### cPanel Support
- Contact your hosting provider
- Check cPanel documentation
- Review error logs in cPanel

### Application Support
- Check browser console for errors
- Review Node.js application logs
- Test health endpoint

## ✅ Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Admin panel accessible at `/admin`
- [ ] CTA and Profile buttons configurable
- [ ] PDF viewer working correctly
- [ ] Health endpoint responding
- [ ] SSL certificate installed
- [ ] HTTPS redirect working
- [ ] Security headers configured
- [ ] Admin authentication working
- [ ] Backup system in place

## 🚨 Emergency Procedures

### If Application Won't Start
1. Check Node.js logs in cPanel
2. Verify environment variables
3. Check file permissions
4. Restart Node.js application

### If Admin Panel Not Working
1. Verify JWT secret is set
2. Check admin credentials
3. Clear browser cache
4. Check authentication API

### If Files Not Loading
1. Check file permissions
2. Verify file paths
3. Check cPanel file manager
4. Restart application

---

**Need Help?** Check the full `DEPLOYMENT_GUIDE.md` for detailed instructions and troubleshooting. 