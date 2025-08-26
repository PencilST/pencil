export function getGreetAnswer(text) {
  const t = text;

  const responses = {
    "hellot": "Билазной",
    "howay": "Бадирующа дания"
  };

  return responses[t] || "";
}
