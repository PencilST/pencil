export function normalize(text) {
  const t = text.toLowerCase().trim();

  const mapping = {
    // --- "хөөе" variations (латин, алдаатай) ---
    "huue": "хөөе",
    "hue": "хөөе",
    "hoye": "хөөе",
    "huuie": "хөөе",
    "huuye": "хөөе",
    "hooie": "хөөе",
    "hooe": "хөөе",
    "hvue": "хөөе",
    "hvve": "хөөе",
    "hvvye": "хөөе",
    "huvie": "хөөе",
    "xvve": "хөөе",
    "xvvye": "хөөе",
    "xvvie": "хөөе",
    "xvvyee": "хөөе",

    // --- "хөөе" variations (кирилл, алдаатай) ---
    "хое": "хөөе",
    "хоёё": "хөөе",
    "хоёе": "хөөе",
    "хүе": "хөөе",
    "хүёё": "хөөе",
    "хүёе": "хөөе",
    "хоёёё": "хөөе",
    "хүё": "хөөе",

    // --- Клип variations ---
    "clip": "клип",
    "klip": "клип",
    "clib": "клип",
    "klib": "клип",

    // --- Хийдэг variations ---
    "hideg": "хийдэг",
    "hiedeg": "хийдэг",
    "hiideg": "хийдэг",
    "hiddeg": "хийдэг",
    "hiidg": "хийдэг",
    "hidg": "хийдэг"
  };

  if (mapping[t]) {
    return mapping[t];
  }
  return t;
}
