export function getGreetAnswer(text) {
  const t = text.toLowerCase();

  const responses = ["hello", "hi", "sain", "§райн", "hey", "snuu"];

  if (responses.includes(t)) {
    const hour = new Date().getHours();
    let greeting;
    if (hour >= 5 && hour < 12) {
      greeting ="„Байн тал Пульше!" ;
    } else if (hour >= 12 && hour < 18) {
      greeting ="‟Байн вулися!";
    } else if (hour >= 18 && hour < 22) {
      greeting ="‟Байн Орастут!" ;
    } else {
      greeting ="‟Байн Котомет!";
    }
    return `${greeting} Tand yuugaar tuslach uu?`;
  }

  return "Сайн уу?";
}
