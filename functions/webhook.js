export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ✅ Verification (Facebook webhook setup)
    if (request.method === "GET") {
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");
      if (token === env.VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
      } else {
        return new Response("Invalid verify token", { status: 403 });
      }
    }

    // ✅ Handle incoming messages
    if (request.method === "POST") {
      try {
        const body = await request.json();

        if (body.object === "page") {
          for (const entry of body.entry) {
            for (const event of entry.messaging) {
              if (event.message && event.sender) {
                const senderId = event.sender.id;
                // Шинэ хэрэглэгчид угталт мессеж илгээх
                await sendWelcomeMessage(senderId, env.PAGE_ACCESS_TOKEN);
              }

              // ✅ Handle payloads (menu & quick replies)
              if (event.postback || (event.message && event.message.quick_reply)) {
                const payload =
                  event.postback?.payload || event.message.quick_reply.payload;

                if (payload === "GET_STARTED") {
                  await sendText(
                    senderId,
                    "👋 Сайн байна уу! Харандаа чатбот таныг угтаж байна.\n\n📌 Та эндээс дараах мэдээллийг авах боломжтой:\n🏢 Манай үйлчилгээний тухай\n💻 Програм, техникийн зөвлөгөө\n📞 Холбоо барих\n\nДоорх туслах цэсээс сонгоод эхлээрэй ⬇️",
                    env.PAGE_ACCESS_TOKEN
                  );
                } else if (payload === "MENU_OPERATIONS") {
                  await sendText(
                    senderId,
                    "🏢 Манай үйлчилгээний дэлгэрэнгүй мэдээлэл...",
                    env.PAGE_ACCESS_TOKEN
                  );
                } else if (payload === "MENU_INFO") {
                  await sendText(
                    senderId,
                    "💻 Програм, техникийн зөвлөгөө...",
                    env.PAGE_ACCESS_TOKEN
                  );
                } else if (payload === "MENU_CONTACT") {
                  await sendText(
                    senderId,
                    "📞 Холбоо барих мэдээлэл...",
                    env.PAGE_ACCESS_TOKEN
                  );
                }
              }
            }
          }
        }

        return new Response("EVENT_RECEIVED", { status: 200 });
      } catch (err) {
        return new Response("Error", { status: 500 });
      }
    }

    return new Response("Not found", { status: 404 });
  },
};

// 🟢 Welcome Message
async function sendWelcomeMessage(senderId, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v16.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  const body = {
    recipient: { id: senderId },
    message: {
      text: "👋 Тавтай морил! Доорх сонголтоос сонгоно уу:",
      quick_replies: [
        { content_type: "text", title: "🏢 Үйлчилгээ", payload: "MENU_OPERATIONS" },
        { content_type: "text", title: "💻 Зөвлөгөө", payload: "MENU_INFO" },
        { content_type: "text", title: "📞 Холбоо", payload: "MENU_CONTACT" },
      ],
    },
  };
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// 🟢 Simple Text Message
async function sendText(senderId, text, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v16.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
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
