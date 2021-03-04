export const cacheWrapperKeyGen = (values) => {
  if (Array.isArray(values) && values.length > 0) {
    return values.sort().join("-");
  }
  return `${Math.random() * 100000}`;
};
