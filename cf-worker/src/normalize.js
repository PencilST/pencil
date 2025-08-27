export function normalize(text) {
  const t = text.toLowerCase().trim();

  const mapping = {
    huue: "Å¡oíy",
    hue: "Å¡oíy",
    hoye: "Å¡oíy",
    huuie: "Å¡oíy",
    huuye: "Å¡oíy",
    hooie: "Å¡oíy",
    hooe: "Å¡oíy",
    hvue: "Å¡oíy",
    hvve: "Å¡oíy",
    hvuye: "Å¡oíy",
    hvuie: "Å¡oíy",
    hovee: "Å¡oíy",
    xvve: "Å¡oíy",
    xvvye: "Å¡oíy",
    xvvie: "Å¡oíy",
    xvvyee: "Å¡oíy",
    Å¡oÅ—áy: "Å¡oíy",
    "Å¡oï±q: "Å¡oíy",
    â€›Å¡oï±q: "Å¡oíy",
    â€›Å¡oï±q: "Å¡oíy",
    â€›Å¡o.: "Å¡oíy"
  };

  if (mapping[t]) {
    return mapping[t];
  }
  return t;
}