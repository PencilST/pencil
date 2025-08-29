export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET") {
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");
      if (token === env.VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
      } else {
        return new Response("Invalid verify token", { status: 403 });
      }
    }

    if (request.method === "POST") {
      try {
        const body = await request.json();
        if (body.object === "page") {
          for (const entry of body.entry) {
            for (const event of entry.messaging) {
              if (event.message && event.sender) {
                const senderId = event.sender.id;
                // Text messaged ospravlenie
                await sendWelcomeMessage(senderId, env.PAGE_ACCESS_TOKEN);
              }
              if (event.postback || (event.message && event.message.quick_reply)) {
                const payload =
                  event.postback?.payload || event.message.quick_reply.payload;
                if (payload === "GET_STARTED") {
                  await sendText(senderId, "— Tavtai moril! 🌀 \n← Endees ta bidniiê vç ailkahaa, zeâlkeŭ bolon holboo barik medeeligi avh bolomjostoi. \n\n🐙 Doorh tuslakh ōosnog buy.", env.PAGE_ACCESS_TOKEN);
                } else if (payload === "MENU_OPERATIONS") {
                  await sendText(senderId, "ðŸ“ˆ Manai Ï†íŠ·ej]gee demtgerâ€™", env.PAGE_ACCESS_TOKEN);
                } else if (payload === "MENU_INFO") {
                  await sendText(senderId, "â€˜ MedÃ©el dakht ...", env.PAGE_ACCESS_TOKEN);
                } else if (payload === "MENU_CONTACT") {
                  await sendText(senderId, "ðŸ”Š holboo barich ...", env.PAGE_ACCESS_TOKEN);
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
  }
};

// ↓🎨 😊
// Welcome Messageasync function sendWelcomeMessage(senderId, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v16.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  const body = {
    recipient: { id: senderId },
    message: {
      text: "Tavtai moril! 🌀 ",
      quick_replies: [
        { content_type: "text", title: "️ Uứ atsegachaa", payload: "MENU_OPERATIONS"},
        { content_type: "text", title: "️ Asuult /Zừ Û Sã�vllÃ©gue", payload: "MENU_INFO" },
        { content_type: "text", title: "️ Holboo barikh", payload: "MENU_CONTACT" }
      ]
    }
  };
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

// Text Message
async function sendText(senderId, text, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v16.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  const body = { recipient: { id: senderId }, message: { text } };
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}