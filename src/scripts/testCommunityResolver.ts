import {
  resolveCommunity,
  validateCommunityIds,
  CommunityResolutionError
} from '../lib/communityResolver';
import { Community, EventWithCommunity } from '../types/community';
import communitiesData from '../data/communities.json';
import eventsData from '../data/events.json';

// Type for legacy events structure
interface LegacyEvent {
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventLink: string;
  location: string;
  communityName?: string;
  communityLogo?: string;
  [key: string]: unknown; // For any additional properties
}

// Type assertion for imported JSON data
const communities = communitiesData as Community[];
const events = eventsData as LegacyEvent[]; // Current events don't have the new structure yet

function runTests() {
  console.log('Starting Community Resolution Tests\n');

  // Test 1: Validate community IDs uniqueness
  console.log('Test 1: Validating community IDs uniqueness...');
  try {
    validateCommunityIds(communities);
    console.log('All community IDs are unique\n');
  } catch (error) {
    console.error('Community ID validation failed:', error);
    return;
  }

  // Test 2: Test community resolution by ID
  console.log('Test 2: Testing community resolution by ID...');
  const testEventWithId: EventWithCommunity = {
    eventName: 'Test Event',
    eventDescription: 'Test Description',
    eventDate: '2025-01-01',
    eventTime: '10:00',
    eventVenue: 'Test Venue',
    eventLink: 'https://example.com',
    location: 'Chennai',
    communityId: 'chennaipy'
  };

  try {
    const resolved = resolveCommunity(testEventWithId, communities);
    console.log('Community resolved by ID:', resolved.name);
  } catch (error) {
    console.error('Community resolution by ID failed:', error);
  }

  // Test 3: Test invalid community ID
  console.log('\nTest 3: Testing invalid community ID...');
  const testEventWithInvalidId: EventWithCommunity = {
    ...testEventWithId,
    communityId: 'non-existent-community'
  };

  try {
    resolveCommunity(testEventWithInvalidId, communities);
    console.error('Should have thrown an error for invalid ID');
  } catch (error) {
    if (error instanceof CommunityResolutionError) {
      console.log('Correctly threw error for invalid ID:', error.message);
    } else {
      console.error('Unexpected error type:', error);
    }
  }

  // Test 4: Test inline community object
  console.log('\nTest 4: Testing inline community object...');
  const testEventWithInline: EventWithCommunity = {
    eventName: 'Test Event',
    eventDescription: 'Test Description',
    eventDate: '2025-01-01',
    eventTime: '10:00',
    eventVenue: 'Test Venue',
    eventLink: 'https://example.com',
    location: 'Chennai',
    community: {
      name: 'Custom Community',
      logo: 'https://example.com/logo.png',
      description: 'A custom community for testing',
      location: 'Chennai'
    }
  };

  try {
    const resolved = resolveCommunity(testEventWithInline, communities);
    console.log('Inline community resolved:', resolved.name);
  } catch (error) {
    console.error('Inline community resolution failed:', error);
  }

  // Test 5: Test invalid inline community
  console.log('\nTest 5: Testing invalid inline community...');
  const testEventWithInvalidInline: EventWithCommunity = {
    ...testEventWithInline,
    community: { name: '' } // Invalid: empty name
  };

  try {
    resolveCommunity(testEventWithInvalidInline, communities);
    console.error('Should have thrown an error for invalid inline community');
  } catch (error) {
    if (error instanceof CommunityResolutionError) {
      console.log('Correctly threw error for invalid inline community:', error.message);
    } else {
      console.error(' Unexpected error type:', error);
    }
  }

  // Test 6: Test legacy support with existing events
  console.log('\nTest 6: Testing legacy support with existing events...');
  let successCount = 0;
  let errorCount = 0;

  events.forEach((event, index) => {
    try {
      const legacyEvent: EventWithCommunity = {
        ...event,
        communityName: event.communityName,
        communityLogo: event.communityLogo
      };
      const resolved = resolveCommunity(legacyEvent, communities);
      console.log(`Event ${index + 1}: ${event.eventName} -> ${resolved.name}`);
      successCount++;
    } catch (error) {
      console.error(`Event ${index + 1}: ${event.eventName} -> ${error}`);
      errorCount++;
    }
  });

  console.log(`\nLegacy events test complete: ${successCount} successful, ${errorCount} failed`);

  // Test 7: Test event with no community information
  console.log('\nTest 7: Testing event with no community information...');
  const testEventWithNoCommunity: EventWithCommunity = {
    eventName: 'Test Event',
    eventDescription: 'Test Description',
    eventDate: '2025-01-01',
    eventTime: '10:00',
    eventVenue: 'Test Venue',
    eventLink: 'https://example.com',
    location: 'Chennai'
  };

  try {
    resolveCommunity(testEventWithNoCommunity, communities);
    console.error(' Should have thrown an error for missing community info');
  } catch (error) {
    if (error instanceof CommunityResolutionError) {
      console.log('Correctly threw error for missing community info:', error.message);
    } else {
      console.error('Unexpected error type:', error);
    }
  }

  console.log('\n🎉 Community Resolution Tests Complete!');
}

// Run tests if this file is executed directly
if (import.meta.url === new URL(import.meta.url).href) {
  runTests();
}

export { runTests };
