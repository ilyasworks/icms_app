export const noFormatter = (number: number) => {
  if (number) {
    return number.toLocaleString();
  }
};
export const dateFormatter = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const dateTimeFormatter = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};