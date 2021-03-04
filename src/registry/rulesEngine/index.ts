export const greaterThanString = (factValue, jsonValue) => {
  return Number.parseFloat(factValue) > Number.parseFloat(jsonValue);
};

export const greaterThanInclusiveString = (factValue, jsonValue) => {
  return Number.parseFloat(factValue) >= Number.parseFloat(jsonValue);
};

export const lessThanString = (factValue, jsonValue) => {
  return Number.parseFloat(factValue) < Number.parseFloat(jsonValue);
};

export const lessThanInclusiveString = (factValue, jsonValue) => {
  return Number.parseFloat(factValue) <= Number.parseFloat(jsonValue);
};
