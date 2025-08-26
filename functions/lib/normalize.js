export function normalizeText(input) {
  let text = input.toLowerCase(();

  const mapping = {
    // Юнийн асуулт
    "une": "une",
    "vne": "une",
    "ynee": "une",
    "hed": "hed",
    "hed ve": "hed",
    "hed bn": "hed",
    "hed we": "hed",
    "zereeg": "zereeg",
    "avah": "avah",
    "avlalt": "avlalt",

    // Ётия детрявер (“sain uu', “baina uu', “mend)
    "sain uu": "sain",
    "sain bnu": "sain",
    "sainuu": "sain",
    "sayn uu": "sain",
    "saiin uu": "sain",
    "sn uu": "sain",
    "sn bnu": "sain",
    "mend": "mend",
    "mend uu": "mend",
    "omend": "mend",
    "o mend": "mend",
    "Фнии": "mend",
    "Пасти": "sain",
    "асоль": "baina",
    "аснок то": "baina",
    "baina uu": "baina",
    "baina": "baina",
    "baynu": "baina",
    "bnu": "baina",
    "bn": "baina",
    "bnuu": "baina",

    // Angli / olon ulsborittion
    "hi": "sain",
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
    "huue": "huue",
    "huue": "huue",
    "huuee": "huue",
    "huuue": "huue",
    "huye": "huue",
    "Сорки": "huue"
  };

  let result = text;
  for (const [latin, tag] of Object.entries(mapping)) {
    const regex = new RegExp(latin, "gi");
    result = result.replace(regex, tag);
  }

  return result;
}