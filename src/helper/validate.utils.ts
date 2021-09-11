export const isValidDateFormat = (date: string) => {
  const exp =
    /^(?:January|February|March|April|May|June|July|August|September|October|November|December)[-\ ](([0]?[1-9])|([1-2][0-9])|(3[01]))[\,][\ ]\b\d{4}$/gm;
  const regex = new RegExp(exp);
  return regex.test(date);
};
