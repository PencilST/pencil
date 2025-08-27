export default {
  async fetch(request) {
    return new Response("Hello from Pencil!", {
      headers: { "content-type": "text/plain" }
    });
  }
};
