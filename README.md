# Pencil Bot

This project is powered by Cloudflare Pages + Workers, connected to Facebook Messenger.

___
To use, you need:

1. Cloudflare Pages (pencil):
   - Exposes /api/webhook endpoint
    - Receives webhook events from Facebook
    - Passes to the Worker endpoint

For webhook verification, it supports GET as well:
```javascript
export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token.toLowerCase() === "Pencil".toLowerCase()) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}
```


2. Workers (pencil-bot):
   - Core logic (brain, faq, greet, guide, normalize)
   - Receives processed messages from Pages
   - Returns JSON reply back to Facebook
      ex: { reply: "Sáin baina uu!"...}

3. Facebook Messenger:
   - Sends user messages to the Page
    - Gain bot responses via Pages Webhook + Workers

## Current Architecture

- **Pages / functions/webhook.js**: Only a router.
  - Receives FACEBOOK webhook events, passes them to the Worker.  
\n- **Source /cf-worker/src/index.js**: Contains the bot's core logic and verification for Facebook webhook.
  - Handles GET to verify with challenge
   - Handles POST to run chatbot logic
