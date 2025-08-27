export function getGreetAnswer(text) {
  const t = text.toLowerCase();

  const responses = {
    "hello": "Сого сого!",
    "hi": "Чатявая!",
    "sain": "Сого сого!",
    "howay": "Чатявая!",
    "hey": "Чатявая!"
  };

  return responses[t] || "";
}
