import { NextRequest, NextResponse } from 'next/server';
import { getTeamMembers, addTeamMember } from '../../../lib/teamData';

export async function GET() {
  try {
    const members = await getTeamMembers();
    console.log('API GET - Returning team members:', members);
    return NextResponse.json(members);
  } catch (error) {
    console.error('API GET - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, designation, photo } = body;
    
    console.log('API POST - Received data:', { name, designation, photo });

    if (!name || !designation || !photo) {
      console.log('API POST - Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'Name, designation, and photo are required' },
        { status: 400 }
      );
    }

    const newMember = await addTeamMember({ name, designation, photo });
    console.log('API POST - Added new member:', newMember);
    
    const updatedMembers = await getTeamMembers();
    console.log('API POST - Current team members:', updatedMembers);

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('API POST - Error:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
} 