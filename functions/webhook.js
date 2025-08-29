import sendContactMenu from "./sendContactMenu.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ✅ Facebook webhook verification
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
        const signature256 = request.headers.get("x-hub-signature-256");
        const raw = await request.text();

        // Parse JSON body safely
        let body;
        try {
          body = JSON.parse(raw);
        } catch {
          console.error("❌ Invalid JSON:", raw);
          return new Response("Invalid JSON", { status: 400 });
        }

        // ✅ Signature verification
        if (signature256) {
          const encoder = new TextEncoder();
          const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(env.APP_SECRET),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["verify"]
          );

          const expected = hexToBytes(signature256.replace("sha256=", ""));
          const ok = await crypto.subtle.verify(
            "HMAC",
            key,
            expected,
            encoder.encode(raw)
          );

          if (!ok) {
            console.error("❌ Invalid signature");
            return new Response("Invalid signature", { status: 403 });
          }
        }

        // 👉 Handle payloads safely
        if (body?.entry) {
          for (const entry of body.entry) {
            for (const event of entry.messaging ?? []) {
              const senderId = event.sender?.id;
              const payload = event.message?.quick_reply?.payload;

              if (!senderId) {
                console.error("⚠️ Missing senderId in event:", event);
                continue;
              }

              if (payload === "CONTACT") {
                await sendContactMenu(senderId, env.PAGE_ACCESS_TOKEN);
              } else if (payload === "CONTACT_ADDRESS") {
                await sendText(
                  senderId,
                  "🏢 Манай студи:\n📍 Хаяг: УБ, ...\n📞 Утас: +976 99112233\n✉️ Имэйл: info@studio.mn",
                  env.PAGE_ACCESS_TOKEN
                );
              } else if (payload === "CONTACT_PROFILES") {
                await sendText(senderId, "👩‍🎨 Ажилчдын профайл", env.PAGE_ACCESS_TOKEN);
              } else {
                console.log("ℹ️ Unknown payload:", payload);
              }
            }
          }
        } else {
          console.error("⚠️ No entry in body:", body);
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

// Simple text reply
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

// Helper to convert hex signature → Uint8Array
function hexToBytes(hex) {
  const bytes = new Uint8Array(Math.ceil(hex.length / 2));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}
