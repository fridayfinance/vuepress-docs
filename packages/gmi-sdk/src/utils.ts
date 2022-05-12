export const objDeepLoop = (
  data: any,
  keyFun = (key: string | number, value: any) => key,
  valueFun = (value: any, key: string | number) => value
) => {
  return Object.entries(data || {}).reduce(
    (data, [key, value]) => {
      if ((value && value.constructor === Object) || Array.isArray(value)) {
        value = objDeepLoop(value, keyFun, valueFun);
      }

      data[keyFun(key, value)] = valueFun(value, key);

      return data;
    },
    data && data.constructor === Object ? {} : []
  );
};

export const stringToCamelCase = (str: string): string => {
  return str.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace("_", "")
  );
};

export const stringToSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter: any) => `_${letter.toLowerCase()}`);
};
