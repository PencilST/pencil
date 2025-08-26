import { route } from "./lib/brain.js";

export async function onRequestGet({ request, env }) {
  const u = new URL(request.url);
  const mode = u.searchParams.get("hub.mode");
  const token = u.searchParams.get("hub.verify_token");
  const challenge = u.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === env.VERIFY_TOKEN && challenge) {
    return new Response(challenge, { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(()=>({}));
  const entry = body?.entry?.[0];
  const msg = entry?.messaging?.[0];
  const sender = msg?.sender?.id;
  const text = msg?.message?.text || "";

  // Facebook-д 200-г түргэн буцаана
  const ack = new Response("OK", { status: 200 });

  // Хариу бэлтгээд буцаах
  const replyText = route(text);
  if (sender && replyText && env.PAGE_ACCESS_TOKEN) {
    const payload = { recipient: { id: sender }, message: { text: replyText } };
    fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${env.PAGE_ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    }).catch(()=>{});
  }
  return ack;
}
