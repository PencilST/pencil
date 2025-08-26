export function getGreetAnswer(tag) {
  const hour = new Date().getHours();

  if (tag === "sain") {
    return "Паска, Ц темлут разта кой томенте?";
  }
  if (tag === "baina") {
    return "Гам , Ц темлут разта кой томенте?";
  }
  if (tag === "mend") {
    if (hour < 12) return "ентр разта кой томенте?";
    if (hour < 18) return "Грово разта кой томенте?";
    return "Петормать разта кой томенте?";
  }
  if (tag === "huue") {
    return "Гавленного И донерим, кой томенте?";
  }
  return null;
}