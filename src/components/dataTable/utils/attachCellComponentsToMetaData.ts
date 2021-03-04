import { GridColumnType } from "../types";
import { singletonFunctionRegisrationFactoryForTableCells } from "components/utils";
import { DefaultRowCellRenderer } from "components/tableCellComponents/defaultRowCellRenderer";

export const attachCellComponentsToMetaData = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { componentType, ...others } = column;
      let Component = singletonFunctionRegisrationFactoryForTableCells.getFn(
        componentType,
        DefaultRowCellRenderer
      );
      return {
        ...others,
        Cell: Component,
      };
    });
  }
  return [];
};
