import sendContactMenu from "./sendContactMenu.js";
import setupPersistentMenu from "./setupPersistentMenu.js";
import { brain } from "../cf-worker/src/brain.js"; // 🆕 import

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Persistent menu setup
    if (url.pathname === "/setup-menu" && request.method === "GET") {
      const result = await setupPersistentMenu(env.PAGE_ACCESS_TOKEN);
      return new Response("Persistent Menu configured! " + JSON.stringify(result), { status: 200 });
    }

    // Facebook webhook verification
    if (request.method === "GET") {
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");
      if (token === env.VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
      } else {
        return new Response("Invalid verify token", { status: 403 });
      }
    }

    // Handle incoming messages
    if (request.method === "POST") {
      try {
        const raw = await request.text();
        let body;

        try {
          body = JSON.parse(raw);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        if (body?.entry) {
          for (const entry of body.entry) {
            for (const event of entry.messaging ?? []) {
              const senderId = event.sender?.id;
              const payload =
                event.message?.quick_reply?.payload ||
                event.postback?.payload;

              if (!senderId) continue;

              // --- Үндсэн цэс ---
              if (payload === "MENU_MAIN" || payload === "GET_STARTED") {
                const greeting = getGreeting();
                await sendTextWithQuickReplies(
                  senderId,
                  `${greeting}! 👋 Үндсэн цэсээс сонгоно уу 👇`,
                  [
                    { content_type: "text", title: "🏢 Ажил үйлчилгээ", payload: "MENU_SERVICE" },
                    { content_type: "text", title: "💻 Мэдээлэл / Зөвлөгөө", payload: "MENU_INFO" },
                    { content_type: "text", title: "📞 Холбоо барих", payload: "MENU_CONTACT" }
                  ],
                  env.PAGE_ACCESS_TOKEN
                );
              }

              // --- Холбоо барих ---
              else if (payload === "MENU_CONTACT") {
                await sendTextWithQuickReplies(
                  senderId,
                  "📞 Холбоо барих цэс:",
                  [
                    { content_type: "text", title: "🏢 Хаяг, дугаар", payload: "CONTACT_ADDRESS" },
                    { content_type: "text", title: "👩‍💼 Ажилчдын профайл", payload: "CONTACT_PROFILES" },
                    { content_type: "text", title: "⬅️ Буцах", payload: "MENU_MAIN" }
                  ],
                  env.PAGE_ACCESS_TOKEN
                );
              }

              // --- Хаяг ---
              else if (payload === "CONTACT_ADDRESS") {
                await sendTextWithQuickReplies(
                  senderId,
                  "🏢 Манай хаяг:\n📍 Улаанбаатар, ...\n📞 Утас: +976 99112233\n✉️ Имэйл: info@studio.mn",
                  [
                    { content_type: "text", title: "👩‍💼 Ажилчдын профайл", payload: "CONTACT_PROFILES" },
                    { content_type: "text", title: "⬅️ Буцах", payload: "MENU_CONTACT" }
                  ],
                  env.PAGE_ACCESS_TOKEN
                );
              }

              // --- Ажилчдын профайл ---
              else if (payload === "CONTACT_PROFILES") {
                console.log("👉 CONTACT_PROFILES цэс сонгогдлоо");

                async function getProfilePic(id) {
                  const apiUrl = `https://graph.facebook.com/${id}/picture?width=400&height=400&redirect=0&access_token=${env.PAGE_ACCESS_TOKEN}`;
                  try {
                    const res = await fetch(apiUrl);
                    const data = await res.json();
                    if (!data || !data.data || !data.data.url || data.data.is_silhouette === true) {
                      return "https://i.imgur.com/8Km9tLL.jpg"; // Default
                    }
                    return data.data.url;
                  } catch (err) {
                    console.error("❌ Profile API алдаа:", id, err.message);
                    return "https://i.imgur.com/8Km9tLL.jpg"; // Default
                  }
                }

                try {
                  const sunbaatarPic = await getProfilePic("100003275328756");
                  const gibsonPic = await getProfilePic("100003636016682");
                  const ganbatPic = await getProfilePic("100080558270234");

                  const urlFb = `https://graph.facebook.com/v23.0/me/messages?access_token=${env.PAGE_ACCESS_TOKEN}`;
                  const bodyProfiles = {
                    recipient: { id: senderId },
                    message: {
                      attachment: {
                        type: "template",
                        payload: {
                          template_type: "generic",
                          elements: [
                            {
                              title: "☀️ Наранбаатар",
                              image_url: sunbaatarPic,
                              subtitle: "Менежер — Бизнесийн удирдлага",
                              buttons: [
                                { type: "web_url", url: "https://www.facebook.com/100003275328756", title: "Facebook харах" }
                              ]
                            },
                            {
                              title: "🎸 Нацагдорж",
                              image_url: gibsonPic,
                              subtitle: "Хөгжимчин — Гитарист",
                              buttons: [
                                { type: "web_url", url: "https://www.facebook.com/100003636016682", title: "Facebook харах" }
                              ]
                            },
                            {
                              title: "🤔 Ганбат",
                              image_url: ganbatPic,
                              subtitle: "Инженер — Програм хангамж",
                              buttons: [
                                { type: "web_url", url: "https://www.facebook.com/100080558270234", title: "Facebook харах" }
                              ]
                            }
                          ]
                        }
                      }
                    }
                  };

                  await fetch(urlFb, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyProfiles),
                  });
                  console.log("✅ Profiles илгээгдлээ Messenger рүү");
                } catch (e) {
                  console.error("❌ CONTACT_PROFILES алдаа:", e.message);
                }
              }

              // --- Үйлчилгээ ---
              else if (payload === "MENU_SERVICE") {
                await sendTextWithQuickReplies(
                  senderId,
                  "🏢 Манай үйлчилгээний тухай мэдээлэл...",
                  [
                    { content_type: "text", title: "⬅️ Буцах", payload: "MENU_MAIN" }
                  ],
                  env.PAGE_ACCESS_TOKEN
                );
              }

              // --- Мэдээлэл / Зөвлөгөө ---
              else if (payload === "MENU_INFO") {
                await sendTextWithQuickReplies(
                  senderId,
                  "💻 Мэдээлэл болон зөвлөгөө...",
                  [
                    { content_type: "text", title: "⬅️ Буцах", payload: "MENU_MAIN" }
                  ],
                  env.PAGE_ACCESS_TOKEN
                );
              }

              // --- 🆕 Brain chatbot integration ---
              else if (event.message && event.message.text) {
                const userMessage = event.message.text;
                const replyText = brain(userMessage) || "🤖 Уучлаарай, ойлгосонгүй ээ...";

                await sendTextWithQuickReplies(
                  senderId,
                  replyText,
                  null, // 🆕 quickReplies-г хоосон үед явуулахгүй
                  env.PAGE_ACCESS_TOKEN
                );
              }
            }
          }
        }

        return new Response("EVENT_RECEIVED", { status: 200 });
      } catch (err) {
        console.error("❌ Worker нийт алдаа:", err.message);
        return new Response("Error: " + err.message, { status: 500 });
      }
    }

    return new Response("Not found", { status: 404 });
  }
};

function getGreeting() {
  const now = new Date();
  const hour = (now.getUTCHours() + 8) % 24; // УБ цаг

  if (hour >= 5 && hour < 12) return "Өглөөний мэнд 🌅";
  if (hour >= 12 && hour < 17) return "Өдрийн мэнд ☀️";
  if (hour >= 17 && hour < 21) return "Оройн мэнд 🌆";
  return "Үдшийн мэнд 🌙";
}

async function sendTextWithQuickReplies(senderId, text, quickReplies, PAGE_ACCESS_TOKEN) {
  const url = `https://graph.facebook.com/v23.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  const body = {
    recipient: { id: senderId },
    message: { text }
  };

  // 🆕 зөвхөн quickReplies байгаа үед нэмнэ
  if (quickReplies && quickReplies.length > 0) {
    body.message.quick_replies = quickReplies;
  }

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
