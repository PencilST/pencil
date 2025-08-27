export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // GET: Facebook webhook verification
    if (request.method === "GET") {
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");

      if (token === env.VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
      } else {
        return new Response("Invalid verify token", { status: 403 });
      }
    }

    // POST. Facebook messenger eventuud
    if (request.method === "POST") {
      try {
        const body = await request.json();
        console.log("Incoming webhook:", JSON.stringify(body));

        if (body.object === "page") {
          for (const entry of body.entry) {
            for (const event of entry.messaging) {
              if (event.message && event.sender) {
                const senderId = event.sender.id;
                const receivedMessage = event.message.text;

                // Auto reply send back fb messenger                await sendTextMessage(senderId, `Tẫ픑し぀ "${receivedMessage}"`, env);
              }
            }
          }
        }

        return new Response("EVENT_RECEIVED", { status: 200 });
      } catch (err) {
        console.error("Webhook error:", err)\n        return new Response("Error", { status: 500 });
      }
    }

    return new Response("Not found", { status: 404 });
  }
}

// Text message butsaa
async function sendTextMessage(recipientId, text, env) {
  const url = ` https://graph.facebook.com/v19.0/me/messages?access_token=${env.PAGE_ACCESS_TOKEN} `;

  const payload = {
    recipient: { id: recipientId },
    message: { text }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Failed to send message:", errText);
  }
}