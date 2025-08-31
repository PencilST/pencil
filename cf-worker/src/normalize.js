export function normalize(text) {
  if (!text) return "";

  let t = text.toLowerCase().trim();

  // 🔑 Текст хувиргах dictionary (variation → зөв хэлбэр)
  const mapping = {
    // --- Танайх variations ---
    "tanai": "танайх",
    "tanaih": "танайх",
    "tnai": "танайх",
    "tnaih": "танайх",
    "tnay": "танайх",
    "tna": "танайх",
    "ta nar": "танайх",
    "taanars": "танайх",
    "taanuus": "танайх",
    "tanuus": "танайх",
    "stud": "студи",
    "studio": "студи",

    // --- Клип variations ---
    "clip": "клип",
    "klip": "клип",
    "clp": "клип",
    "klib": "клип",
    "clib": "клип",
    "klipp": "клип",
    "clippe": "клип",

    // --- Хий variations ---
    "hiih": "хий",
    "hiij": "хий",
    "hiideg": "хий",
    "hii": "хий",
    "hi": "хий",

    // --- Үү variations ---
    "uu": "үү",
    "vv": "үү",
    "u": "үү",
    "y": "үү",
    "yu": "үү",
    "ү": "үү",
    "уу": "үү",

    // --- Бусад жишээ (huue, hoy гэх мэт) ---
    "huue": "хөөе",
    "hoy": "хөөе",
    "huuie": "хөөе",
    "hooe": "хөөе",
  };

  // mapping dictionary-д таарвал шууд орлуулна
  if (mapping[t]) {
    return mapping[t];
  }

  // үг дотор таарч байвал солих
  for (const key in mapping) {
    if (t.includes(key)) {
      t = t.replace(new RegExp(key, "g"), mapping[key]);
    }
  }

  // unwanted тэмдэгтүүдийг цэвэрлэх (emojis, punctuation гэх мэт)
  t = t.replace(/[^а-яөөүa-z0-9\\s]/gi, "");

  return t;
}
