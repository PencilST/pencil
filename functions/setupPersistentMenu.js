export default async function setupPersistentMenu(PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v23.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`;
  const body = {
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          { type: "postback", title: "📋 Үйлчилгээ", payload: "MENU_SERVICE" },
          { type: "postback", title: "ℹ️ Тухай", payload: "MENU_INFO" },
          { type: "postback", title: "📞 Холбоо барих", payload: "MENU_CONTACT" }
        ]
      }
    ]
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Failed to setup persistent menu", data);
  } else {
    console.log("Successfully set up persistent menu", data);
  }
}
