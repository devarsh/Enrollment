import { useContext, useRef, useEffect, useCallback } from "react";
import {
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
  useRecoilCallback,
} from "recoil";
import {
  formAtom,
  formFieldAtom,
  formFieldRegistryAtom,
  formFieldRegisterSelector,
  formFieldUnregisterSelector,
  subscribeToFormFieldsSelector,
  formFieldExcludeAddSelector,
  formFieldExcludeRemoveSelector,
  formFieldsErrorWatcherAddSelector,
  formFieldsErrorWatcherRemoveSelector,
} from "./atoms";
import {
  FormFieldAtomType,
  FormFieldRegistryAtomType,
  UseFieldHookProps,
  FormFieldRegisterSelectorAttributes,
  InitialValuesType,
  PostValidationSetCrossFieldValuesFnType,
  ValidateFnType,
  SchemaValidateFnType,
  DependentValuesType,
} from "./types";
import { FormContext } from "./context";
import { getIn, yupReachAndValidate } from "./util";

export const useField = ({
  fieldKey,
  name,
  dependentFields,
  validate,
  validationRun,
  shouldExclude,
  isReadOnly,
  postValidationSetCrossFieldValues,
  runPostValidationHookAlways,
  runValidationOnDependentFieldsChange,
}: UseFieldHookProps) => {
  //formContext provides formName for scoping of fields, and initialValue for the field
  const formContext = useContext(FormContext);
  //formState provides will be used to determine if form is submitting
  const formState = useRecoilValue(formAtom(formContext.formName));
  //fieldKeyRef used to inititalize fieldKey, if fieldKey is not passed
  //fieldName will be used to determine fieldKey, fieldKey will be used to
  //access atom from recoil storing field state
  const fieldKeyRef = useRef(
    Boolean(fieldKey)
      ? `${formContext.formName}/${fieldKey}`
      : `${formContext.formName}/${name}`
  );
  //dependent fields change transform for array values

  const dependentFieldsRef = useRef<string | string[] | undefined>(
    "DO_NOT_CHANGE_THIS_VALUE_I_WILL_FIRE_YOU"
  );
  if (
    dependentFieldsRef.current === "DO_NOT_CHANGE_THIS_VALUE_I_WILL_FIRE_YOU"
  ) {
    //@ts-ignore
    dependentFieldsRef.current = transformDependentFields(
      fieldKey,
      dependentFields
    );
  }
  //fieldData atom stores current field state
  const [fieldData, setFieldData] = useRecoilState<FormFieldAtomType>(
    formFieldAtom(fieldKeyRef.current)
  );

  //This effect will update fieldName, in case of arrayField, when fields array index postion
  //updates. ie. arrayFieldName[current-index].fieldName - here currentIndex represents
  //fields current postion in the arrayField
  useEffect(() => {
    if (name.indexOf(`${formContext.formName}/`) === 0) {
      setFieldData((currVal) => ({
        ...currVal,
        name: name,
      }));
    } else {
      //remove else if any issue comes up in form - we are putting it here to fix array field issue
      setFieldData((currVal) => ({
        ...currVal,
        name: `${formContext.formName}/${name}`,
      }));
    }
  }, [name, setFieldData, formContext.formName]);

  //fieldDataRef will store current reference of fieldState and will provide latest value to
  //onChange and onBlur handlers when the memozied version of handlers are passed as props
  //shaving off rerenders.
  const fieldDataRef = useRef<FormFieldAtomType>(fieldData);
  fieldDataRef.current = fieldData;

  //registerField function registers the currentField to the fields registry if not registered,
  //and keeping track of all the active fields in the form
  const registerField = useSetRecoilState(
    formFieldRegisterSelector(formContext.formName)
  );
  //unregisterField function unregistered the currentField from the fields registry
  const unregisterField = useSetRecoilState(
    formFieldUnregisterSelector(formContext.formName)
  );

  //This effect will register and unregister fields when they mount and unmount
  //set initial value of the field, if initial value is provided.
  //If an option is set not resetField on unmount unregister will not be called.

  //Cannot add postValidationSetCrossFieldValues and handleBlur so have to disable esliting*/
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const currentfield = fieldKeyRef.current;
    //Since our keys are prepended with formName, remove the formName and get the filedValue from
    //initialValues object

    //here we are getting default Value for arrayFields since they will be in object and applicalbe for each new added fielc
    //cannot be satisfied with initial values so defaultArrayFieldValue is used and it will be only set if there is no
    //initialValue avaible for this field
    const defaultValueForArrayField =
      typeof formContext.defaultArrayFieldValues === "object"
        ? getIn(
            formContext.defaultArrayFieldValues,
            currentfield
              .replace(`${formContext.formName}/`, "")
              .replace(/\[\d\]/g, ""),
            null
          )
        : null;

    let defaultValue: any = null;
    const value =
      typeof formContext.initialValues === "object"
        ? getIn(
            formContext.initialValues,
            currentfield.replace(`${formContext.formName}/`, ""),
            null
          )
        : null;
    if (Boolean(value)) {
      defaultValue = { value: value };
    } else if (Boolean(defaultValueForArrayField)) {
      defaultValue = { value: defaultValueForArrayField };
    }

    const registrationValue: FormFieldRegisterSelectorAttributes = {
      defaultValue: defaultValue,
      fieldName: currentfield,
    };
    registerField(registrationValue);

    if (Boolean(formContext.resetFieldOnUnmount) === true) {
      return () => {
        unregisterField(currentfield);
      };
    }
  }, [setFieldData, registerField, unregisterField, formContext]);

  //This hook with register validation method on field instance

  const isValidationFnRef = useRef(
    typeof validate === "function" ? true : false
  );

  //eslint is disabled since validate frequently changes and is not in our control
  //always enable and check  if we are not excluding any other field
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const extractedFieldName = fieldData.name.replace(
      `${formContext.formName}/`,
      ""
    );
    const wrappedValidation = wrapValidationMethod(
      yupReachAndValidate(formContext.validationSchema, extractedFieldName),
      validate,
      postValidationSetCrossFieldValues,
      runPostValidationHookAlways
    );
    if (typeof wrappedValidation === "function") {
      isValidationFnRef.current = true;
      setFieldData((currVal) => ({
        ...currVal,
        validate: wrappedValidation,
        dependentFields: dependentFieldsRef.current,
      }));
    } else {
      setFieldData((currVal) => ({
        ...currVal,
        dependentFields: dependentFieldsRef.current,
      }));
    }
  }, [
    setFieldData,
    formContext.formName,
    formContext.validationSchema,
    fieldData.name,
  ]);

  //Subscribe to cross fields values, provide an array of dependent field names,
  //this field will be rerendered when any of the provided dependent field's value updates.

  const addRemoveExcludedFields = useRecoilCallback(
    ({ set }) => ({ fieldName, flag }) => {
      if (flag === "add") {
        set(formFieldExcludeAddSelector(formContext.formName), fieldName);
      } else if (flag === "remove") {
        set(formFieldExcludeRemoveSelector(formContext.formName), fieldName);
      }
    },
    [formContext.formName]
  );
  const addRemoveFieldsFromErrorWatcher = useRecoilCallback(
    ({ set }) => ({ fieldName, flag }) => {
      if (flag === "add") {
        set(formFieldsErrorWatcherAddSelector(formContext.formName), fieldName);
      } else if (flag === "remove") {
        set(
          formFieldsErrorWatcherRemoveSelector(formContext.formName),
          fieldName
        );
      }
    }
  );

  const dependentFieldsState = useRecoilValue(
    subscribeToFormFieldsSelector({
      formName: formContext.formName,
      fields: dependentFieldsRef.current,
    })
  );
  const dependentFieldsStateRef = useRef(dependentFieldsState);
  dependentFieldsStateRef.current = dependentFieldsState;
  useEffect(() => {
    if (runValidationOnDependentFieldsChange === true) {
      handleValidation(fieldData, dependentFieldsState, true);
    }
  }, [dependentFieldsState]);

  // this determine if the field should be excluded
  const lastShouldExcludePromise = useRef<Promise<any> | null>(null);
  const lastIsReadOnlyPromise = useRef<Promise<any> | null>(null);
  useEffect(() => {
    if (typeof shouldExclude === "function") {
      const currentShouldExcludePromise = Promise.resolve(
        shouldExclude(
          fieldData,
          transformDependentFieldsState(dependentFieldsState),
          formContext.formState
        )
      );
      lastShouldExcludePromise.current = currentShouldExcludePromise;
      currentShouldExcludePromise.then((result) => {
        if (currentShouldExcludePromise === lastShouldExcludePromise.current) {
          if (result === true && fieldData.excluded === false) {
            setFieldData((old) => ({
              ...old,
              excluded: true,
            }));
            addRemoveExcludedFields({ fieldName: fieldData.name, flag: "add" });
          } else if (result === false && fieldData.excluded === true) {
            setFieldData((old) => ({
              ...old,
              excluded: false,
            }));
            addRemoveExcludedFields({
              fieldName: fieldData.name,
              flag: "remove",
            });
          }
        }
      });
    }
    if (typeof isReadOnly === "function") {
      const currentIsReadOnlyPromise = Promise.resolve(
        isReadOnly(
          fieldData,
          transformDependentFieldsState(dependentFieldsState),
          formContext.formState
        )
      );
      lastIsReadOnlyPromise.current = currentIsReadOnlyPromise;
      currentIsReadOnlyPromise.then((result) => {
        if (currentIsReadOnlyPromise === lastIsReadOnlyPromise.current) {
          if (result === true && fieldData.readOnly === false) {
            setFieldData((old) => ({
              ...old,
              readOnly: true,
            }));
          } else if (result === false && fieldData.readOnly === true) {
            setFieldData((old) => ({
              ...old,
              readOnly: true,
            }));
          }
        }
      });
    }
    if (Boolean(fieldData.error)) {
      addRemoveFieldsFromErrorWatcher({
        fieldName: fieldData.name,
        flag: "add",
      });
    } else {
      addRemoveFieldsFromErrorWatcher({
        fieldName: fieldData.name,
        flag: "remove",
      });
    }
  });
  const passCrossFieldMessage = useRecoilCallback(
    ({ snapshot, set }) => (fieldsObj: InitialValuesType) => {
      const key = getFieldKeyForArray(fieldKey);
      const fieldsLoadable = snapshot.getLoadable(
        formFieldRegistryAtom(formContext.formName)
      );
      let fields: FormFieldRegistryAtomType = [];
      if (fieldsLoadable.state === "hasValue") {
        fields = fieldsLoadable.contents;
      }
      for (const field of Object.entries(fieldsObj)) {
        if (fields.indexOf(`${formContext.formName}/${key}${field[0]}`) >= 0) {
          set(
            formFieldAtom(`${formContext.formName}/${key}${field[0]}`),
            (old) => ({
              ...old,
              incomingMessage: { ...old.incomingMessage, ...field[1] },
            })
          );
        }
      }
    },
    [formContext.formName]
  );

  /**
   * Start of field Validation Logic
   * It will always run the validation against the latest value and if promise provides cancelFn
   * it will call cancel function and cancel the query
   */
  const whenToRunValidation = useRef(
    Boolean(validationRun)
      ? validationRun
      : Boolean(formContext.validationRun)
      ? formContext.validationRun
      : "all"
  );

  const lastValidationPromise = useRef<Promise<any> | null>(null);
  const lastValidationValue = useRef<any | null>(null);

  const handleValidation = useCallback(
    (
      data: FormFieldAtomType,
      dependentFieldsState: DependentValuesType,
      alwaysRun?: boolean,
      touchAndValidate?: boolean
    ) => {
      if (typeof fieldDataRef.current.validate !== "function") {
        return;
      }
      if (lastValidationValue.current === data.value && !!alwaysRun === false) {
        return;
      }
      setFieldData((old) => ({
        ...old,
        validationRunning: true,
      }));
      const currentPromise = Promise.resolve(
        fieldDataRef.current.validate(
          data,
          transformDependentFieldsState(dependentFieldsState),
          formContext.formState
        )
      );
      //@ts-ignore
      lastValidationValue.current = data.value;
      lastValidationPromise.current = currentPromise;
      currentPromise
        .then((result) => {
          if (lastValidationPromise.current === currentPromise) {
            const { error, crossFieldMessages, apiResult } = result;
            let finalResult;
            if (
              typeof error === "string" ||
              error === undefined ||
              error === null
            ) {
              finalResult = error;
            } else {
              finalResult = "unkown error check console";
              console.log("unknown error type", error);
            }
            if (!Boolean(touchAndValidate)) {
              setFieldData((old) => {
                return {
                  ...old,
                  validationRunning: false,
                  error: finalResult,
                  validationAPIResult: apiResult,
                };
              });
            } else {
              setFieldData((old) => {
                return {
                  ...old,
                  validationRunning: false,
                  touched: true,
                  error: finalResult,
                  validationAPIResult: apiResult,
                };
              });
            }
            if (typeof crossFieldMessages === "object") {
              passCrossFieldMessage(crossFieldMessages);
            }
          }
        })
        .catch((err) => {
          if (lastValidationPromise.current === currentPromise) {
            let finalResult;
            if (err instanceof Error) {
              finalResult = err.message;
            } else {
              finalResult = "unkown error type check console";
              console.log("unknown error type", err);
            }
            if (!Boolean(touchAndValidate)) {
              setFieldData((old) => {
                return {
                  ...old,
                  validationRunning: false,
                  error: finalResult,
                  validationAPIResult: err,
                };
              });
            } else {
              setFieldData((old) => {
                return {
                  ...old,
                  validationRunning: false,
                  touched: true,
                  error: finalResult,
                  validationAPIResult: err,
                };
              });
            }
          }
        });
    },
    [setFieldData, passCrossFieldMessage]
  );
  /**
   * End of validation Logic
   */
  // //Run validation when dependent field changes
  // useEffect(()=> {

  // },[dependentFieldsState])

  const setTouched = useCallback(() => {
    setFieldData((currVal) => {
      if (currVal.touched) {
        return currVal;
      } else {
        return {
          ...currVal,
          touched: true,
        };
      }
    });
  }, [setFieldData]);

  const setIncomingMessage = useCallback(
    (value) => {
      setFieldData((currVal) => {
        return {
          ...currVal,
          incomingMessage: { ...currVal.incomingMessage, ...value },
        };
      });
    },
    [setFieldData]
  );
  const setValue = useCallback(
    (val: any, displayValue: any, alwaysRun?: boolean) => {
      if (!!alwaysRun === false) {
        setFieldData((currVal) => {
          if (currVal.value === val) {
            return currVal;
          } else {
            return {
              ...currVal,
              value: val,
              displayValue: displayValue ?? val,
            };
          }
        });
      } else {
        setFieldData((currVal) => {
          return {
            ...currVal,
            value: val,
            displayValue: displayValue ?? val,
          };
        });
      }
    },
    [setFieldData]
  );
  const runValidation = useCallback(
    (mergeObj: any, alwaysRun?: boolean, touchAndValidate?: boolean) => {
      if (mergeObj) {
        handleValidation(
          { ...fieldDataRef.current, ...mergeObj },
          dependentFieldsStateRef.current,
          alwaysRun,
          touchAndValidate
        );
      } else {
        handleValidation(
          fieldDataRef.current,
          dependentFieldsStateRef.current,
          alwaysRun,
          touchAndValidate
        );
      }
    },
    []
  );

  //handleChange will be responsible for setting fieldValue when will be passed as a props to the
  //inputs, it can take event, date, number, string, boolean,
  //It will run validation if validationRun == 'onChange'
  const handleChange = useCallback(
    (
      eventOrTextValue:
        | React.ChangeEvent<any>
        | Date
        | string
        | number
        | boolean
        | any[],
      displayValue?: Date | string | number | boolean | any[]
    ) => {
      if (fieldDataRef.current !== null) {
        eventOrTextValue = eventOrTextValue ?? "";
        let val = eventOrTextValue;
        let displayVal = displayValue;
        if (
          !(
            eventOrTextValue instanceof Date ||
            typeof eventOrTextValue === "string" ||
            typeof eventOrTextValue === "number" ||
            typeof eventOrTextValue === "boolean" ||
            Array.isArray(eventOrTextValue)
          )
        ) {
          //Since React 17 we dont need this but commeting it incase any issues are faced
          // if (
          //   (eventOrTextValue as React.ChangeEvent<any>) &&
          //   (eventOrTextValue as React.ChangeEvent<any>).persist
          // ) {
          //   (eventOrTextValue as React.ChangeEvent<any>).persist();
          // }
          const {
            type,
            value,
            checked,
            options,
            multiple,
          } = eventOrTextValue.target;
          let parsed;
          val = /number|range/.test(type)
            ? ((parsed = parseFloat(value)), isNaN(parsed) ? "" : parsed)
            : /checkbox/.test(type)
            ? getValueForCheckbox(fieldDataRef.current.value, checked, value)
            : !!multiple
            ? getSelectedValues(options)
            : value;
          displayVal = /checkbox/.test(type)
            ? getValueForCheckbox(
                fieldDataRef.current.displayValue ?? "00",
                checked,
                displayValue
              )
            : displayValue;
        }
        setValue(val, displayVal);
        if (
          isValidationFnRef.current &&
          (whenToRunValidation.current === "onChange" ||
            whenToRunValidation.current === "all")
        ) {
          runValidation({ value: val });
        }
      }
    },
    [setValue, runValidation, formContext.validationRun]
  );

  //handleBlur will set touch property in field state to true for every field touched by user
  //It will run validation if validationRun == 'onBlur'
  const handleBlur = useCallback(async () => {
    if (fieldDataRef.current !== null) {
      setTouched();
      if (
        isValidationFnRef.current &&
        (whenToRunValidation.current === "onBlur" ||
          whenToRunValidation.current === "all")
      ) {
        runValidation({ touched: true });
      }
    }
  }, [setTouched, runValidation, formContext.validationRun]);

  return {
    ...fieldData,
    formState: formContext.formState,
    whenToRunValidation: whenToRunValidation.current,
    isSubmitting: formState.isSubmitting,
    handleChange,
    handleBlur,
    setTouched,
    setValue,
    setIncomingMessage,
    runValidation,
    dependentValues: dependentFieldsState,
  };
};

