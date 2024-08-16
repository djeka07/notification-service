import { toLower } from './string';

export const arrayToObject = <T>(
  array: T[],
  keyField: string = null,
  makeKeyLowerCase = false,
): { [key: string]: T } => {
  if (!array) return {};

  return array.reduce((obj, item) => {
    const isObject = typeof item === 'object';
    const key = isObject
      ? makeKeyLowerCase
        ? toLower(item[keyField])
        : item[keyField]
      : item;
    if (!key) return obj;
    obj[key] = isObject ? item : {}; // eslint-disable-line no-param-reassign
    return obj;
  }, {});
};

export const isEmpty = (obj: unknown): boolean =>
  !obj || Object.keys(obj).length === 0;
