import { createContext, FC } from "react";
import { GridContextType } from "./types";

export const GridContext = createContext<GridContextType | null>(null);

export const GridProvider: FC<GridContextType> = ({
  gridCode,
  getGridData,
  getGridColumnFilterData,
  children,
}) => {
  if (
    typeof getGridData !== "function" ||
    typeof getGridColumnFilterData !== "function"
  ) {
    return <div>Invalid Grid FNS passed</div>;
  }
  return (
    <GridContext.Provider
      value={{ getGridColumnFilterData, getGridData, gridCode }}
    >
      {children}
    </GridContext.Provider>
  );
};
