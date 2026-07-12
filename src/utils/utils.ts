export const days = Array.from({ length: 31 }, (_, i) => i + 1);
export const today = new Date().getDate(); // текущее число месяца

// получаем текущий месяц уже в строковом виде, чтобы отображать его в интерфейсе
export const currentMonthName = new Date().toLocaleString("ru-RU", {
  month: "long",
});

export const currentWeekday = new Date().toLocaleString("ru-RU", {
  weekday: "short",
});

const colors = [
  "#A40E4C",
  "#FFCB77",
  "#FE6D73",
  "#17C3B2",
  "#48E5C2",
  "#00CC99",
  "#DB5ABA",
  "#F6AA1C",
  "#DAFF7D",
  "#CF4D6F",
  "#87BFFF",
  "#2667FF",
  "#FF4A1C",
  "#ff8c00",
  "#F2542D",
  "#E9724C",
  "#5EEB5B",
  "#D90368",
  "#FFD400",
  "#FB3640",
];

export const randomBackgroundRGBColor = () =>
  colors[Math.floor(Math.random() * colors.length)];
