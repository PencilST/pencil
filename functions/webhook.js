import setupPersistentMenu from "./setupPersistentMenu.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Persistent menu setup
    if (url.pathname === "/setup-menu" && request.method === "GET") {
      const result = await setupPersistentMenu(env.PAGE_ACCESS_TOKEN);
      return new Response("Persistent Menu configured! " + JSON.stringify(result), { status: 200 });
    }

    // Facebook webhook verification
    if (request.method === "GET") {
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");
      if (token === env.VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
      } else {
        return new Response("Invalid verify token", { status: 403 });
      }
    }

    // Handle incoming messages
    if (request.method === "POST") {
      try {
        const raw = await request.text();
        let body;

        try {
          body = JSON.parse(raw);
        } catch {
          console.error("❌ Invalid JSON:", raw);
          return new Response("Invalid JSON", { status: 400 });
        }

        if (body?.entry) {
          for (const entry of body.entry) {
            for (const event of entry.messaging ?? []) {
              const senderId = event.sender?.id;
              const payload =
                event.message?.quick_reply?.payload ||
                event.postback?.payload;

              if (!senderId) continue;

              // 1. Үндсэн цэс
              if (payload === "MENU_MAIN" || payload === "GET_STARTED") {
                const greeting = getGreeting();
                await sendTextWithQuickReplies(
                  senderId,
                  `${greeting}! 👋 Үндсэн цэсээс сонгоно уу 👇`,
                  [
                    { content_type: "text", title: "🏢 Хаяг, дугаар", payload: "CONTACT_ADDRESS" },
                    { content_type: "text", title: "🌐 Профайл", payload: "CONTACT_PROFILES" },
                    { content_type: "text", title: "📞 Холбоо барих", payload: "MENU_CONTACT" }
                  ],
                  env.PAGE_ACCESS_TOKEN
                );
              }

              // 2. Холбоо барих цэс
              else if (payload === "MENU_CONTACT") {
                await sendTextWithQuickReplies(
                  senderId,
                  "📞 Холбоо барих цэс:",
                  [
                    { content_type: "text", title: "🏢 Хаяг, дугаар", payload: "CONTACT_ADDRESS" },
                    { content_type: "text", title: "👩‍💼 Ажилчдын профайл", payload: "CONTACT_PROFILES" },
                    { content_type: "text", title: "⬅️ Буцах", payload: "MENU_MAIN" }
                  ],
                  env.PAGE_ACCESS_TOKEN
                );
              }

              // 3. Хаяг
              else if (payload === "CONTACT_ADDRESS") {
                await sendTextWithQuickReplies(
                  senderId,
                  "🏢 Манай хаяг:\n📍 Улаанбаатар, ...\n📞 Утас: +976 99112233\n✉️ Имэйл: info@studio.mn",
                  [
                    { content_type: "text", title: "⬅️ Буцах", payload: "MENU_CONTACT" }
                  ],
                  env.PAGE_ACCESS_TOKEN
                );
              }

              // 4. Профайл
              else if (payload === "CONTACT_PROFILES") {
                await sendTextWithQuickReplies(
                  senderId,
                  "🌐 Манай профайлууд:\n- Facebook: fb.com/xxxx\n- Instagram: @xxxx",
                  [
                    { content_type: "text", title: "⬅️ Буцах", payload: "MENU_CONTACT" }
                  ],
                  env.PAGE_ACCESS_TOKEN
                );
              }
            }
          }
        }

        return new Response("EVENT_RECEIVED", { status: 200 });
      } catch (err) {
        console.error("💥 Worker crashed:", err);
        return new Response("Error: " + err.message, { status: 500 });
      }
    }

    return new Response("Not found", { status: 404 });
  }
};

function getGreeting() {
  const now = new Date();
  const hour = (now.getUTCHours() + 8) % 24; // УБ цаг

  if (hour >= 5 && hour < 12) return "Өглөөний мэнд 🌅";
  if (hour >= 12 && hour < 17) return "Өдрийн мэнд ☀️";
  if (hour >= 17 && hour < 21) return "Оройн мэнд 🌆";
  return "Үдшийн мэнд 🌙";
}

async function sendTextWithQuickReplies(senderId, text, quickReplies, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v23.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  const body = {
    recipient: { id: senderId },
    message: { text, quick_replies: quickReplies },
  };

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
