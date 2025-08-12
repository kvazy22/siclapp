import { NextResponse } from 'next/server';
import { join } from 'path';
import { existsSync, statSync } from 'fs';
import { readFile } from 'fs/promises';

const PROFILE_DIR = join(process.cwd(), 'public', 'profile');
const PDF_PATH = join(PROFILE_DIR, 'company-profile.pdf');
const WATERMARK_PATH = join(PROFILE_DIR, 'watermark.png');
const DEFAULT_WATERMARK_PATH = join(process.cwd(), 'public', 'profile', 'default-watermark.svg');

// Helper function to validate PDF file
async function validatePDFFile(filePath: string): Promise<{ isValid: boolean; error?: string }> {
  try {
    const buffer = await readFile(filePath);
    
    // Check PDF magic number
    const header = buffer.slice(0, 4).toString('ascii');
    if (header !== '%PDF') {
      return { isValid: false, error: 'Invalid PDF header' };
    }

    // Check file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (buffer.length > maxSize) {
      return { isValid: false, error: 'File too large (max 50MB)' };
    }

    // Additional validation: check for PDF structure
    const content = buffer.toString('ascii', 0, Math.min(1000, buffer.length));
    if (!content.includes('obj') || !content.includes('endobj')) {
      return { isValid: false, error: 'Invalid PDF structure' };
    }

    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Failed to read file' };
  }
}

// Helper function to validate image file
async function validateImageFile(filePath: string): Promise<{ isValid: boolean; error?: string }> {
  try {
    const buffer = await readFile(filePath);
    
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (buffer.length > maxSize) {
      return { isValid: false, error: 'File too large (max 5MB)' };
    }

    // Basic image format detection
    const header = buffer.slice(0, 8);
    const isPNG = header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47;
    const isJPEG = header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF;
    const isWebP = header.slice(0, 4).toString() === 'RIFF' && header.slice(8, 12).toString() === 'WEBP';
    
    if (!isPNG && !isJPEG && !isWebP) {
      // Check if it's SVG (text-based)
      const content = buffer.toString('utf8', 0, Math.min(100, buffer.length));
      if (!content.includes('<svg')) {
        return { isValid: false, error: 'Unsupported image format' };
      }
    }

    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Failed to read file' };
  }
}

// Helper function to get file info with validation
async function getFileInfo(filePath: string, isImage: boolean = false) {
  try {
    if (!existsSync(filePath)) {
      return { exists: false };
    }

    const stats = statSync(filePath);
    const validation = isImage 
      ? await validateImageFile(filePath)
      : await validatePDFFile(filePath);

    return {
      exists: true,
      size: stats.size,
      lastModified: stats.mtime,
      sizeInMB: (stats.size / (1024 * 1024)).toFixed(2),
      sizeInKB: (stats.size / 1024).toFixed(2),
      isValid: validation.isValid,
      error: validation.error,
      isDefault: false,
      path: 'custom',
      permissions: {
        readable: true,
        writable: true
      },
      metadata: {
        created: stats.birthtime,
        accessed: stats.atime,
        modified: stats.mtime
      }
    };
  } catch (error) {
    console.error(`Error getting file info for ${filePath}:`, error);
    return { 
      exists: false, 
      error: 'Failed to access file' 
    };
  }
}

export async function GET(request: Request) {
  try {
    const startTime = Date.now();
    
    // Get PDF info
    const pdfInfo = await getFileInfo(PDF_PATH, false);
    
    // Get watermark info (check both custom and default)
    let watermarkInfo = await getFileInfo(WATERMARK_PATH, true);
    if (!watermarkInfo.exists) {
      watermarkInfo = await getFileInfo(DEFAULT_WATERMARK_PATH, true);
      if (watermarkInfo.exists) {
        watermarkInfo.isDefault = true;
        watermarkInfo.path = 'default';
      }
    } else {
      watermarkInfo.isDefault = false;
      watermarkInfo.path = 'custom';
    }

    // Calculate system status
    const systemStatus = {
      healthy: pdfInfo.exists && pdfInfo.isValid !== false,
      warnings: [] as string[],
      errors: [] as string[]
    };

    if (!pdfInfo.exists) {
      systemStatus.errors.push('No PDF file found');
    } else if (pdfInfo.isValid === false) {
      systemStatus.errors.push(`PDF validation failed: ${pdfInfo.error}`);
    }

    if (!watermarkInfo.exists) {
      systemStatus.warnings.push('No watermark file found');
    } else if (watermarkInfo.isValid === false) {
      systemStatus.warnings.push(`Watermark validation failed: ${watermarkInfo.error}`);
    }

    // Check file sizes
    if (pdfInfo.exists && pdfInfo.size && pdfInfo.size > 25 * 1024 * 1024) { // 25MB
      systemStatus.warnings.push('PDF file is large (>25MB), may affect loading performance');
    }

    if (watermarkInfo.exists && watermarkInfo.size && watermarkInfo.size > 2 * 1024 * 1024) { // 2MB
      systemStatus.warnings.push('Watermark file is large (>2MB), may affect rendering performance');
    }

    const responseTime = Date.now() - startTime;

    // Check if this is a simple status request (for PDF viewer)
    const url = new URL(request.url);
    const simple = url.searchParams.get('simple');

    if (simple === 'true') {
      // Simple response for PDF viewer
      return NextResponse.json({
        available: pdfInfo.exists && pdfInfo.isValid !== false,
        error: pdfInfo.exists && pdfInfo.isValid === false ? pdfInfo.error : null
      });
    }

    // Detailed response for admin panel
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      system: {
        status: systemStatus.healthy ? 'healthy' : systemStatus.errors.length > 0 ? 'error' : 'warning',
        healthy: systemStatus.healthy,
        warnings: systemStatus.warnings,
        errors: systemStatus.errors
      },
      pdf: pdfInfo,
      watermark: watermarkInfo,
      storage: {
        totalFiles: [pdfInfo.exists, watermarkInfo.exists].filter(Boolean).length,
        totalSize: [
          pdfInfo.size || 0,
          watermarkInfo.size || 0
        ].reduce((a, b) => a + b, 0),
        totalSizeInMB: [
          parseFloat(pdfInfo.sizeInMB || '0'),
          parseFloat(watermarkInfo.sizeInMB || '0')
        ].reduce((a, b) => a + b, 0).toFixed(2)
      },
      capabilities: {
        supportsRangeRequests: true,
        supportsCaching: true,
        supportsValidation: true,
        maxPdfSize: '50MB',
        maxWatermarkSize: '5MB',
        supportedImageFormats: ['PNG', 'JPG', 'JPEG', 'SVG', 'WebP']
      }
    });
  } catch (error) {
    console.error('Error checking file status:', error);
    return NextResponse.json({ 
      error: 'Failed to check file status',
      message: 'An internal server error occurred while checking file status.',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}