//copied from formik

// Checkbox helper that will provide an array if multiple checkboxes are present under same name
function getValueForCheckbox(
  currentValue: string | any[],
  checked: boolean,
  valueProp: any
) {
  // If the current value was a boolean, return a boolean
  if (typeof currentValue === "boolean") {
    return Boolean(checked);
  }

  // If the currentValue was not a boolean we want to return an array
  let currentArrayOfValues: any[] = [];
  let isValueInArray = false;
  let index = -1;

  if (!Array.isArray(currentValue)) {
    // eslint-disable-next-line eqeqeq
    if (!valueProp || valueProp == "true" || valueProp == "false") {
      return Boolean(checked);
    }
  } else {
    // If the current value is already an array, use it
    currentArrayOfValues = currentValue;
    index = currentValue.indexOf(valueProp);
    isValueInArray = index >= 0;
  }

  // If the checkbox was checked and the value is not already present in the aray we want to add the new value to the array of values
  if (checked && valueProp && !isValueInArray) {
    return currentArrayOfValues.concat(valueProp);
  }

  // If the checkbox was unchecked and the value is not in the array, simply return the already existing array of values
  if (!isValueInArray) {
    return currentArrayOfValues;
  }

  // If the checkbox was unchecked and the value is in the array, remove the value and return the array
  return currentArrayOfValues
    .slice(0, index)
    .concat(currentArrayOfValues.slice(index + 1));
}

