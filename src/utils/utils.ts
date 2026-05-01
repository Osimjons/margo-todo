export const days = Array.from({ length: 31 }, (_, i) => i + 1);
export const today = new Date().getDate(); // текущее число месяца

// получаем текущий месяц уже в строковом виде, чтобы отображать его в интерфейсе
export const currentMonthName = new Date().toLocaleString("ru-RU", {
  month: "long",
});
