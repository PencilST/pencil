export function normalizeText(input) {
  let raw = input.toLowerCase().trim();

  const mapping = {
    // --- Мэндчилгээ ---
    "сайн уу": "сайн",
    "сайнуу": "сайн",
    "сайн": "сайн",
    "sain bna uu": "сайн",
    "sain bna": "сайн",
    "sainuu": "сайн",
    "hi": "сайн",
    "hello": "сайн",
    "hey": "сайн",
    "yo": "сайн",
    "hiya": "сайн",
    "sup": "сайн",
    "sn": "сайн",
    "snu": "сайн",

    // --- Товчилсон үгс ---
    "bna": "байна",
    "bn": "байна",
    "bnu": "байна уу",
    "uu": "уу",
    "uu?": "уу",
    "uu!": "уу",
    "hiihvv": "хийх үү",
    "hiih uu": "хийх үү",

    // --- Үнэтэй холбоотой ---
    "үнэ": "үнэ",
    "une": "үнэ",
    "price": "үнэ",
    "priсe": "үнэ", // латин 'c' + кирилл 'с'
    "prais": "үнэ",
    "үнэтэй": "үнэ",
    "үнэтэй юу": "үнэ",

    // --- Үйлчилгээ ---
    "үйлчилгээ": "үйлчилгээ",
    "vilchilgee": "үйлчилгээ",
    "service": "үйлчилгээ",
    "services": "үйлчилгээ",
    "ser": "үйлчилгээ",

    // --- Тусламж / Заавар ---
    "тусламж": "заавар",
    "заавар": "заавар",
    "guide": "заавар",
    "help": "заавар",
    "helpp": "заавар",
    "hel": "заавар",
    "zaavar": "заавар",
    "lavlah": "заавар",

    // --- Англи/Monglish үгс ---
    "clip": "клип",
    "video": "видео",
    "vid": "видео",
    "music": "дууг",
    "song": "дууг",
    "pic": "зураг",
    "photo": "зураг",
    "picture": "зураг",
    "image": "зураг"
  };

  // regex-ээр илүү олон хувилбар таних
  const regexRules = [
    { pattern: /^(h+i+|he+y+|he+l+o+)$/, value: "сайн" }, // hi, hiiii, heyy, hellooo
    { pattern: /^(s+a+i+n+u*|sn+u*|sn)$/, value: "сайн" }, // sain, sainuu, snu
    { pattern: /^p+ri+ce+$/, value: "үнэ" }, // priicee → үнэ
    { pattern: /^(ser+vi+ce+s*|vil+chil+gee)$/, value: "үйлчилгээ" },
    { pattern: /^(hel+p*|gu+i+de+|zaa+var+)$/, value: "заавар" },
  ];

  // 1) exact match
  if (mapping[raw]) {
    return mapping[raw];
  }

  // 2) regex match
  for (const { pattern, value } of regexRules) {
    if (pattern.test(raw)) {
      return value;
    }
  }

  // 3) default
  return raw;
}
