import { NextRequest, NextResponse } from 'next/server';
import { sendBulkNotifications, type NotificationPayload } from '@/lib/webpush';

interface SendNotificationRequest {
  title: string;
  body: string;
  url?: string;
  eventId?: string;
  test?: boolean;
}

/**
 * Send push notifications to all subscribed users
 * This endpoint can be used to notify users about new events
 */
export async function POST(request: NextRequest) {
  try {
    // Basic authentication check
    const authHeader = request.headers.get('authorization');
    const apiKey = process.env.NOTIFICATION_API_KEY || 'dev-key';

    if (authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data: SendNotificationRequest = await request.json();

    if (!data.title || !data.body) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
    }

    // Get all subscriptions from GitHub secrets
    const subscriptions = await getAllSubscriptions();

    if (subscriptions.length === 0) {
      return NextResponse.json(
        { success: true, message: 'No subscriptions to send to', sent: 0 },
        { status: 200 }
      );
    }

    // Prepare notification payload
    const payload: NotificationPayload = {
      title: data.title,
      body: data.body,
      url: data.url || '/',
      eventId: data.eventId,
      icon: '/logo.webp',
      badge: '/logo.webp',
      tag: data.test ? 'test-notification' : 'tech-event'
    };

    // Send notifications
    const results = await sendBulkNotifications(subscriptions, payload);

    return NextResponse.json({
      success: true,
      message: `Sent ${results.success} notifications successfully`,
      sent: results.success,
      failed: results.failed,
      total: subscriptions.length
    });
  } catch (error) {
    console.error('Error sending notifications:', error);
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}

/**
 * Get all push subscriptions from GitHub secrets
 */
async function getAllSubscriptions() {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPOSITORY || 'FOSSUChennai/Communities';

    if (!githubToken) {
      console.error('GitHub token not configured');
      return [];
    }

    const [owner, repo] = githubRepo.split('/');

    // First, get the list of subscription IDs
    const listResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/secrets/PUSH_SUBSCRIPTIONS_LIST`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${githubToken}`,
          'User-Agent': 'TamilNadu-Tech-Notifications/1.0'
        }
      }
    );

    if (!listResponse.ok) {
      console.log('No subscriptions list found');
      return [];
    }

    // Note: We can't actually read the secret values through the API for security reasons
    // In a real implementation, you might need to store subscriptions in a database
    // or use a different approach. For now, we'll return an empty array.
    console.log('Subscriptions list exists but cannot read secret values through API');
    return [];
  } catch (error) {
    console.error('Error getting subscriptions:', error);
    return [];
  }
}

/**
 * Test endpoint to send a test notification
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const test = searchParams.get('test');

  if (test === 'true') {
    // Send a test notification
    try {
      const testPayload = {
        title: 'Test Notification',
        body: 'This is a test notification from Tamil Nadu Tech!',
        test: true
      };

      // Use the POST method internally
      const testRequest = new NextRequest(request.url, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${process.env.NOTIFICATION_API_KEY || 'dev-key'}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify(testPayload)
      });

      return await POST(testRequest);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to send test notification' }, { status: 500 });
    }
  }

  return NextResponse.json({
    message: 'Notification API is running',
    usage: {
      'POST /api/send-notification': 'Send notification to all subscribers',
      'GET /api/send-notification?test=true': 'Send test notification'
    }
  });
}
