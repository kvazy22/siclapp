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

// PUT /api/partners/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const partnerId = parseInt(id);
    const body = await request.json();
    const { name, logo, description } = body;

    if (!name || !logo || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const partners = readPartnersData();
    const partnerIndex = partners.findIndex((p: any) => p.id === partnerId);

    if (partnerIndex === -1) {
      return NextResponse.json(
        { error: 'Partner not found' },
        { status: 404 }
      );
    }

    partners[partnerIndex] = {
      ...partners[partnerIndex],
      name,
      logo,
      description
    };

    if (writePartnersData(partners)) {
      return NextResponse.json(partners[partnerIndex]);
    } else {
      return NextResponse.json(
        { error: 'Failed to update partner' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update partner' },
      { status: 500 }
    );
  }
}

// DELETE /api/partners/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const partnerId = parseInt(id);
    const partners = readPartnersData();
    const partnerIndex = partners.findIndex((p: any) => p.id === partnerId);

    if (partnerIndex === -1) {
      return NextResponse.json(
        { error: 'Partner not found' },
        { status: 404 }
      );
    }

    partners.splice(partnerIndex, 1);

    if (writePartnersData(partners)) {
      return NextResponse.json({ message: 'Partner deleted successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete partner' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete partner' },
      { status: 500 }
    );
  }
} 