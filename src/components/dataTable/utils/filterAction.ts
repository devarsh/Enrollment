export const filterAction = (
  actions: any,
  selectedFlatRows: any,
  singleAction?: boolean
) => {
  if (!Array.isArray(actions) && Boolean(actions)) {
    actions = [actions];
  }

  if (actions.length <= 0 || selectedFlatRows.length <= 0) {
    if (singleAction === true) {
      return actions[0];
    }
    return actions;
  }
  let result = actions.filter((one) => {
    if (typeof one?.shouldExclude === "function") {
      if (
        one.shouldExclude(
          selectedFlatRows.map((one) => ({ id: one.id, data: one.original }))
        ) === true
      ) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  });
  if (singleAction === true) {
    return result[0];
  }
  return result;
};
