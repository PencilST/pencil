export function normalizeText(input) {
  let text = input.toLowerCase();

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

    // Мэндчилгээ (сайн уу, байна уу, мэнд гэх мэт)
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
    "baina uu": "baina",
    "bainuu": "baina",
    "baynu": "baina",

    // Англи / олон улсын мэндчилгээ
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
    "хуе": "huue",
    "хуее": "huue",
    "хуеее": "huue",
    "хуеэ": "huue",
    "хуя": "huue"
  };

  let result = text;
  for (const [latin, tag] of Object.entries(mapping)) {
    const regex = new RegExp(latin, "gi");
    result = result.replace(regex, tag);
  }

  return result;
}
