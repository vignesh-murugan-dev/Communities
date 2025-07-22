export interface Community {
  id: string;
  name: string;
  logo?: string;
  description: string;
  location: string;
  twitter?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  mastodon?: string;
  telegram?: string;
  youtube?: string;
  github?: string;
  discord?: string;
  bluesky?: string;
  reddit?: string;
}

export interface InlineCommunity {
  name: string;
  logo?: string;
  description?: string;
  location?: string;
}

export interface EventWithCommunity {
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventLink: string;
  location: string;
  // Hybrid community resolution
  communityId?: string;
  community?: InlineCommunity;
  // Legacy fields (for backward compatibility)
  communityName?: string;
  communityLogo?: string;
}
