import { Profile } from '@/types';

/**
 * Generates a vCard (VCF) file from a profile
 * Compatible with iOS, Android, and desktop contact apps
 */
export function generateVCard(profile: Profile): string {
  // Format phone number for vCard (remove spaces and dashes)
  const formattedPhone = profile.phone?.replace(/[\s-]/g, '') || '';

  // Create vCard 3.0 format (most compatible)
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName}
N:${profile.fullName.split(' ').reverse().join(';')};;;
TITLE:${profile.title}
${profile.phone ? `TEL;TYPE=CELL:${formattedPhone}` : ''}
${profile.email ? `EMAIL:${profile.email}` : ''}
${profile.portfolio ? `URL:${profile.portfolio}` : ''}
${profile.linkedin ? `URL;type=LinkedIn:${profile.linkedin}` : ''}
${profile.github ? `URL;type=GitHub:${profile.github}` : ''}
${profile.location ? `ADR;TYPE=WORK:;;${profile.location};;;;` : ''}
${profile.about ? `NOTE:${profile.about.replace(/\n/g, '\\n')}` : ''}
${profile.tagline ? `NOTE:${profile.tagline}` : ''}
END:VCARD`;

  return vcard;
}

/**
 * Downloads a vCard file
 */
export function downloadVCard(profile: Profile): void {
  const vcard = generateVCard(profile);

  // Create blob from vCard data
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });

  // Create download link
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);

  // Generate filename from user's name
  const filename = profile.fullName.replace(/\s+/g, '-') + '-Contact.vcf';
  link.download = filename;

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(link.href);
}
