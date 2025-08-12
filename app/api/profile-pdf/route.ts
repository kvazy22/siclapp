import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, access, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const PROFILE_DIR = join(process.cwd(), 'public', 'profile');
const PDF_PATH = join(PROFILE_DIR, 'company-profile.pdf');
const WATERMARK_PATH = join(PROFILE_DIR, 'watermark.png');

// Ensure directory exists
if (!existsSync(PROFILE_DIR)) {
  mkdirSync(PROFILE_DIR, { recursive: true });
}

// Cache for file stats
let pdfStats: any = null;
let lastStatsCheck = 0;
const STATS_CACHE_DURATION = 5000; // 5 seconds

// Helper function to get file stats with caching
async function getFileStats(filePath: string) {
  const now = Date.now();
  if (!pdfStats || (now - lastStatsCheck) > STATS_CACHE_DURATION) {
    try {
      const stats = await stat(filePath);
      pdfStats = {
        size: stats.size,
        lastModified: stats.mtime,
        sizeInMB: (stats.size / (1024 * 1024)).toFixed(2)
      };
      lastStatsCheck = now;
    } catch (error) {
      pdfStats = null;
    }
  }
  return pdfStats;
}

// Helper function to validate PDF file
async function validatePDF(buffer: Buffer): Promise<boolean> {
  try {
    // Check PDF magic number
    const header = buffer.slice(0, 4).toString('ascii');
    if (header !== '%PDF') {
      return false;
    }

    // Check file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (buffer.length > maxSize) {
      return false;
    }

    // Additional validation: check for PDF structure
    const content = buffer.toString('ascii', 0, Math.min(1000, buffer.length));
    if (!content.includes('obj') || !content.includes('endobj')) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('PDF validation error:', error);
    return false;
  }
}

// Helper function to validate image file
async function validateImage(buffer: Buffer, filename: string): Promise<boolean> {
  try {
    const extension = filename.toLowerCase().split('.').pop();
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'svg', 'webp'];
    
    if (!extension || !allowedExtensions.includes(extension)) {
      return false;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (buffer.length > maxSize) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Image validation error:', error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if PDF exists
    if (!existsSync(PDF_PATH)) {
      return NextResponse.json({ 
        error: 'PDF not found',
        message: 'Please upload a PDF file in the admin panel.'
      }, { status: 404 });
    }

    // Get file stats for cache headers
    const stats = await getFileStats(PDF_PATH);
    
    // Return PDF file with enhanced headers
    const pdfBuffer = await readFile(PDF_PATH);
    
    const response = new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate, private', // Prevent caching
        'Pragma': 'no-cache',
        'Expires': '0',
        'ETag': `"${stats?.lastModified?.getTime() || Date.now()}"`,
        'Last-Modified': stats?.lastModified?.toUTCString() || new Date().toUTCString(),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Range, If-None-Match, If-Modified-Since',
        'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Accept-Ranges',
        'Accept-Ranges': 'bytes',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN', // Allow iframe from same origin
        'X-XSS-Protection': '1; mode=block',
      },
    });

    // Handle range requests for better streaming
    const range = request.headers.get('range');
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : pdfBuffer.length - 1;
      const chunksize = (end - start) + 1;
      
      response.headers.set('Content-Range', `bytes ${start}-${end}/${pdfBuffer.length}`);
      response.headers.set('Content-Length', chunksize.toString());
      
      const chunk = pdfBuffer.slice(start, end + 1);
      return new NextResponse(chunk, { headers: response.headers, status: 206 });
    }

    return response;
  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json({ 
      error: 'Failed to serve PDF',
      message: 'An internal server error occurred while serving the PDF file.'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;
    const watermark = formData.get('watermark') as File;

    const results = {
      pdf: { success: false, message: '' },
      watermark: { success: false, message: '' }
    };

    // Handle PDF upload
    if (file) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Validate PDF
        if (!await validatePDF(buffer)) {
          results.pdf = { 
            success: false, 
            message: 'Invalid PDF file. Please ensure the file is a valid PDF and under 50MB.' 
          };
        } else {
          await writeFile(PDF_PATH, buffer);
          results.pdf = { 
            success: true, 
            message: 'PDF uploaded successfully' 
          };
          
          // Clear stats cache
          pdfStats = null;
        }
      } catch (error) {
        console.error('Error processing PDF:', error);
        results.pdf = { 
          success: false, 
          message: 'Failed to process PDF file' 
        };
      }
    }

    // Handle watermark upload
    if (watermark) {
      try {
        const bytes = await watermark.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Validate image
        if (!await validateImage(buffer, watermark.name)) {
          results.watermark = { 
            success: false, 
            message: 'Invalid image file. Please ensure the file is a valid image (PNG, JPG, SVG, WebP) and under 5MB.' 
          };
        } else {
          await writeFile(WATERMARK_PATH, buffer);
          results.watermark = { 
            success: true, 
            message: 'Watermark uploaded successfully' 
          };
        }
      } catch (error) {
        console.error('Error processing watermark:', error);
        results.watermark = { 
          success: false, 
          message: 'Failed to process watermark file' 
        };
      }
    }

    // Check if at least one file was processed successfully
    const hasSuccess = results.pdf.success || results.watermark.success;
    
    return NextResponse.json({ 
      success: hasSuccess,
      results,
      message: hasSuccess ? 'Files processed successfully' : 'No valid files were uploaded'
    }, {
      status: hasSuccess ? 200 : 400
    });

  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json({ 
      error: 'Failed to upload files',
      message: 'An internal server error occurred while processing the upload.'
    }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    let deletedFiles = 0;
    let errors = [];

    // Delete PDF file
    if (existsSync(PDF_PATH)) {
      try {
        await writeFile(PDF_PATH, ''); // Clear file content
        deletedFiles++;
      } catch (error) {
        errors.push('Failed to delete PDF file');
      }
    }

    // Delete watermark file
    if (existsSync(WATERMARK_PATH)) {
      try {
        await writeFile(WATERMARK_PATH, ''); // Clear file content
        deletedFiles++;
      } catch (error) {
        errors.push('Failed to delete watermark file');
      }
    }

    // Clear stats cache
    pdfStats = null;

    return NextResponse.json({ 
      success: deletedFiles > 0,
      deletedFiles,
      errors: errors.length > 0 ? errors : undefined,
      message: deletedFiles > 0 ? 'Files deleted successfully' : 'No files were deleted'
    });
  } catch (error) {
    console.error('Error deleting files:', error);
    return NextResponse.json({ 
      error: 'Failed to delete files',
      message: 'An internal server error occurred while deleting the files.'
    }, { status: 500 });
  }
}

export async function HEAD() {
  try {
    if (!existsSync(PDF_PATH)) {
      return NextResponse.json({ error: 'PDF not found' }, { status: 404 });
    }

    const stats = await getFileStats(PDF_PATH);
    
    return new NextResponse(null, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': stats?.size?.toString() || '0',
        'Last-Modified': stats?.lastModified?.toUTCString() || new Date().toUTCString(),
        'ETag': `"${stats?.lastModified?.getTime() || Date.now()}"`,
        'Accept-Ranges': 'bytes',
      },
    });
  } catch (error) {
    console.error('Error in HEAD request:', error);
    return NextResponse.json({ error: 'Failed to get file info' }, { status: 500 });
  }
}