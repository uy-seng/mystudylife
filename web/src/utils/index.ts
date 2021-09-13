const generateArrayBetween = (start: number, end: number) => {
  return Array.from({ length: end - 1 }, (v, k) => k + start);
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

export { generateArrayBetween, formatDate };
