import { normalize } from "./normalize.js";

// FAQ data (хуучны 10 random FAQ хариулт)
const faqData = {
  "faq": [
    "… энд хуучин FAQ хариултууд байна …"
  ]
};

// Clip асуултын хариултууд
const clipAnswers = [
  "Тийм ээ, clip хийдэг… гэхдээ танай хөршийн муурыг хүртэл од болгоно 😸.",
  "Clip хийж өгнө, харин та од болохдоо бэлэн үү? 🌟",
  "Clip хийж өгнө, харин blooper reel дагаад ирнэ шүү 🤭.",
  "Тийм ээ, бид clip хийдэг… бас давхар дуулж бүжиглэхийг тань бичээд өгвөл ямар вэ? 🎤🕺",
  "Clip production хийдэг, бонус нь бага зэрэг хошигнол дагалдана 😂.",
  "Манай баг clip хийдэг. Дараа нь лайк дарж өгнө 😉.",
  "Тийм ээ, clip хийдэг… заримдаа киноны трейлер шиг сүртэй гарна 🎬.",
  "Clip хийж өгнө, гэхдээ таныг viral star болгоно гэж амлаж чадахгүй 🤷‍♂️.",
  "Clip хийдэг, гэхдээ таныг инээдмийн шоунд тоглосон мэт хөгжилтэй болгож чадна 😅.",
  "Тийм ээ, clip хийдэг… таны хоол идэж буй бичлэгийг чинь хүртэл од болгоно ✨."
];

export function faq(text) {
  const t = normalize(text);

  // Clip keyword шалгах
  if (t.includes("clip") || t.includes("клип")) {
    const randomIndex = Math.floor(Math.random() * clipAnswers.length);
    return clipAnswers[randomIndex];
  }

  // FAQ keyword шалгах (хуучны)
  if (t.includes("faq")) {
    const answers = faqData["faq"];
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
  }

  // Таарахгүй бол null буцаана
  return null;
}
