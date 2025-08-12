@echo off
echo 🚀 Creating production deployment package...

REM Create deployment directory
set DEPLOY_DIR=deployment-package
if exist %DEPLOY_DIR% rmdir /s /q %DEPLOY_DIR%
mkdir %DEPLOY_DIR%

echo 📁 Copying essential files...

REM Copy application files
xcopy /e /i app %DEPLOY_DIR%\app
xcopy /e /i components %DEPLOY_DIR%\components
xcopy /e /i data %DEPLOY_DIR%\data
xcopy /e /i lib %DEPLOY_DIR%\lib
xcopy /e /i public %DEPLOY_DIR%\public
xcopy /e /i utils %DEPLOY_DIR%\utils

REM Copy configuration files
copy package.json %DEPLOY_DIR%\
copy package-lock.json %DEPLOY_DIR%\
copy next.config.js %DEPLOY_DIR%\
copy server.js %DEPLOY_DIR%\
copy tsconfig.json %DEPLOY_DIR%\
copy tailwind.config.js %DEPLOY_DIR%\
copy postcss.config.mjs %DEPLOY_DIR%\
copy eslint.config.mjs %DEPLOY_DIR%\
copy next-env.d.ts %DEPLOY_DIR%\

REM Copy documentation
copy CPANEL_QUICK_START.md %DEPLOY_DIR%\
copy SECURITY_CHECKLIST.md %DEPLOY_DIR%\
copy CTA_BUTTON_README.md %DEPLOY_DIR%\

echo 🔨 Building production application...
cd %DEPLOY_DIR%
call npm install --production
call npm run build
cd ..

echo 📦 Creating deployment archive...
set TIMESTAMP=%date:~10,4%%date:~4,2%%date:~7,2%-%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
powershell Compress-Archive -Path %DEPLOY_DIR% -DestinationPath "siclapp-deployment-%TIMESTAMP%.zip"

echo ✅ Deployment package created successfully!
echo 📁 Package location: siclapp-deployment-%TIMESTAMP%.zip
echo 📋 Upload this archive to your cPanel and extract it in public_html
echo 📖 See DEPLOYMENT_INSTRUCTIONS.md in the package for detailed steps

pause 