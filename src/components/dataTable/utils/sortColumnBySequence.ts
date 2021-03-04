import { GridColumnType } from "../types";

export const sortColumnsBySequence = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    let result = columns.sort((column1, column2) => {
      if (Number(column1.sequence) < Number(column2.sequence)) return -1;
      if (Number(column2.sequence) > Number(column1.sequence)) return 1;
      return 0;
    });
    return result.map(({ sequence, ...others }) => others);
  }
  return [];
};
