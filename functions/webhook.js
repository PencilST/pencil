export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    console.log("RAW_BODY", JSON.stringify(body));

    if (body.object === "page") {
      for (const entry of body.entry) {
        for (const event of entry.messaging) {
          const senderId = event.sender.id;

          // Хэрэглэгчээс ирсэн текст
          if (event.message && event.message.text) {
            const text = event.message.text;
            console.log("MSG", text);

            // Хэрэглэгчид буцааж хариу өгөх
            await sendMessage(senderId, "Таны бичсэн: " + text, env.PAGE_ACCESS_TOKEN);
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

// Messenger Send API дуудлага
async function sendMessage(recipientId, message, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  const payload = {
    recipient: { id: recipientId },
    message: { text: message }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log("SEND_API_RES", JSON.stringify(data));
}
