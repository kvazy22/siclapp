import { NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { NextRequest } from 'next/server';

const PROFILE_DIR = join(process.cwd(), 'public', 'profile');
const WATERMARK_PATH = join(PROFILE_DIR, 'watermark.png');
const DEFAULT_WATERMARK_PATH = join(process.cwd(), 'public', 'profile', 'default-watermark.svg');

// Cache for watermark info
let watermarkCache: any = null;
let lastCacheCheck = 0;
const CACHE_DURATION = 10000; // 10 seconds

// Helper function to get watermark info with caching
async function getWatermarkInfo() {
  const now = Date.now();
  if (!watermarkCache || (now - lastCacheCheck) > CACHE_DURATION) {
    try {
      let watermarkPath = WATERMARK_PATH;
      let contentType = 'image/png';
      let isDefault = false;

      // Check if custom watermark exists, otherwise use default
      if (!existsSync(WATERMARK_PATH)) {
        watermarkPath = DEFAULT_WATERMARK_PATH;
        contentType = 'image/svg+xml';
        isDefault = true;
      }

      // Check if default watermark exists
      if (!existsSync(watermarkPath)) {
        watermarkCache = { exists: false };
        lastCacheCheck = now;
        return watermarkCache;
      }

      const stats = await stat(watermarkPath);
      watermarkCache = {
        exists: true,
        path: watermarkPath,
        contentType,
        isDefault,
        size: stats.size,
        lastModified: stats.mtime,
        sizeInKB: (stats.size / 1024).toFixed(2)
      };
      lastCacheCheck = now;
    } catch (error) {
      watermarkCache = { exists: false, error: 'Failed to access watermark' };
      lastCacheCheck = now;
    }
  }
  return watermarkCache;
}

// Helper function to validate image format
function validateImageFormat(buffer: Buffer, contentType: string): boolean {
  try {
    if (contentType === 'image/svg+xml') {
      // Validate SVG
      const content = buffer.toString('utf8', 0, Math.min(1000, buffer.length));
      return content.includes('<svg') && content.includes('</svg>');
    }

    // Validate binary image formats
    const header = buffer.slice(0, 8);
    
    // PNG validation
    if (contentType === 'image/png') {
      const isPNG = header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47;
      return isPNG;
    }

    // JPEG validation
    if (contentType === 'image/jpeg' || contentType === 'image/jpg') {
      const isJPEG = header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF;
      return isJPEG;
    }

    // WebP validation
    if (contentType === 'image/webp') {
      const isWebP = header.slice(0, 4).toString() === 'RIFF' && header.slice(8, 12).toString() === 'WEBP';
      return isWebP;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const watermarkInfo = await getWatermarkInfo();

    if (!watermarkInfo.exists) {
      return NextResponse.json({ 
        error: 'No watermark available',
        message: 'Please upload a watermark image in the admin panel.'
      }, { status: 404 });
    }

    // Check if client has cached version
    const ifNoneMatch = request.headers.get('if-none-match');
    const ifModifiedSince = request.headers.get('if-modified-since');
    
    const etag = `"${watermarkInfo.lastModified?.getTime() || Date.now()}"`;
    const lastModified = watermarkInfo.lastModified?.toUTCString() || new Date().toUTCString();

    // Return 304 if not modified
    if (ifNoneMatch === etag || 
        (ifModifiedSince && watermarkInfo.lastModified && 
         new Date(ifModifiedSince) >= watermarkInfo.lastModified)) {
      return new NextResponse(null, { 
        status: 304,
        headers: {
          'ETag': etag,
          'Last-Modified': lastModified,
          'Cache-Control': 'public, max-age=3600, s-maxage=7200', // Cache for 1 hour, CDN for 2 hours
        }
      });
    }

    // Return watermark file with enhanced headers
    const watermarkBuffer = await readFile(watermarkInfo.path);
    
    const response = new NextResponse(watermarkBuffer, {
      headers: {
        'Content-Type': watermarkInfo.contentType,
        'Content-Length': watermarkBuffer.length.toString(),
        'ETag': etag,
        'Last-Modified': lastModified,
        'Cache-Control': 'public, max-age=3600, s-maxage=7200', // Cache for 1 hour, CDN for 2 hours
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, If-None-Match, If-Modified-Since',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-Watermark-Type': watermarkInfo.isDefault ? 'default' : 'custom',
        'X-Watermark-Size': watermarkInfo.sizeInKB + 'KB'
      },
    });

    return response;
  } catch (error) {
    console.error('Error serving watermark:', error);
    return NextResponse.json({ 
      error: 'Failed to serve watermark',
      message: 'An internal server error occurred while serving the watermark file.'
    }, { status: 500 });
  }
}

export async function HEAD(request: NextRequest) {
  try {
    const watermarkInfo = await getWatermarkInfo();

    if (!watermarkInfo.exists) {
      return NextResponse.json({ error: 'No watermark available' }, { status: 404 });
    }

    const etag = `"${watermarkInfo.lastModified?.getTime() || Date.now()}"`;
    const lastModified = watermarkInfo.lastModified?.toUTCString() || new Date().toUTCString();

    return new NextResponse(null, {
      headers: {
        'Content-Type': watermarkInfo.contentType,
        'Content-Length': watermarkInfo.size?.toString() || '0',
        'ETag': etag,
        'Last-Modified': lastModified,
        'Cache-Control': 'public, max-age=3600, s-maxage=7200',
        'X-Watermark-Type': watermarkInfo.isDefault ? 'default' : 'custom',
        'X-Watermark-Size': watermarkInfo.sizeInKB + 'KB'
      },
    });
  } catch (error) {
    console.error('Error in watermark HEAD request:', error);
    return NextResponse.json({ error: 'Failed to get watermark info' }, { status: 500 });
  }
}