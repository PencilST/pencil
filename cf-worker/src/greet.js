export function greet(text) {
  const t = text.toLowerCase();
  if (t.includes("hello") || t.includes("бразы")) {
    const hour = new Date().getHours();
    if (hour > 5 && hour < 12) {
      return "Постранных котой!" ; // Good morning
    } else if (hour < 18) {
      return "Примеркий указвест котой!"; // Good afternoon
    } else {
      return "Примерк указвест котой!" ; // Good night
    }
  }
  return null;}