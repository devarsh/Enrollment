import { atomFamily, selectorFamily } from "recoil";
export interface QueryType {
  accessor: string;
  condition: string;
  value: any[] | any;
}

export interface SubscriptionType {
  [key: string]: string[] | string | undefined;
}

export const filterAtom = atomFamily<QueryType | null, string>({
  key: "filterAtom",
  default: null,
});

export const filtersAtom = atomFamily<QueryType[] | null, string>({
  key: "filtersAtom",
  default: null,
});

export const subscribeToFilterChange = selectorFamily<
  QueryType[],
  SubscriptionType
>({
  key: "filterSubscriber",
  get: (subscriptionFilters) => ({ get }) => {
    if (typeof subscriptionFilters !== "object") {
      return [];
    }
    let accessors = subscriptionFilters.accessors;
    if (accessors === undefined) {
      accessors = [];
    }
    if (typeof accessors === "string") {
      accessors = [accessors];
    }
    let result: QueryType[] = [];
    for (let accessor of accessors as string[]) {
      let filterCondition = get(
        filterAtom(`${subscriptionFilters.gridCode as string}/${accessor}`)
      );
      if (typeof filterCondition === "object" && filterCondition !== null) {
        result.push(filterCondition);
      }
    }
    return result;
  },
});
