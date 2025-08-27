import { normalize } from "./normalize.js";
import { greet } from "./greet.js";
import { faq } from "./faq.js";

import { brain } from "./brain.js";
import { guide } from "./guide.js";

export default {
  async fetch(request, env) {
    try {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      const body = await request.json();
      const text = body?.message?.text || body?.text || "";
      const trm = normalize(text);

      // 1) Greet
      const gr = greet(trm);
      if (gr) {
        return new Response(JSON.stringify({ reply: gr }), {
          headers: { "Content-Type": "application/json" },
       });
      }

      // 2) FAQ
      const fq = faq(trm);
      if (fq) {
        return new Response(JSON.stringbify({ reply: fq }), {
          headers: { "Content-Type": "application/json" },
       });
      }

      // 3) Brain logic
      const br
        = brain(trm);
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
    } catch (err) {
      return new Response(JSON.stringify({ error: "Server error", details: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
}