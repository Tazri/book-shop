export async function base64Converter(file) {
  try {
    const data = await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.readAsDataURL(file);
    });

    return data;
  } catch (err) {
    return err;
  }
}

export function objectToArryOfKeyValue(obj) {
  return Object.entries(obj).map(([key, value]) => ({
    key,
    value,
  }));
}

export function arrayOfKeyValueToObject(arrayOfKeyValue) {
  /**
   * [
   *  {key : a,value :3},
   * {key : b,value :3}
   * ]
   * convert to :
   * {
   *   a : 3,
   *   b : 3
   * }
   */
  return arrayOfKeyValue.reduce((obj, item) => {
    obj[item.key] = item.value;
    return obj;
  }, {});
}
