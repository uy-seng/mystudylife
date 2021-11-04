import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "./auth.utils";
import { dateTransformer, timeTransformer } from "./date.utils";
import { isValidDateFormat } from "./validate.utils";

/**
 * reference: https://stackoverflow.com/a/61256158/16448976
 * author: @Oliver Dixon
 * @param array
 * @param callback
 */
async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

export {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  dateTransformer,
  timeTransformer,
  isValidDateFormat,
  asyncForEach,
};
