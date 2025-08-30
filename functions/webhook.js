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

              // --- Үндсэн цэс ---
              if (payload === "MENU_MAIN" || payload === "GET_STARTED") {
                const greeting = getGreeting();
                await sendTextWithQuickReplies(
                  senderId,
                  `${greeting}! 🤗 Манай чатбот танд дараах сонголтуудыг санал болгож байна:`,
                  [
                    { content_type: "text", title: "🏢 Ажил үйлчилгээ", payload: "MENU_SERVICE" },
                    { content_type: "text", title: "💻 Мэдээлэл / Зөвлөгөө", payload: "MENU_INFO" },
                    { content_type: "text", title: "📞 Холбоо барих", payload: "MENU_CONTACT" }
                  ],
                  env.PAGE_ACCESS_TOKEN
                );
              }

              // --- Ажил үйлчилгээ ---
              else if (payload === "MENU_SERVICE") {
                await sendTextWithQuickReplies(
                  senderId,
                  "Манай үйлчилгээний талаар дэлгэрэнгүй асуугаарай...",
                  [{ content_type: "text", title: "🏠 Буцах", payload: "MENU_MAIN" }],
                  env.PAGE_ACCESS_TOKEN
                );
              }

              // --- Мэдээлэл / Зөвлөгөө ---
              else if (payload === "MENU_INFO") {
                await sendTextWithQuickReplies(
                  senderId,
                  "Энд та мэдээлэл болон зөвлөгөөг авах боломжтой. 😊",
                  [{ content_type: "text", title: "🏠 Буцах", payload: "MENU_MAIN" }],
                  env.PAGE_ACCESS_TOKEN
                );
              }

              // --- Холбоо барих ---
              else if (payload === "MENU_CONTACT") {
                await sendTextWithQuickReplies(
                  senderId,
                  "📞 Холбоо барих мэдээлэл:\nУтас: +976 99112233\nИмэйл: info@studio.mn",
                  [{ content_type: "text", title: "🏠 Буцах", payload: "MENU_MAIN" }],
                  env.PAGE_ACCESS_TOKEN
                );
              }
            }
          }
        }

        return new Response("EVENT_RECEIVED", { status: 200 });
      } catch (err) {
        console.error("❌ Webhook алдаа:", err.message);
        return new Response("Error: " + err.message, { status: 500 });
      }
    }

    return new Response("Not found", { status: 404 });
  }
};

// --- Мэндчилгээ цагийн дагуу ---
function getGreeting() {
  const now = new Date();
  const hour = (now.getUTCHours() + 8) % 24; // УБ цаг
  if (hour >= 5 && hour < 12) return "Өглөөний мэнд";
  if (hour >= 12 && hour < 17) return "Өдрийн мэнд";
  if (hour >= 17 && hour < 21) return "Оройн мэнд";
  return "Сайн шөнө";
}

// --- Текст хариу илгээх ---
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
