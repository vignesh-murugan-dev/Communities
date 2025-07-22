import { Community, EventWithCommunity, InlineCommunity } from '../types/community';

export class CommunityResolutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CommunityResolutionError';
  }
}

/**
 * Validates that community IDs are unique in the communities array
 * @param communities - Array of communities to validate
 * @throws {CommunityResolutionError} If duplicate IDs are found
 */
export function validateCommunityIds(communities: Community[]): void {
  const ids = communities.map((c) => c.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

  if (duplicates.length > 0) {
    throw new CommunityResolutionError(
      `Duplicate community IDs found: ${[...new Set(duplicates)].join(', ')}`
    );
  }
}

/**
 * Validates an inline community object
 * @param community - Inline community object to validate
 * @throws {CommunityResolutionError} If validation fails
 */
function validateInlineCommunity(community: unknown): asserts community is InlineCommunity {
  if (!community || typeof community !== 'object') {
    throw new CommunityResolutionError('Inline community must be an object');
  }

  if (
    !('name' in community) ||
    typeof (community as { name?: unknown }).name !== 'string' ||
    (typeof (community as { name?: unknown }).name === 'string' &&
      (community as { name: string }).name.trim() === '')
  ) {
    throw new CommunityResolutionError('Inline community must have a non-empty name field');
  }
}

/**
 * Resolves community information from either communityId or inline community object
 * @param event - Event object containing community reference
 * @param communities - Array of available communities
 * @returns Resolved community object
 * @throws {CommunityResolutionError} If resolution fails
 */
export function resolveCommunity(
  event: EventWithCommunity,
  communities: Community[]
): Community | InlineCommunity {
  // Validate community IDs uniqueness first
  validateCommunityIds(communities);

  // Priority 1: Use communityId if present
  if (event.communityId) {
    const community = communities.find((c) => c.id === event.communityId);
    if (!community) {
      throw new CommunityResolutionError(
        `Community with ID "${event.communityId}" not found in communities.json`
      );
    }
    return community;
  }

  // Priority 2: Use inline community object if present
  if (event.community) {
    validateInlineCommunity(event.community);
    return event.community;
  }

  // Priority 3: Legacy support - use communityName and communityLogo
  if (event.communityName) {
    return {
      name: event.communityName,
      logo: event.communityLogo,
      location: event.location
    };
  }

  // No community information found
  throw new CommunityResolutionError(
    'Event must have either communityId, inline community object, or legacy communityName'
  );
}

/**
 * Batch resolves communities for multiple events
 * @param events - Array of events to resolve
 * @param communities - Array of available communities
 * @returns Array of resolved communities matching the events order
 */
export function resolveCommunities(
  events: EventWithCommunity[],
  communities: Community[]
): (Community | InlineCommunity)[] {
  return events.map((event) => resolveCommunity(event, communities));
}
