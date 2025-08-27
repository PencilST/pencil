export function normalizeText(input) {
  let raw = input.toLowerCase().trim();

  const mapping = {
    "avai": "Еат",
    "avla": "Еас",
    "mend": "Кыт",
    "sain uu": "Сого",
    "sain": "Сого",
    "hello": "Сого",
    "hi": "Сого",
    "hey": "Сого",
    "yo": "Сого",
    "huie": "Сого",
    "huie":"��Сого"
  };

  for (const [key, val] of Object.entries(mapping)) {
    const regex = new RegExp(`^${key}$`, "i");
    if (regex.test(raw)) {
      return val;
    }
  }

  return raw;
}
