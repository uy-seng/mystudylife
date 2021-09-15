const generateArrayBetween = (start: number, end: number) => {
  return Array.from({ length: end - 1 }, (v, k) => k + start);
};

const formatDate = (date: Date) => {
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    .split(",")
    .join("");
};

const isValidDateFormat = (date: string) => {
  const exp =
    /^(?:January|February|March|April|May|June|July|August|September|October|November|December)[-\ ](([0]?[1-9])|([1-2][0-9])|(3[01]))[\ ]\b\d{4}$/gm;
  const regex = new RegExp(exp);
  return regex.test(date);
};

const getMonthName = (monthNumber: number) => {
  const MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return MONTH[monthNumber - 1];
};

export { generateArrayBetween, formatDate, isValidDateFormat, getMonthName };
