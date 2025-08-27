import { normalize } from "./lib/normalize.js";

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const workerUrl = env.PENCIL_BOT_URL || 'https://pencil-bot.workers.dev';

    // Whatever message comes in, forward it to the Worker
    const res = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base: body }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json'}
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response("Error", { status: 500 });
  }
}
