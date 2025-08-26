export async function onRequestGet({ request, env }) {
  const u = new URL(request.url);
  if (u.searchParams.get("hub.mode")==="subscribe" &&
      u.searchParams.get("hub.verify_token")===env.VERIFY_TOKEN) {
    return new Response(u.searchParams.get("hub.challenge"), { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}
export async function onRequestPost({ request }) {
  await request.json().catch(()=>{});
  return new Response("OK", { status: 200 });
}
