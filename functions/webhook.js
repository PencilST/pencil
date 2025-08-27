import { normalizeText } from "./lib/normalize.js";
import { getGreetAnswer } from "./lib/greet.js";
import { getFaqAnswer } from "./lib/faq.js";
import { route } from "./lib/brain.js";

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

            // Гурван үе шаттай шалгалт (мэндчилгээ → FAQ → бусад)
            let reply = getGreetAnswer(tag) || getFaqAnswer(tag) || route(tag);

            if (!reply) {
              reply = "Уучлаарай, таны асуултыг ойлгосонгүй. Та илүү тодорхой асуулт асуугаарай.";
            }

            await sendMessage(senderId, reply, env.PAGE_ACCESS_TOKEN, {});
          }
        }
      }
    }
    return new Response("EVENT_RECEIVED", { status: 200 });
  } catch (err) {
    console.error("Server error:", err);

    // Серверийн алдаа гарсан үед хэрэглэгчид мэдэгдэх fallback
    return new Response("Error", { status: 500 });
  }
}

async function sendMessage(id, text, token, opts) {
  const payload = {
    recipient: { id },
    message: { text }
  };

  const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${token}`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}
