import { normalizeText } from "./lib/normalize.js";
import { getGreetAnswer } from "./lib/greet.js";
import { getFaqAnswer } from "./lib/faq.js";
import { route } from "./lib/brain.js";   // 🟢 БРАИН.ЖС нэмэв

// 🌐 GET webhook
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe") {
    if (token === env.VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    } else {
      return new Response("Forbidden", { status: 403 });
    }
  }

  return new Response("Forbidden", { status: 403 });
}

// 📩 POST webhook (receive messages)
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

            // ✨ Хариулт олох
            let reply = getGreetAnswer(tag);
            if (!reply) {
              reply = getFaqAnswer(tag);
            }
            if (!reply) {
              reply = route(tag);   // 🟢 БРАИН.ЖС-ээс хариулт авах
            }
            if (!reply) {
              reply = "Задоние?";  // fallback
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

// 📨 Message илгээх
async function sendMessage(recipientId, text, accessToken, opts) {
  const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${accessToken}`;
  const payload = {
    recipient: { id: recipientId },
    message: { text }
  };

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      console.error("Messenger API error:", await resp.text());
    }
  } catch (err) {
    console.error("Network error sending message:", err);
  }
}
