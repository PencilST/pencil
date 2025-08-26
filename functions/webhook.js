// ✅ Facebook Webhook Verification (GET)
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === env.VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    return new Response(challenge, { status: 200 });
  } else {
    return new Response("Forbidden", { status: 403 });
  }
}

// ✅ Facebook Webhook Event Handler (POST)
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    console.log("RAW_BODY", JSON.stringify(body));

    if (body.object === "page") {
      for (const entry of body.entry) {
        for (const event of entry.messaging) {
          const senderId = event.sender.id;

          if (event.message && event.message.text) {
            const text = event.message.text;
            console.log("MSG", text);

            await sendMessage(
              senderId,
              "Таны мессеж: " + text,
              env.PAGE_ACCESS_TOKEN
            );
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

// ✅ Send message back to Messenger
async function sendMessage(recipientId, message, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  const payload = {
    recipient: { id: recipientId },
    message: { text: message },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log("SEND_API_RES", JSON.stringify(data));
}
