export const getFormattedDate = (date: Date | string | null | undefined) => {
  if (!date) return "";

  // Если передана строка, пытаемся создать объект Date
  if (typeof date === "string") {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "";
    }
    return parsedDate.toLocaleString("ru-RU", {
      year: "2-digit",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Если передан объект Date
  if (date instanceof Date) {
    return date.toLocaleString("ru-RU", {
      year: "2-digit",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return "";
};
