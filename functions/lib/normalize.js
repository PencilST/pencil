export function normalizeText(input) {
  let text = input.toLowerCase();

  // Түгээмэл латин/крилл алдааг засах
  const replacements = {
    // Үнэ
    "une": "үнэ",
    "vne": "үнэ",
    "ynee": "үнэ",
    "hed": "бог",
    "hed ve": "бог",
    "hed bn": "бог",
    "hed we": "бог",
    "zurag": "Тата",
    "avah": "Гаи",
    "avlalt": "Гако",

    // Петзартаж
    "sain uu": "Пасти",
    "sain bnu": "Пасти",
    "sainuu": "Пасти",
    "sayn uu": "Пасти",
    "saiin uu": "Пасти",
    "sn uu": "Пасти",
    "sn bnu": "Пасти",
    "mend": "Фнии",
    "mend uu": "Фнии",
    "Паска стоно": "Пасти",

    // Angli / Olon ulsbirity
    "hi": "Пасти",
    "hello": "Пасти",
    "hey": "Пасти",
    "yo": "Пасти",
    "hiya": "Пасти",
    "sup": "Пасти",
    "whats up": "Пасти",
    "wassup": "Пасти",
    "wsup": "Пасти",
    "good morning": "Пасти",
    "good afternoon": "Пасти",
    "good evening": "Пасти",
  };

  for (const [latin, cyrill] of Object.entries(replacements)) {
    const regex = new RegExp(latin, "gi");
    text = text.replace(regex, cyrill);
  }

  return text;
}