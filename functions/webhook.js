import sendContactMenu from "./sendContactMenu.js";
import setupPersistentMenu from "./setupPersistentMenu.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 🟢 Persistent Menu setup endpoint
    if (url.pathname === "/setup-menu" && request.method === "GET") {
      const result = await setupPersistentMenu(env.PAGE_ACCESS_TOKEN);
      return new Response("Persistent Menu configured! " + JSON.stringify(result), { status: 200 });
    }

    // 🟢 Facebook webhook verification
    if (request.method === "GET") {
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");
      if (token === env.VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
      } else {
        return new Response("Invalid verify token", { status: 403 });
      }
    }

    // 🟢 Handle incoming messages
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

        console.log("📩 Incoming webhook body:", JSON.stringify(body, null, 2));

        if (body?.entry) {
          for (const entry of body.entry) {
            for (const event of entry.messaging ?? []) {
              const senderId = event.sender?.id;
              const payload =
                event.message?.quick_reply?.payload ||
                event.postback?.payload;

              if (!senderId) {
                console.error("⚠️ Missing senderId:", event);
                continue;
              }

              if (payload === "CONTACT" || payload === "MENU_CONTACT") {
                await sendContactMenu(senderId, env.PAGE_ACCESS_TOKEN);
              } else if (payload === "CONTACT_ADDRESS") {
                await sendText(
                  senderId,
                  "🏢 Манай хаяг:\n📍 Улаанбаатар, ...\n📞 Утас: +976 99112233\n✉️ Имэйл: info@studio.mn",
                  env.PAGE_ACCESS_TOKEN
                );
              } else if (payload === "CONTACT_PROFILES") {
                await sendText(senderId, "🌐 Манай профайлууд:", env.PAGE_ACCESS_TOKEN);
              } else if (payload === "GET_STARTED") {
                const greeting = getGreeting();
                await sendText(
                  senderId,
                  `${greeting}! 👋 Мэдээлэл авахын тулд доорх ☰ цэсийг дарна уу.`,
                  env.PAGE_ACCESS_TOKEN
                );
              } else if (payload) {
                console.log("ℹ️ Unknown payload:", payload);
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
  const hour = (now.getUTCHours() + 8) % 24; // Улаанбаатарын цаг (UTC+8)

  if (hour >= 5 && hour < 12) {
    return "Өглөөний мэнд 🌅";
  } else if (hour >= 12 && hour < 17) {
    return "Өдрийн мэнд ☀️";
  } else if (hour >= 17 && hour < 21) {
    return "Оройн мэнд 🌆";
  } else {
    return "Үдшийн мэнд 🌙";
  }
}

async function sendText(senderId, text, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v23.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  const body = {
    recipient: { id: senderId },
    message: { text },
  };

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
