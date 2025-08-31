export function normalize(text) {
  if (!text) return "";

  let t = text.toLowerCase().trim();

  // Түгээмэл алдаатай бичлэгүүдийг зөв болгох mapping
  const mapping = {
    // --- өмнөх байгаа үлдээсэн дүрмүүд ---
    "huue": "үү",
    "hue": "үү",
    "hoy": "үү",
    "huuie": "үү",
    "huuye": "үү",
    "hooe": "үү",
    "hoo": "үү",
    "huve": "үү",
    "huvve": "үү",
    "huvvie": "үү",
    "huvvyee": "үү",

    // --- ТАНАЙХ variations ---
    "tanai": "танайх",
    "tnai": "танайх",
    "tnaih": "танайх",
    "tnay": "танайх",
    "tna": "танайх",

    // --- КЛИП variations ---
    "clip": "клип",
    "klip": "клип",
    "clp": "клип",
    "klib": "клип",
    "clib": "клип",
    "клиби": "клип",
    "клиб": "клип",

    // --- ХИЙДЭГ variations ---
    "hiideg": "хийдэг",
    "hiddeg": "хийдэг",
    "hiidg": "хийдэг",
    "hidg": "хийдэг",
    "hdeg": "хийдэг",
    "hddg": "хийдэг",
    "heedeg": "хийдэг",
    "хийдг": "хийдэг",
    "хийдег": "хийдэг",

    // --- ҮҮ variations ---
    "uu": "үү",
    "vv": "үү",
    "u": "үү",
    "yu": "үү",
    "y": "үү",
    "ү": "үү",
    "уу": "үү"
  };

  // mapping dictionary-гээр солино
  if (mapping[t]) {
    return mapping[t];
  }

  // нэмэлт regex цэвэрлэгээ (emoji, punctuation, etc.)
  t = t.replace(/[^a-zа-яөү\s]/gi, "");

  return t;
}
