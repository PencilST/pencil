export function normalize(text) {
  if (!text) return "";

  let t = text.toLowerCase().trim();

  // 🔑 Текст хувиргах dictionary
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

    // --- Хараал variations (Пизда) ---
    "pizda": "пизда",
    "pisda": "пизда",
    "p1zda": "пизда",
    "pzd": "пизда",
    "pzda": "пизда",
    "sda": "пизда",
    "сда": "пизда",
    "сдаа": "пизда",
    "сдааa": "пизда",
    "пизда": "пизда",
    "писда": "пизда",
    "пезда": "пизда",
    "пызда": "пизда",

    // --- Хараал (Лалар) ---
    "лалар": "лалар",
    "лалрууд": "лалар",
    "лаларууд": "лалар",
    "lalariin": "лалар",
    "lalar": "лалар",
    "lallr": "лалар",
    "llr": "лалар",

    // --- Хараал (Новш) ---
    "новш": "новш",
    "novsh": "новш",
    "novshoo": "новш",
    "novshuud": "новш",

    // --- Хараал (Мал / амьтан) ---
    "мал": "мал",
    "үхэр": "үхэр",
    "uheR": "үхэр",
    "uher": "үхэр",
    "гахай": "гахай",
    "gaxai": "гахай",
    "хонь": "хонь",
    "hon": "хонь",
    "гөлөг": "гөлөг",
    "gulug": "гөлөг",
    "adguus": "адгуус",
    "адгуус": "адгуус",

    // --- Хараал (Муу, доромжлол) ---
    "мудак": "мудак",
    "muudak": "мудак",
    "муу новш": "новш",
    "муу пизда": "пизда",
    "муу гөлөг": "гөлөг",

    // --- Бусад Монгол хараал ---
    "чөтгөр": "чөтгөр",
    "chotgor": "чөтгөр",
    "үхээрийн": "үхээрийн",
    "uheeriin": "үхээрийн",
    "алаад өгье": "алаад өгье",
    "uhlee uz": "үхлээ үз",
    "шаасан": "шаасан",
    "шаа": "шаа",
    "shaa": "шаа",
    "shees": "шээс",
    "baas": "баас",
    "шээс": "шээс",
    "баас": "баас",
    "хулгайч": "хулгайч",
    "hulgaich": "хулгайч",
    "шантаажчин": "шантаажчин",
    "shantajchin": "шантаажчин",

    // --- Англи хараал F-word ---
    "fuck": "fuck",
    "f*ck": "fuck",
    "f**k": "fuck",
    "f***": "fuck",
    "fucking": "fuck",
    "fuckin": "fuck",
    "fukin": "fuck",
    "fkn": "fuck",
    "fk": "fuck",
    "fock": "fuck",
    "fucc": "fuck",
    "phuck": "fuck",
    "fuck you": "fuck",

    // --- Англи хараал S-word ---
    "shit": "shit",
    "sh*t": "shit",
    "sh1t": "shit",
    "shet": "shit",
    "shyt": "shit",
    "bullshit": "shit",
    "bull sh*t": "shit",
    "bullsh1t": "shit",
    "bs": "shit",

    // --- Англи хараал B-word ---
    "bitch": "bitch",
    "bi*ch": "bitch",
    "b1tch": "bitch",
    "btch": "bitch",
    "bich": "bitch",
    "beech": "bitch",
    "bishes": "bitch",

    // --- Англи хараал C-word ---
    "cunt": "cunt",
    "cnt": "cunt",
    "kant": "cunt",
    "kunt": "cunt",
    "knt": "cunt",

    // --- Англи хараал бусад ---
    "asshole": "asshole",
    "a**hole": "asshole",
    "azzhole": "asshole",
    "ashol": "asshole",
    "bastard": "bastard",
    "ba5tard": "bastard",
    "bstrd": "bastard",
    "motherfucker": "motherfucker",
    "mothafucka": "motherfucker",
    "mthrfkr": "motherfucker",
    "mf": "motherfucker",
    "mofo": "motherfucker",
    "wtf": "wtf",
    "w t f": "wtf",
    "dafuq": "wtf",
    "da fuq": "wtf",
    "damn": "damn",
    "dam": "damn",
    "damnn": "damn",
    "daymn": "damn",
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

  // unwanted тэмдэгтүүдийг цэвэрлэх
  t = t.replace(/[^а-яөөүa-z0-9\\s]/gi, "");

  return t;
}
