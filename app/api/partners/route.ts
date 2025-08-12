import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'partners.json');

// Helper function to read partners data
const readPartnersData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write partners data
const writePartnersData = (data: any[]) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    return false;
  }
};

// GET /api/partners
export async function GET() {
  try {
    const partners = readPartnersData();
    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}

// POST /api/partners
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, logo, description } = body;

    if (!name || !logo || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const partners = readPartnersData();
    const newPartner = {
      id: partners.length > 0 ? Math.max(...partners.map((p: any) => p.id)) + 1 : 1,
      name,
      logo,
      description
    };

    partners.push(newPartner);
    
    if (writePartnersData(partners)) {
      return NextResponse.json(newPartner, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to save partner' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create partner' },
      { status: 500 }
    );
  }
} 