function getSelectedValues(options: any[]) {
  return Array.from(options)
    .filter((el) => el.selected)
    .map((el) => el.value);
}

//Need to rethink this API - its too messy
function wrapValidationMethod(
  schemaValidation?: typeof SchemaValidateFnType,
  validationFn?: typeof ValidateFnType,
  postValidationSetCrossFieldValuesFn?: typeof PostValidationSetCrossFieldValuesFnType,
  runPostValidationHookAlways?: boolean
) {
  if (
    typeof schemaValidation !== "function" &&
    typeof validationFn !== "function" &&
    typeof postValidationSetCrossFieldValuesFn !== "function"
  ) {
    return undefined;
  }
  const shouldRunAlways = Boolean(runPostValidationHookAlways);
  if (!shouldRunAlways) {
    const wrapperFunction = async (
      field: any,
      dependentFieldsState: DependentValuesType,
      formState: any
    ) => {
      let errorMsg: any = null;
      let apiResult: any = null;
      let errorMsgObj: any = null;
      let crossFieldMessages: InitialValuesType | null | undefined;
      if (typeof schemaValidation === "function") {
        errorMsg = await schemaValidation(field, formState);
      }
      if (Boolean(errorMsg)) {
        return { error: errorMsg, crossFieldMessages: {}, apiResult };
      }
      if (typeof validationFn === "function") {
        errorMsgObj = await validationFn(
          field,
          dependentFieldsState,
          formState
        );
        if (typeof errorMsgObj === "object") {
          errorMsg = errorMsgObj.error;
          apiResult = errorMsgObj.apiResult;
        } else {
          errorMsg = errorMsgObj;
        }
      }
      if (Boolean(errorMsg)) {
        return { error: errorMsg, crossFieldMessages: {}, apiResult };
      }
      if (typeof postValidationSetCrossFieldValuesFn === "function") {
        crossFieldMessages = await postValidationSetCrossFieldValuesFn(
          field,
          formState
        );
        if (
          crossFieldMessages === null ||
          crossFieldMessages === undefined ||
          typeof crossFieldMessages !== "object"
        ) {
          crossFieldMessages = {};
        }
      }
      return { error: errorMsg, crossFieldMessages, apiResult };
    };
    return wrapperFunction;
  } else {
    const wrapperFunctionAlways = async (
      field: any,
      dependentFieldsState: DependentValuesType,
      formState: any
    ) => {
      let errorMsg: any = null;
      let apiResult: any = null;
      let errorMsgObj: any = null;
      let crossFieldMessages: InitialValuesType | null | undefined;
      if (typeof postValidationSetCrossFieldValuesFn === "function") {
        crossFieldMessages = await postValidationSetCrossFieldValuesFn(
          field,
          formState
        );
        if (
          crossFieldMessages === null ||
          crossFieldMessages === undefined ||
          typeof crossFieldMessages !== "object"
        ) {
          crossFieldMessages = {};
        }
      }
      if (typeof schemaValidation === "function") {
        errorMsg = await schemaValidation(field, formState);
      }
      if (Boolean(errorMsg)) {
        return { error: errorMsg, crossFieldMessages, apiResult };
      }
      if (typeof validationFn === "function") {
        errorMsgObj = await validationFn(
          field,
          dependentFieldsState,
          formState
        );
        //to handle error type as object or string
        if (typeof errorMsgObj === "object") {
          errorMsg = errorMsgObj.error;
          apiResult = errorMsgObj.apiResult;
        } else {
          errorMsg = errorMsgObj;
        }
      }
      return { error: errorMsg, crossFieldMessages, apiResult };
    };
    return wrapperFunctionAlways;
  }
}

