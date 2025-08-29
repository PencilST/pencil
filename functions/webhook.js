import sendContactMenu from "./sendContactMenu.js";

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

    // ص داز Handle incoming messages
    if (request.method === "POST") {
      try {
        const signature256 = request.headers.get("x-hub-signature-256");
        const raw = await request.text();

        // Try parsing JSON body
        let body;
        try {
          body = JSON.parse(raw);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        // Signature verification
        if (signature256) {
          const encoder = new TextEncoder();
          const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(env.APP_SECRET),
            { name: "HMAC", hash: { name: "SHA-256" } },
            false,
            ["sign"]
          );
          const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(raw));
          const signature = "sha256=" + Array.from(new Uint8Array(mac))
            .map(b => b.toString(16).padStart("0"))
            .join("");
          if (signature !== signature256) {
            return new Response("Invalid signature", { status: 403 });
          }
        }

        // – Handle payloads alt
        if (body.entry) {
          for (const entry of body.entry) {
            for (const event of entry.messaging) {
              if (event.message && event.message.quick_reply) {
                const payload = event.message.quick_reply.payload;
                const senderId = event.sender.id;

                if (payload === "CONTACT") {
                  await sendContactMenu(senderId, env.PAGE_ACCESS_TOKEN);
                } else if (payload === "CONTACT_ADDRESS") {
                  await sendText(senderId, "���� Manai studi:\n🤱 Hayag: UB, ...\n🐥 Utas helber: +976 99112233\n🐙 Imeil: info@studio.mn", env.PAGE_ACCESS_TOKEN);
                } else if (payload === "CONTACT_PROFILES") {
                  await sendText(senderId, "“ ajilchdyn profil", env.PAGE_ACCESS_TOKEN);
                }
            }
          }
        }

        return new Response("EVENT_RECEIVED", { status: 200 });
      } catch (err) {
        return new Response("Error: " + err.message, { status: 500 });
      }
    }

    return new Response("Not found", { status: 404 });
  }
};

// Simple text message
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