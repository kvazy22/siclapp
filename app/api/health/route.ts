import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const healthChecks = {
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        contentFile: false,
        dataDirectory: false,
        memoryUsage: false
      }
    };

    // Check if content file exists and is readable
    try {
      const contentPath = path.join(process.cwd(), 'data', 'content.json');
      fs.accessSync(contentPath, fs.constants.R_OK);
      healthChecks.checks.contentFile = true;
    } catch (error) {
      console.error('Content file check failed:', error);
    }

    // Check if data directory exists
    try {
      const dataPath = path.join(process.cwd(), 'data');
      fs.accessSync(dataPath, fs.constants.R_OK);
      healthChecks.checks.dataDirectory = true;
    } catch (error) {
      console.error('Data directory check failed:', error);
    }

    // Check memory usage
    const memUsage = process.memoryUsage();
    const memUsageMB = {
      rss: Math.round(memUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
      external: Math.round(memUsage.external / 1024 / 1024)
    };

    healthChecks.checks.memoryUsage = memUsageMB.heapUsed < 500; // Less than 500MB
    healthChecks.memoryUsage = memUsageMB;

    // Determine overall health
    const allChecksPassed = Object.values(healthChecks.checks).every(check => check === true);
    
    if (allChecksPassed) {
      return NextResponse.json({ 
        status: 'healthy',
        ...healthChecks
      });
    } else {
      return NextResponse.json({ 
        status: 'degraded',
        ...healthChecks
      }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ 
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 