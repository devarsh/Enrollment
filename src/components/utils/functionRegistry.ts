const initializeFunctionRegistry = () => {
  const fns = new Map<string, Function>();
  const registerFn = (fnName: string, fn: Function) => {
    if (typeof fn === "function") {
      //commented this code so we can replace function
      // if (fns.has(fnName)) {
      //   return false;
      // }
      fns.set(fnName, fn);
      return true;
    }
    return false;
  };
  const unregisterFn = (fnName: string) => {
    if (fns.has(fnName)) {
      fns.delete(fnName);
    }
  };
  const getFn = (fnName: string, defaultValue: Function | undefined) => {
    if (fns.has(fnName)) {
      return fns.get(fnName);
    }
    return defaultValue;
  };
  return { registerFn, unregisterFn, getFn };
};

export const singletonFunctionRegisrationFactory = initializeFunctionRegistry();
export type singletonFunctionRegisrationFactoryType = ReturnType<
  typeof initializeFunctionRegistry
>;

export const singletonFunctionRegisrationFactoryForTableCells = initializeFunctionRegistry();
