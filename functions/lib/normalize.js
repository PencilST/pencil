export function normalizeText(input) {
  let raw = input.toLowerCase().trim();

  // ✅ Хэрэглэгчийн алдаатай, латин/кирилл холилдсон үгсийг зөв хэлбэрт буулгах mapping
  const mapping = {
    // --- Мэндчилгээ ---
    "сайн уу": "сайн",
    "сайнуу": "сайн",
    "сайн": "сайн",
    "сайн уу?": "сайн",
    "сайн уу!": "сайн",

    "hi": "сайн",
    "hello": "сайн",
    "hey": "сайн",
    "heyy": "сайн",
    "hiya": "сайн",
    "yo": "сайн",
    "sup": "сайн",

    "sain": "сайн",
    "sainuu": "сайн",
    "snu": "сайн",
    "sn": "сайн",

    // --- Үнэтэй холбоотой ---
    "үнэ": "үнэ",
    "юуны үнэ": "үнэ",
    "une": "үнэ",
    "price": "үнэ",
    "үнэтэй": "үнэ",
    "үнэтэй юу": "үнэ",
    "yune": "үнэ",
    "unet": "үнэ",
    "priсe": "үнэ",  // латин 'c' + кирилл 'с' холилдсон
    "pрайс": "үнэ",

    // --- Үйлчилгээ ---
    "үйлчилгээ": "үйлчилгээ",
    "үйлчилгээнүүд": "үйлчилгээ",
    "service": "үйлчилгээ",
    "services": "үйлчилгээ",
    "ser": "үйлчилгээ",
    "vilchilgee": "үйлчилгээ",

    // --- Тусламж / Заавар ---
    "тусламж": "заавар",
    "заавар": "заавар",
    "guide": "заавар",
    "help": "заавар",
    "helpp": "заавар",
    "hel": "заавар",
    "zaavar": "заавар",
    "lavlah": "заавар",
  };

  // ✅ Regex-нүүрс (жижиг вариацуудыг багтаах)
  const regexRules = [
    { pattern: /^(h+i+|he+y+|he+l+o+)$/, value: "сайн" }, // hi, hiiii, heyy, hellooo
    { pattern: /^(s+a+i+n+u*|sn+u*|sn)$/, value: "сайн" }, // sain, sainuu, snu, sn
    { pattern: /^p+ri+ce+$/, value: "үнэ" }, // priicee → үнэ
    { pattern: /^(ser+vi+ce+s*|vil+chil+gee)$/, value: "үйлчилгээ" }, // service, services, vilchilgee
    { pattern: /^(hel+p*|gu+i+de+|zaa+var+)$/, value: "заавар" }, // help, helpp, guide, zaavar
  ];

  // 1) Exact match (mapping)
  if (mapping[raw]) {
    return mapping[raw];
  }

  // 2) Regex match
  for (const { pattern, value } of regexRules) {
    if (pattern.test(raw)) {
      return value;
    }
  }

  // 3) Default → буцааж өгнө
  return raw;
}
