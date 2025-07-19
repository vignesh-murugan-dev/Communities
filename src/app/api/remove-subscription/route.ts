import { NextRequest, NextResponse } from 'next/server';

interface RemoveSubscriptionData {
  endpoint: string;
}

interface RemovalData {
  endpoint: string;
  subscriptionId: string;
  timestamp: string;
}

/**
 * Removes a push notification subscription by dispatching to GitHub Actions
 */
export async function POST(request: NextRequest) {
  try {
    const data: RemoveSubscriptionData = await request.json();

    if (!data.endpoint) {
      return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
    }

    // Generate subscription ID for removal
    const subscriptionId = generateSubscriptionId(data.endpoint);

    // Dispatch removal to GitHub Actions
    const githubResponse = await dispatchToGitHub({
      endpoint: data.endpoint,
      subscriptionId,
      timestamp: new Date().toISOString()
    });

    if (!githubResponse.ok) {
      console.error('GitHub dispatch failed:', await githubResponse.text());
      return NextResponse.json({ error: 'Failed to remove subscription' }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Subscription removed successfully',
        subscriptionId
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing subscription:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Dispatches subscription removal to GitHub Actions workflow
 */
async function dispatchToGitHub(removalData: RemovalData) {
  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPOSITORY || 'FOSSUChennai/Communities';

  if (!githubToken) {
    throw new Error('GitHub token not configured');
  }

  const [owner, repo] = githubRepo.split('/');

  const dispatchUrl = `https://api.github.com/repos/${owner}/${repo}/dispatches`;

  return fetch(dispatchUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${githubToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'TamilNadu-Tech-Notifications/1.0'
    },
    body: JSON.stringify({
      event_type: 'remove_push_subscription',
      client_payload: {
        subscription: removalData,
        action: 'remove'
      }
    })
  });
}

/**
 * Generates a unique subscription ID from endpoint
 */
function generateSubscriptionId(endpoint: string): string {
  let hash = 0;
  for (let i = 0; i < endpoint.length; i++) {
    const char = endpoint.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const positiveHash = Math.abs(hash);
  const timestamp = Date.now().toString().slice(-6);

  return `sub_${positiveHash}_${timestamp}`;
}
