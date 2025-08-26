export function normalizeText(input) {
  let text = input.toLowerCase().trim();

  const mapping = {
    // Үнийн асуулт
    "une": "une",
    "vne": "une",
    "ynee": "une",
    "hed": "hed",
    "hed ve": "hed",
    "hed bn": "hed",
    "hed we": "hed",
    "zereeg": "zereeg",
    "avah": "avah",
    "avlalt": "avlalt",

    // Мэндчилгээ
    "sain uu": "sain",
    "sain bnu": "sain",
    "sainuu": "sain",
    "sayn uu": "sain",
    "saiin uu": "sain",
    "sn uu": "sain",
    "sn bnu": "sain",
    "mend": "mend",
    "mend uu": "mend",
    "omend": "mend",
    "o mend": "mend",
    "өмөнд": "mend",
    "сайн байна уу": "sain",
    "сайн байна": "sain",
    "байна уу": "baina",
    "байна": "baina",
    "байну": "baina",
    "бну": "baina",
    "bnu": "baina",
    "bn": "baina",
    "bainuu": "baina",
    "baynu": "baina",

    // Англи
    "hi": "sain",
    "hello": "sain",
    "hey": "sain",
    "yo": "sain",
    "hiya": "sain",
    "sup": "sain",
    "whats up": "sain",
    "wassup": "sain",
    "wsup": "sain",
    "good morning": "mend",
    "good afternoon": "mend",
    "good evening": "mend",

    // Huue variations (Latin + Cyrillic)
    "huue": "huue",
    "huuee": "huue",
    "huueee": "huue",
    "huee": "huue",
    "huyee": "huue",
    "hue": "huue",
    "хуе": "huue",
    "хуее": "huue",
    "хуеее": "huue",
    "хуеэ": "huue",
    "хуя": "huue"
  };

  for (const [latin, tag] of Object.entries(mapping)) {
    const regex = new RegExp(`^${latin}$`, "i");  // бүхэл үг тааруулах
    if (regex.test(text)) {
      return tag;
    }
  }

  return text;
}
