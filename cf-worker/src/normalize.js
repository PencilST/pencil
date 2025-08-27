export function normalize(text) {
  const t = text.toLowerCase().trim();

  const mapping = {
    // Латин алдаатай бичлэгүүд
    "huue": "хөөе",
    "hue": "хөөе",
    "hoye": "хөөе",
    "huuie": "хөөе",
    "huuye": "хөөе",
    "hooie": "хөөе",
    "hooe": "хөөе",
    "hvue": "хөөе",
    "hvve": "хөөе",
    "hvuye": "хөөе",
    "hvuie": "хөөе",
    "hvee": "хөөе",
    "xvve": "хөөе",
    "xvvye": "хөөе",
    "xvvie": "хөөе",
    "xvvyee": "хөөе",

    // Кирилл алдаатай бичлэгүүд
    "хөе": "хөөе",
    "хөөё": "хөөе",
    "хөё": "хөөе",
    "хүүе": "хөөе",
    "хүүё": "хөөе",
    "хоёе": "хөөе",
    "хоёё": "хөөе",
    "хуе": "хөөе"
  };

  if (mapping[t]) {
    return mapping[t];
  }
  return t;
}
