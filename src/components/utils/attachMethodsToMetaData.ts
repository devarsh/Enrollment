import { ruleEngine } from "components/utils";
import { setIn } from "packages/form";
import { singletonFunctionRegisrationFactoryType } from "components/utils";

export type AttachMethodArrayType = [RegExp, Function?];

type path = string;
type registeredFnName = string;
type defaultFn = Function;

export type AccumulatorType = [
  path,
  registeredFnName,
  string | number,
  defaultFn?
];

const defaultBooleanFunction = (value) => () => value;

const patternMatch = (patters: AttachMethodArrayType[], value: string) => {
  for (const currentPattern of patters) {
    if (currentPattern[0] instanceof RegExp) {
      if (currentPattern[0].test(value)) {
        return { found: true, defaultFn: currentPattern[1] };
      }
    }
  }
  return { found: false, defaultFn: undefined };
};

const JSONWalkerFinalPath = (
  currentObj: any,
  interestedValues: AttachMethodArrayType[],
  accumulator: AccumulatorType[],
  currentPath: string = "",
  lastKey: string | number = ""
) => {
  let result = patternMatch(interestedValues, currentPath);
  if (result.found) {
    //attach a function that returns boolean
    if (currentObj === "true")
      accumulator.push([
        currentPath,
        "BOOLEAN_FUNCTION_TO_ATTACH_FOR_BOOLEAN_VALUES",
        lastKey,
        defaultBooleanFunction(true),
      ]);
    else if (currentObj === "false") {
      accumulator.push([
        currentPath,
        "BOOLEAN_FUNCTION_TO_ATTACH_FOR_BOOLEAN_VALUES",
        lastKey,
        defaultBooleanFunction(false),
      ]);
    } else if (typeof currentObj === "boolean") {
      accumulator.push([
        currentPath,
        "BOOLEAN_FUNCTION_TO_ATTACH_FOR_BOOLEAN_VALUES",
        lastKey,
        defaultBooleanFunction(currentObj),
      ]);
    } else if (typeof currentObj === "object") {
      accumulator.push([
        currentPath,
        "RULES_ENGINE_FUNCTION_TO_ATTACH_AS_DEFAULT_FN",
        lastKey,
        ruleEngine(currentObj),
      ]);
    } else if (typeof currentObj === "string") {
      if (typeof result.defaultFn === "function") {
        let retVal = result.defaultFn(currentPath);
        if (typeof retVal === "function") {
          accumulator.push([currentPath, currentObj, lastKey, retVal]);
        } else {
          accumulator.push([currentPath, currentObj, lastKey, undefined]);
        }
      } else {
        accumulator.push([currentPath, currentObj, lastKey, undefined]);
      }
    }
  }
};

const JSONWalker = (
  currentObj: any,
  interestedValues: AttachMethodArrayType[],
  accumulator: AccumulatorType[],
  skipWalkingForKeys: string[],
  currentPath: string = "",
  lastKey: string | number = ""
) => {
  if (typeof currentObj === "object" && currentObj !== null) {
    if (skipWalkingForKeys.indexOf(lastKey as string) > -1) {
      JSONWalkerFinalPath(
        currentObj,
        interestedValues,
        accumulator,
        currentPath,
        lastKey
      );
    } else {
      for (const [key, val] of Object.entries(currentObj)) {
        const path = Boolean(currentPath) ? `${currentPath}.${key}` : `${key}`;
        JSONWalker(
          val,
          interestedValues,
          accumulator,
          skipWalkingForKeys,
          path,
          key
        );
      }
    }
  } else if (Array.isArray(currentObj)) {
    currentObj.forEach((value, index) => {
      const path = Boolean(currentPath)
        ? `${currentPath}.${index}`
        : `${index}`;
      JSONWalker(
        value,
        interestedValues,
        accumulator,
        skipWalkingForKeys,
        path,
        index
      );
    });
  } else {
    JSONWalkerFinalPath(
      currentObj,
      interestedValues,
      accumulator,
      currentPath,
      lastKey
    );
  }
};

//we will attach default function for each field Key type if we cannot the required function
//array index
//0-the path to set function at
//1-the strign value that will be used as key to find mapped function from functions registry
//2-is the key name
//3-default function for that key - it can be undefined it its not declared
export const attachMethodsToMetaData = (
  metaData: any,
  registrationFnInstance: singletonFunctionRegisrationFactoryType,
  interestedFields: AttachMethodArrayType[],
  skipWalkingForKeys: string[] = []
) => {
  const accumKeys: AccumulatorType[] = [];
  JSONWalker(metaData, interestedFields, accumKeys, skipWalkingForKeys);
  let newMetaData = { ...metaData };
  for (const one of accumKeys) {
    const retVal = registrationFnInstance.getFn(one[1], one[3]);
    newMetaData = setIn(newMetaData, one[0], retVal);
    //to get options registered function name to be used in react-query for caching options
    if (one[2] === "options") {
      const pathSplit = one[0].split(".");
      const prev = pathSplit.slice(0, pathSplit.length - 1);
      const newPath = [...prev, "_optionsKey"].join(".");
      newMetaData = setIn(newMetaData, newPath, one[1]);
    }
  }
  return newMetaData;
};
