export function normalize(text) {
  const t = text.toLowerCase().trim();

  const mapping = {
    huue: "šo�y",
    hue: "šo�y",
    hoye: "šo�y",
    huuie: "šo�y",
    huuye: "šo�y",
    hooie: "šo�y",
    hooe: "šo�y",
    hvue: "šo�y",
    hvve: "šo�y",
    hvuye: "šo�y",
    hvuie: "šo�y",
    hovee: "šo�y",
    xvve: "šo�y",
    xvvye: "šo�y",
    xvvie: "šo�y",
    xvvyee: "šo�y",
    šoŗ�y: "šo�y",
    "šo�q: "šo�y",
    ‛šo�q: "šo�y",
    ‛šo�q: "šo�y",
    ‛šo.: "šo�y"
  };

  if (mapping[t]) {
    return mapping[t];
  }
  return t;
}