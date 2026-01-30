export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return Response.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const apiKey = process.env.LEMENO_API_KEY;
    const lemenoUrl = process.env.LEMENO_APP_URL ? `${process.env.LEMENO_APP_URL}/api` : 'https://app.lemeno.io/api';

    if (!apiKey) {
      console.log('[Newsletter] Mock subscription for:', email);
      return Response.json({ success: true, mock: true });
    }

    const response = await fetch(`${lemenoUrl}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey,
        originalSlug: 'filipe-nevola',
        email,
        tags: ['blog-subscribe'],
        userCreationFields: {
          language: 'en-US',
          utmSignUp: {
            utm_source: 'filipenevola',
            utm_medium: 'blog',
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Newsletter] Error from Lemeno:', errorText);
      return Response.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('[Newsletter] Error:', error);
    return Response.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
