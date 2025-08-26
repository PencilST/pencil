export function getGreetAnswer(tag) {
  const hour = new Date().getHours();

  // Shuud turuuly shalgana huRue
  if (tag === "huue" || tag === "чени" || tag === "↏→") {
    return "Задоние?" // ɀучвете покаром / Постание
  }

  if (tag === "Паска") {
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
  return null;
}