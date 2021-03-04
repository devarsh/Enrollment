import { GridColumnType } from "../types";
import {
  ValueFilter,
  RangeFilterWrapper,
  OptionsFilter,
} from "../components/filters";

export const attachFilterComponentToMetaData = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const {
        filterComponentType,
        filterComponentProps,
        accessor,
        ...others
      } = column;
      switch (filterComponentType) {
        case "valueFilter":
          return {
            ...others,
            accessor,
            filterComponentProps,
            Filter: ValueFilter,
            filter: "valueFilter",
            id: accessor,
          };
        case "rangeFilter":
          return {
            ...others,
            Filter: RangeFilterWrapper,
            filter: "rangeFilter",
            accessor,
            id: accessor,
            filterComponentProps: {
              ...filterComponentProps,
              query: {
                accessor: accessor,
                result_type: "getRange",
                filter_conditions: [],
              },
            },
          };
        case "optionsFilter":
          return {
            ...others,
            Filter: OptionsFilter,
            //filter:'optionsFilter'
            accessor,
            id: accessor,
            filterComponentProps: {
              ...filterComponentProps,
              query: {
                accessor: accessor,
                result_type: "getGroups",
                filter_conditions: [],
              },
            },
          };
        default:
          return {
            ...others,
            accessor,
            filterComponentProps,
            Filter: ValueFilter,
            filter: "valueFilter",
          };
      }
    });
  }
  return [];
};