const transformDependentFields = (
  fieldKey: string,
  dependentFields: string[] | string | undefined
) => {
  if (dependentFields === undefined) {
    return dependentFields;
  }
  if (typeof dependentFields === "string") {
    dependentFields = [dependentFields];
  }
  if (Array.isArray(dependentFields)) {
    if (fieldKey.split(".").length > 1) {
      const fieldKeys = fieldKey.split(".");
      const prevKey = fieldKeys.slice(0, fieldKeys.length - 1).join(".");
      dependentFields = dependentFields.map((one) => {
        return `${prevKey}.${one}`;
      });
    }
  }
  return dependentFields;
};

const getFieldKeyForArray = (fieldKey: string) => {
  if (fieldKey.split(".").length > 1) {
    const fieldKeys = fieldKey.split(".");
    const prevKey = fieldKeys.slice(0, fieldKeys.length - 1).join(".");
    return `${prevKey}.`;
  }
  return "";
};

export const transformDependentFieldsState = (
  dependentValues: DependentValuesType
) => {
  const values = Object.keys(dependentValues);
  let newDependentValues = values.reduce((accum, fieldKey) => {
    let currentValue = dependentValues[fieldKey];
    const newFieldKeyFlattend = fieldKey.replace(/(\[\d+\])/g, "");
    accum[newFieldKeyFlattend] = currentValue;
    return accum;
  }, {});
  return newDependentValues;
};
