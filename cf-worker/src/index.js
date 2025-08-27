import { normalize } from "./normalize.js";
import { greet } from "./greet.js";
import { faq } from "./faq.js";
import { brain } from "./brain.js";
import { guide } from "./guide.js";

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      // Verify for Facebook webhook
      if (request.method === "GET") {
        const mode = url.searchParams.get("hub.mode");
        const token = url.searchParams.get("hub.verify_token");
        const challenge = url.searchParams.get("hub.challenge");

        if (mode === "subscribe" && token && token.toLowerCase() === "pencil".toLowerCase()) {
          return new Response(challenge, { status: 200 });
        } else {
          return new Response("Forbidden", { status: 403 });
        }
      }

      // POST HANDLE FOR MESSENGER EVENTS
      if (request.method === "POST") {
        const body = await request.json();
        const text = body?.message?.text || body?.text || "";
        const trm = normalize(text);

        // 1) Greet
        const gr
          = greet(trm);
        if (gr) {
          return new Response(JSON.stringify({ reply: gr }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        // 2) FAQ
        const fq = faq(trm);
        if (fq) {
          return new Response(JSON.stringify({ reply: fq }), {
            headers: { "Content-Type": "application/json" },
         });
        }

        // 3) Brain logic
        const br = brain(trm);
        if (br) {
          return new Response(JSON.stringify({ reply: br }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        // 4) Guide fallback
        const gd = guide(trm);
        return new Response(JSON.stringify({ reply: gd }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response("Method Not Allowed", { status: 405 });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Server error", details: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
}