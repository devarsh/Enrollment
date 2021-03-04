import { GridColumnType } from "../types";

export const attachAlignmentProps = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { alignment, ...others } = column;
      switch (alignment) {
        case "right":
          return { ...others, TableCellProps: { align: "right" } };
        default:
          return others;
      }
    });
  }
  return [];
};
