export function getGreetAnswer(text) {
  const t = text.toLowerCase();

  const responses = {
    "hello": "Сайн байна уу!",
    "hi": "Сайн уу!",
    "sain": "Сайн уу!",
    "сайн": "Сайн байна уу!",
    "hey": "Сайн уу!"
  };

  return responses[t] || "Сайн уу?";
}
