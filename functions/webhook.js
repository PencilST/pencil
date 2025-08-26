import { normalizeText } from "./lib/normalize.js";
import { getGreetAnswer } from "./lib/greet.js";
import { getFaqAnswer } from "./lib/faq.js";

// Get Verification request (GET)
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === env.VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

// Post Event handler (POST)
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();

    if (body.object === "page") {
      for (const entry of body.entry) {
        for (const event of entry.messaging) {
          const senderId = event.sender.id;
          if (event.message && event.message.text) {
            const original = event.message.text;
            const tag = normalizeText(original);

            let reply = getGreetAnswer(tag);
            if (!reply) {
              reply = getFaqAnswer(tag);
            }
            if (!reply) {
              reply = `Fatal hazgi, tag: ${tag}, text: ${original}`; 
            }

            await sendMessage(senderId, reply, env.PAGE_ACCESS_TOKEN, {});
          }
        }
      }
    }

    return new Response("EVENT_RECEIVED", { status: 200 });
  } catch (err) {
    console.error("ERR", err);
    return new Response("Error", { status: 500 });
  }
}

async function sendMessage(recipientId, text, accessToken, opts) {
  const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${accessToken}`;
  const payload = {
    recipient: { id: recipientId },
    message: { text }
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!resp.OK) {
    console.error("Failed to send message", resp.statusText);
  }
}