export interface Event {
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventLink: string;
  location: string;
  // Hybrid community resolution
  communityId?: string;
  community?: {
    name: string;
    logo?: string;
    description?: string;
    location?: string;
  };
  // Legacy fields (for backward compatibility)
  communityName?: string;
  communityLogo?: string;
}
