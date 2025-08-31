export default async function sendContactMenu(senderId, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v23.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;

  const body = {
    recipient: { id: senderId },
    messaging_type: "RESPONSE",
    message: {
      text: "🏢 Ажил үйлчилгээ",
      quick_replies: [
        {
          content_type: "text",
          title: "📞 Холбоо барих",
          payload: "CONTACT_ADDRESS"
        },
        {
          content_type: "text",
          title: "👤 Профайл, холбоосууд",
          payload: "CONTACT_PROFILES"
        },
        {
          content_type: "text",
          title: "🎥 Зураг авалт",
          payload: "STUDIO_PRODUCTION"
        },
        {
          content_type: "text",
          title: "🖼️ График дизайн",
          payload: "STUDIO_GRAPHIC"
        },
        {
          content_type: "text",
          title: "🖥️ 2D анимаци",
          payload: "STUDIO_2D"
        },
        {
          content_type: "text",
          title: "🖥️ 3D анимаци",
          payload: "STUDIO_3D"
        },
        {
          content_type: "text",
          title: "🎞️ Пост-продакшн",
          payload: "STUDIO_POST"
        }
      ]
    }
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Messenger API error", data);
    }
    return data;
  } catch (err) {
    console.error("Network error", err);
  }
}
