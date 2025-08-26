import { route } from "./lib/brain.js";

export async function onRequestGet({ request, env }) {
  const u = new URL(request.url);
  if (u.searchParams.get("hub.mode")==="subscribe" &&
      u.searchParams.get("hub.verify_token")===env.VERIFY_TOKEN &&
      u.searchParams.get("hub.challenge")) {
    return new Response(u.searchParams.get("hub.challenge"), { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(()=>({}));
  // 🔍 Лог
  console.log("RAW_BODY", JSON.stringify(body));
  const msg = body?.entry?.[0]?.messaging?.[0];
  const sender = msg?.sender?.id;
  const text = msg?.message?.text || "";
  console.log("RAW_BODY", JSON.stringify(body));
  console.log("MSG", text);
  console.log("SENDER", sender);
  console.log("HAS_TOKEN", !!env.PAGE_ACCESS_TOKEN);

  // Facebook-д түргэн 200 буцаана
  const ack = new Response("OK", { status: 200 });

  // Хариу илгээх
  const replyText = route(text);
  if (sender && replyText && env.PAGE_ACCESS_TOKEN) {
    const payload = { recipient:{ id: sender }, message:{ text: replyText } };
    fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${env.PAGE_ACCESS_TOKEN}`, {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    }).catch(err => console.error("FB SEND ERROR", err));
  }
  return ack;
}
