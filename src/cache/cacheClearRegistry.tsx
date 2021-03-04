import { useRef, createContext, useCallback } from "react";

interface RemoveCacheRegisterType {
  addEntry: any;
  removeEntry: any;
  getEntries: any;
}

export const ClearCacheContext = createContext<RemoveCacheRegisterType | null>(
  null
);

export const ClearCacheProvider = ({ children }) => {
  const entiresCache = useRef<any[]>([]);

  const addEntry = useCallback((value: any[]) => {
    let foundIndex = entiresCache.current.findIndex(
      (one) => one === JSON.stringify(value)
    );
    if (foundIndex < 0) {
      entiresCache.current.push(JSON.stringify(value));
    }
  }, []);
  const removeEntry = useCallback((value: any[]) => {
    let foundIndex = entiresCache.current.findIndex(
      (one) => one === JSON.stringify(value)
    );
    if (foundIndex >= 0) {
      const prev = entiresCache.current.slice(0, foundIndex);
      const next = entiresCache.current.slice(foundIndex + 1);
      entiresCache.current = [...prev, ...next];
    }
  }, []);
  const getEntries = useCallback(() => {
    return entiresCache.current.map((one) => JSON.parse(one));
  }, []);
  return (
    <ClearCacheContext.Provider
      value={
        {
          addEntry,
          removeEntry,
          getEntries,
        } as RemoveCacheRegisterType
      }
    >
      {children}
    </ClearCacheContext.Provider>
  );
};
