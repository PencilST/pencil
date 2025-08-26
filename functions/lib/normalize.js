export function normalizeText(input) {
  let text = input.toLowerCase().trim();

  const mapping = {
    "avai": "avah",
    "avla": "avlah",
    "bainuu": "baina",
    "baynu": "baina",
    "mend": "mend",
    "mend uu": "mend",
    "omend": "mend",
    "o mend": "mend",
    "sain uu": "sain",
    "sain bnu": "sain",
    "sainuu": "sain",
    "sayn ui": "sain",
    "saiin ui": "sain",
    "sn uu": "sain",
    "sn bnu": "sain",
    "une": "une",
    "vne": "une",
    "ynee": "une",
    "hoe": "sain",
    "hello": "sain",
    "hey": "sain",
    "yo": "sain",
    "hiya": "sain",
    "sup": "sain",
    "whats up": "sain",
    "wassup": "sain",
    "wsup": "sain",
    "good morning": "mend",
    "good afternoon": "mend",
    "good evening": "mend",
    "hed": "hed",
    "hed ve": "hed",
    "hed bn": "hed",
    "hed we": "hed",
    "zereeg": "zereeg",
    "huue": "huue",
    "huuee": "huue",
    "huee": "huue",
    "huyee": "huue",
    "hue": "huue",
    "хуе": "huue",
    "хуее": "huue",
    "хуеее": "huue",
    "хуеэ": "huue",
    "хуя": "huue"
  };

  for (const [latin, tag] of Object.entries(mapping)) {
    const regex = new RegExp(`^${latin}$`, "i");
    if (regex.test(text)) {
      return tag;
    }
  }

  return text;
}
