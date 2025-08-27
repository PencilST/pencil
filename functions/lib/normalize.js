// Хэрэглэгчийн оруулсан текстийг нэг мөрт жигдрүүлнэ
export function normalize(text) {
  if (!text) return "";

  let t = text.toLowerCase().trim();

  // --- Dictionary mapping ---
  const synonyms = {
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
    "hiya": "сайн",
    "yo": "сайн",
    "sup": "сайн",
    "sn": "сайн",
    "snu": "сайн",

    // --- Товчилсон ---
    "bna": "байна",
    "bn": "байна",
    "bnu": "байна уу",
    "uu": "уу",
    "hiihvv": "хийх үү",
    "hiih uu": "хийх үү",

    // --- Үнэтэй холбоотой ---
    "үнэ": "үнэ",
    "une": "үнэ",
    "price": "үнэ",
    "priсe": "үнэ", // латин+cyrillic холилдсон
    "prais": "үнэ",
    "pрайс": "үнэ",
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

    // --- Reel (Facebook, Instagram) ---
    "reel": "reel",
    "reels": "reel",
    "reell": "reel",
    "real": "reel",
    "ril": "reel",
    "rilz": "reel",
    "fb reel": "reel",
    "facebook reel": "reel",
    "fbreel": "reel",
    "fbreels": "reel",
    "ig reel": "reel",
    "insta reel": "reel",
    "instareel": "reel",
    "ig reels": "reel",
    "insta reels": "reel",
    "рил": "reel",
    "рилс": "reel",
    "фб рилс": "reel",
    "фэйсбүүк рилс": "reel",
    "инстаграм рилс": "reel",
    "иг рилс": "reel",

    // --- Реклам / Зар ---
    "reklam": "реклам",
    "reclam": "реклам",
    "reklaam": "реклам",
    "reklama": "реклам",
    "ad": "реклам",
    "ads": "реклам",
    "advert": "реклам",
    "advertising": "реклам",
    "promotion": "реклам",
    "promo": "реклам",
    "реклам": "реклам",
    "реклама": "реклам",
    "зар": "реклам",
    "зарыг": "реклам",
    "сурталчилгаа": "реклам",
    "сурталчилга": "реклам",
    "промо": "реклам"
  };

  // --- Regex дүрмүүд ---
  const regexRules = [
    { pattern: /^(h+i+|he+y+|he+l+o+)$/, value: "сайн" },     // hi, hiiii, heyy, hellooo
    { pattern: /^(s+a+i+n+u*|sn+u*|sn)$/, value: "сайн" },   // sain, sainuu, snu
    { pattern: /^p+ri+ce+$/, value: "үнэ" },                 // priiceee → үнэ
    { pattern: /^(ser+vi+ce+s*|vil+chil+gee)$/, value: "үйлчилгээ" },
    { pattern: /^(hel+p*|gu+i+de+|zaa+var+)$/, value: "заавар" },
    { pattern: /^reel+s*$/, value: "reel" },
    { pattern: /^rekl+am+$/, value: "реклам" },
    { pattern: /^ads?$/, value: "реклам" }
  ];

  // Dictionary-оос шалгах
  if (synonyms[t]) {
    return synonyms[t];
  }

  // Regex дүрмүүдээс шалгах
  for (const rule of regexRules) {
    if (rule.pattern.test(t)) {
      return rule.value;
    }
  }

  return t;
}

// trigger new deployment
