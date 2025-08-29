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
                await sendWelcomeMessage(senderId, env.PAGE_ACCESS_TOKEN);
              }

              if (event.postback || (event.message && event.message.quick_reply)) {
                const payload =
                  event.postback?.payload || event.message.quick_reply.payload;

                if (payload === "GET_STARTED") {
                  await sendWelcomeMessage(senderId, env.PAGE_ACCESS_TOKEN);
                } else if (payload === "MENU_OPERATIONS") {
                  await sendText(senderId, "📌 Манай үйлчилгээний ажиллагааны талаар...", env.PAGE_ACCESS_TOKEN);
                } else if (payload === "MENU_INFO") {
                  await sendText(senderId, "ℹ️ Манай байгууллагын тухай дэлгэрэнгүй мэдээлэл...", env.PAGE_ACCESS_TOKEN);
                } else if (payload === "MENU_CONTACT") {
                  await sendText(senderId, "📞 Бидэнтэй холбогдох мэдээлэл...", env.PAGE_ACCESS_TOKEN);
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

// ========================
// ✅ Welcome Message (Button Template)
async function sendWelcomeMessage(senderId, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v16.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  const body = {
    recipient: { id: senderId },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "👋 Тавтай морил! Доорх сонголтоос сонгоно уу:",
          buttons: [
            { type: "postback", title: "📌 Үйлчилгээ", payload: "MENU_OPERATIONS" },
            { type: "postback", title: "ℹ️ Мэдээлэл", payload: "MENU_INFO" },
            { type: "postback", title: "📞 Холбоо барих", payload: "MENU_CONTACT" }
          ]
        }
      }
    }
  };
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ✅ Simple Text Message
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
