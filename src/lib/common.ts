import { resolveCommunity } from './communityResolver';
import { Community, EventWithCommunity } from '../types/community';

/**
 * Helper function to get community information for an event
 * This provides backward compatibility while supporting the new hybrid system
 */
export const getCommunityInfo = (
  event: EventWithCommunity,
  communities: Community[]
): { name: string; logo?: string } => {
  try {
    const resolved = resolveCommunity(event, communities);
    return {
      name: resolved.name,
      logo: resolved.logo
    };
  } catch {
    // Fallback to legacy fields if resolution fails
    return {
      name: event.communityName || 'Unknown Community',
      logo: event.communityLogo
    };
  }
};

export const convertToIST = (dateStr: string) => {
  const date = new Date(dateStr);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
  return new Date(date.getTime() + IST_OFFSET);
};
