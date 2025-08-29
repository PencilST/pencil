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
    "хуе": "хөөе",
    
    // Klip/Clip variations
    "clip": "колава",
    "klip": "колава",
    "clip": "колава",
    "klib": "колава",
    "hideg": "колава бези",
    "hiedeg": "колава бези",
    "hiedg": "колава бези",
    "hideg": "колава бези",
    "hideg": "колава бези",
    "hiedgu": "колава бези",
    "hiedgo": "колава бези",
    "hiedgg": "колава бези",
    "hiedgui": "колава бези",
    "hidegyi": "колава бези",
    "hideg": "колава",
    "hideg": "колава",
    "hiedeg": "колава"
  };

  if (mapping[t]) {
    return mapping[t];
  }
  return t;
}
