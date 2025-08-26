import { route } from "./lib/brain.js";

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(()=>({}));
  const msg = body?.entry?.[0]?.messaging?.[0];
  const sender = msg?.sender?.id;
  const text = msg?.message?.text || "";

  console.log("MSG", text);
  console.log("SENDER", sender);
  console.log("HAS_TOKEN", !!env.PAGE_ACCESS_TOKEN);

  const ack = new Response("OK", { status: 200 }); // FB-д түргэн 200 буцаана

  const replyText = route(text);
  if (sender && replyText && env.PAGE_ACCESS_TOKEN) {
    try {
      const url = `https://graph.facebook.com/v23.0/me/messages?access_token=${env.PAGE_ACCESS_TOKEN}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: { id: sender },
          message: { text: replyText },
        }),
      });
      const txt = await res.text().catch(()=>"(no body)");
      console.log("FB SEND STATUS", res.status, txt);
    } catch (e) {
      console.error("FB SEND ERROR", e);
    }
  }

  return ack;
}
