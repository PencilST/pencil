export default async function sendContactMenu(senderId, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v23.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;

  const body = {
    recipient: { id: senderId },
    messaging_type: "RESPONSE",
    message: {
      text: "📞 Холбоо барих",
      quick_replies: [
        {
          content_type: "text",
          title: "🏢 Хаяг, дугаар",
          payload: "CONTACT_ADDRESS"
        },
        {
          content_type: "text",
          title: "👩‍🎨 Ажилчдын профайл",
          payload: "CONTACT_PROFILES"
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
