import { GridColumnType } from "../types";

export const extractHiddenColumns = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.reduce<string[]>((accumulator, column) => {
      if (column.isVisible === false) {
        accumulator.push(column.accessor);
      }
      return accumulator;
    }, []);
  }
  return [];
};
