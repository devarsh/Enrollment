import { useCallback, useRef } from "react";

export const formatSortBy = (sortBy = []) => {
  const formatted = sortBy.map((one: any, index) => ({
    [one?.id ?? ""]: one?.desc ? "desc" : "asc",
    seq: index + 1,
  }));
  return formatted;
};

export const formatFilterBy = (filterBy = []) => {
  const formatted = filterBy.map((one: any, index) => ({
    accessor: one.id,
    ...one.value,
  }));
  return formatted;
};

export const useLocalFilterState = () => {
  const filterState = useRef<object>({});
  const addFilterState = useCallback((accessor, state) => {
    let currentState;
    currentState = { [accessor]: state };

    if (filterState.current === null) {
      filterState.current = currentState;
    } else {
      filterState.current = {
        ...filterState.current,
        ...currentState,
      };
    }
  }, []);
  const getFilterState = useCallback((accessor) => {
    if (typeof filterState.current === "object") {
      return filterState.current[accessor];
    }
    return;
  }, []);
  const removeFilterState = useCallback((accessor) => {
    if (typeof filterState.current === "object") {
      delete filterState.current[accessor];
    }
  }, []);
  const clearFilterState = useCallback(() => {
    filterState.current = {};
  }, []);

  return {
    addFilterState,
    removeFilterState,
    clearFilterState,
    getFilterState,
  };
};
