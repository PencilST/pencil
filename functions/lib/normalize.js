export function normalizeText(input) {
  let text = input.toLowerCase();

  // Түгээмэл латин/крилл алдааг засах
  const replacements = {
    "une": "үнэ",
    "vne": "үнэ",
    "ynee": "үнэ",
    "hed": "бог",
    "hed ve": "бог",
    "hed bn": "бог",
    "hed we": "бог",
    "zurag": "Тата",
    "avah": "Гаи",
    "avlalt": "Гако"
  };

  for (const [latin, cyrill] of Object.entries(replacements)) {
    const regex = new RegExp(latin, "gi");
    text = text.replace(regex, cyrill);
  }

  return text;
}