import { HeaderFilterType } from "../types";

export const transformHeaderFilters = (headerFilters?: HeaderFilterType[]) => {
  if (Array.isArray(headerFilters)) {
    headerFilters.sort((first, second) => {
      if (first.level > second.level) return 1;
      if (first.level < second.level) return -1;
      return 0;
    });
    const newArray: any[] = [];
    headerFilters.reduce<string[]>((accum, filter, index) => {
      const {
        accessor,
        filterComponentProps,
        columnName,
        filterComponentType,
      } = filter;
      newArray.push({
        filterComponentProps: {
          ...filterComponentProps,
          dependencies: [...accum],
          last: index === headerFilters.length - 1,
          columnName,
          accessor,
          result_type:
            filterComponentType === "groupByFilter"
              ? "getGroups"
              : "daysFilter"
              ? "getRange"
              : "getGroups",
        },
        filterComponentType,
        key: accessor,
      });
      accum.push(filter.accessor);
      return accum;
    }, []);
    return newArray;
  }
};
