import { promises as fs } from 'fs';
import path from 'path';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo: string;
}

const dataFilePath = path.join(process.cwd(), 'data', 'team-members.json');

// Helper function to read team members from file
const readTeamMembersFromFile = async (): Promise<TeamMember[]> => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading team members file:', error);
    // Return default team members if file doesn't exist or is corrupted
    return [
      {
        id: '1',
        name: 'ENG. Hassan Abdulsalam Shafie',
        designation: 'General Manager',
        photo: '/team/default-avatar.svg'
      },
      {
        id: '2',
        name: 'ENG. Mustafa Khalid',
        designation: 'C.E.O',
        photo: '/team/default-avatar.svg'
      },
      {
        id: '3',
        name: 'ENG. Othman Ahmed',
        designation: 'Marketing Manager',
        photo: '/team/default-avatar.svg'
      },
      {
        id: '4',
        name: 'Nadeem Hussain',
        designation: 'IT Expert',
        photo: '/team/nadeem.jpg'
      }
    ];
  }
};

// Helper function to write team members to file
const writeTeamMembersToFile = async (teamMembers: TeamMember[]): Promise<void> => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(teamMembers, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing team members file:', error);
    throw error;
  }
};

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  return await readTeamMembersFromFile();
};

export const addTeamMember = async (member: Omit<TeamMember, 'id'>): Promise<TeamMember> => {
  console.log('addTeamMember - Adding member:', member);
  
  const teamMembers = await readTeamMembersFromFile();
  console.log('addTeamMember - Current team members before:', teamMembers);
  
  const newMember = {
    ...member,
    id: Date.now().toString()
  };
  
  teamMembers.push(newMember);
  
  console.log('addTeamMember - New member created:', newMember);
  console.log('addTeamMember - Current team members after:', teamMembers);
  
  await writeTeamMembersToFile(teamMembers);
  
  return newMember;
};

export const updateTeamMember = async (id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> => {
  const teamMembers = await readTeamMembersFromFile();
  const index = teamMembers.findIndex(member => member.id === id);
  
  if (index === -1) return null;
  
  teamMembers[index] = { ...teamMembers[index], ...updates };
  await writeTeamMembersToFile(teamMembers);
  
  return teamMembers[index];
};

export const deleteTeamMember = async (id: string): Promise<boolean> => {
  const teamMembers = await readTeamMembersFromFile();
  const index = teamMembers.findIndex(member => member.id === id);
  
  if (index === -1) return false;
  
  teamMembers.splice(index, 1);
  await writeTeamMembersToFile(teamMembers);
  
  return true;
}; 