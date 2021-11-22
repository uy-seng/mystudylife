import moment from "moment";
import { DayOfWeek, GetClassesQuery } from "../generated/graphql";

export const generateArrayBetween = (start: number, end: number) => {
  return Array.from({ length: end - 1 }, (v, k) => k + start);
};

export const formatDate = (date: Date) => {
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric"
    })
    .split(",")
    .join("");
};

export const isValidDateFormat = (date: string) => {
  const exp =
    // eslint-disable-next-line
    /^(?:January|February|March|April|May|June|July|August|September|October|November|December)[-\ ](([0]?[1-9])|([1-2][0-9])|(3[01]))[\ ]\b\d{4}$/gm;
  const regex = new RegExp(exp);
  return regex.test(date);
};

export const getMonthName = (monthNumber: number) => {
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
    "December"
  ];
  return MONTH[monthNumber - 1];
};

/**
 * reference: https://stackoverflow.com/a/61256158/16448976
 * author: @Oliver Dixon
 * @param array
 * @param callback
 */
export async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

export const formatTime = (time: string | undefined) => {
  return moment(time, "HH:mm:ss").format("h:mm a");
};

export const daysOfWeek: DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

export const getWeekNumberForWeekRotation = (
  academicYearStartDate: Date,
  currentDate: Date
): number | null => {
  let diff = (currentDate.getTime() - academicYearStartDate.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  if (diff >= 0) return Math.round(diff) + 1;
  else return null;
};

export const generateClassByDate = (
  state: GetClassesQuery | undefined,
  currentDate: Date
) => {
  return state?.getClasses.filter((c) => {
    // check for academic year schedule type
    if (c.academicYear?.schedule.type === "fixed") {
      if (c.schedule.type === "oneOff") {
        // one off schedule
        return +new Date(c.schedule.oneOff!.date) === +currentDate;
      } else if (c.schedule.type === "repeat") {
        // repeat schedule
        //! need to check if class have term or not
        // class must be between academic year start date and end date
        // class must be on current date
        return (
          c.schedule!.repeat?.some((r) =>
            r.repeatDays.includes(daysOfWeek[currentDate.getDay()])
          ) &&
          +new Date(c.academicYear!.startDate) <= +currentDate &&
          +currentDate <= +new Date(c.academicYear!.endDate)
        );
      }
    } else if (c.academicYear?.schedule.type === "dayRotation") {
    } else if (c.academicYear?.schedule.type === "weekRotation") {
    }
  });
};

export const mod = (number: number, modulo: number) => {
  return ((number % modulo) + modulo) % modulo;
};

export function mutateItemInArray<T>(
  array: T[],
  mutateIndex: number,
  newData: T
) {
  const newArray = array.filter((_, i) => i !== mutateIndex);
  newArray.splice(mutateIndex, 0, newData);
  return newArray;
}
