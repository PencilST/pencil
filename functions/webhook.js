import { normalize } from "./lib/normalize.js";  // ⬅️ өмнө нь normalizeText байсан
import { getGreetAnswer } from "./lib/greet.js";
import { getFaqAnswer } from "./lib/faq.js";
import { brain } from "./lib/brain.js";         // ⬅️ өмнө нь route байсан

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();

    if (body.object === "page") {
      for (const entry of body.entry) {
        for (const event of entry.messaging) {
          const senderId = event.sender.id;
          if (event.message && event.message.text) {
            const original = event.message.text;
            const tag = normalize(original);

            // ✨ Хариултыг сонгох
            let reply = getGreetAnswer(tag) || getFaqAnswer(tag) || brain(tag);

            if (!reply) {
              reply =
                "😊 Уучлаарай, би таны асуултыг ойлгосонгүй. Та дахин тодруулж бичнэ үү?";
            }

            await sendMessage(senderId, reply, env.PAGE_ACCESS_TOKEN, {});
          }
        }
      }
    }
    return new Response("EVENT_RECEIVED", { status: 200 });
  } catch (err) {
    console.error("Server error:", err);

    // ❌ Функц алдаа гарвал
    return new Response("Error", { status: 500 });
  }
}

async function sendMessage(id, text, token, opts) {
  const payload = {
    recipient: { id },
    message: { text },
  };

  const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${token}`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
