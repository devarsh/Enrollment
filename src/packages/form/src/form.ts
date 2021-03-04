import { useContext, useCallback, useEffect } from "react";
import {
  Snapshot,
  useRecoilCallback,
  useRecoilValue,
  RecoilState,
} from "recoil";
import {
  formAtom,
  formFieldAtom,
  formFieldRegistryAtom,
  formArrayFieldRowsAtom,
  formArrayFieldRegistryAtom,
  formFieldsExcludedAtom,
  formFieldsErrorWatcherAtom,
  subscribeToFormFieldsSelector,
} from "./atoms";
import { setIn, getIn } from "./util";
import {
  FieldsErrorObjType,
  FormFieldAtomType,
  InitialValuesType,
  UseFormHookProps,
} from "./types";
import { FormContext } from "./context";

export const useForm = ({ onSubmit, readOnly = false }: UseFormHookProps) => {
  const formContext = useContext(FormContext);

  const formState = useRecoilValue(formAtom(formContext.formName));

  const removeFormInstance = useRecoilCallback(
    ({ reset, snapshot }) => () => {
      const loadableFields = snapshot.getLoadable(
        formFieldRegistryAtom(formContext.formName)
      );
      const loadableArrayFields = snapshot.getLoadable(
        formArrayFieldRegistryAtom(formContext.formName)
      );
      if (loadableFields.state === "hasValue") {
        const fields = loadableFields.contents;
        for (const field of fields) {
          reset(formFieldAtom(field));
        }
      }
      if (loadableArrayFields.state === "hasValue") {
        const arrayFields = loadableArrayFields.contents;
        for (const arrayField of arrayFields) {
          reset(formArrayFieldRowsAtom(arrayField));
        }
      }
      reset(formArrayFieldRegistryAtom(formContext.formName));
      reset(formFieldRegistryAtom(formContext.formName));
      reset(formFieldsExcludedAtom(formContext.formName));
      reset(formFieldsErrorWatcherAtom(formContext.formName));
      reset(formAtom(formContext.formName));
    },
    [formContext.formName]
  );

  //clear form Atoms on unmount
  useEffect(() => {
    return () => removeFormInstance();
  }, [removeFormInstance]);

  const setInitValues = useRecoilCallback(
    ({ set, snapshot }) => (initValues: InitialValuesType) => {
      const loadableFields = snapshot.getLoadable(
        formFieldRegistryAtom(formContext.formName)
      );
      if (loadableFields.state === "hasValue") {
        const fields = loadableFields.contents;

        for (const field of fields) {
          const trimFormNameFromFieldName = field.replace(
            `${formContext.formName}/`,
            ""
          );
          let defaultValue =
            typeof initValues === "object"
              ? getIn(initValues, trimFormNameFromFieldName, "")
              : "";
          set(formFieldAtom(field), (currVal) => ({
            ...currVal,
            touched: false,
            value: defaultValue,
            error: "",
            validationRunning: false,
          }));
        }
        //Inititalize ArrayField
        const loadableArrayFields = snapshot.getLoadable(
          formArrayFieldRegistryAtom(formContext.formName)
        );
        if (loadableArrayFields.state === "hasValue") {
          const arrayFields = loadableArrayFields.contents;
          for (const arrayField of arrayFields) {
            set(formArrayFieldRowsAtom(arrayField), (old) => ({
              ...old,
              resetFlag: true,
            }));
          }
        }
      }
    },
    []
  );

  const startSubmit = useRecoilCallback(
    ({ set }) => () => {
      set(formAtom(formContext.formName), (currVal) => ({
        ...currVal,
        isSubmitting: true,
        submitAttempt: currVal.submitAttempt + 1,
      }));
    },
    []
  );

  //initialize form readOnly
  useEffect(() => {
    if (Boolean(readOnly)) {
      startSubmit();
    }
  }, [startSubmit, readOnly]);

  const endSubmit = useRecoilCallback(
    ({ set }) => (submitSuccessful: boolean = false, message: string = "") => {
      if (typeof message !== "string") {
        message = "";
      }
      set(formAtom(formContext.formName), (currVal) => ({
        ...currVal,
        isSubmitting: false,
        submitSuccessful,
        serverSentError: message,
      }));
    },
    []
  );
  //need to change this to pass arrayField errors to respective arrayField
  //Todo: loop to registered field and grab errors from the object and set the same.
  const setFieldErrors = useRecoilCallback(
    ({ set }) => (fieldsErrorObj: FieldsErrorObjType = {}) => {
      for (const field of Object.entries(fieldsErrorObj)) {
        const [fieldName, error] = field;
        set(
          formFieldAtom(`${formContext.formName}/${fieldName}`),
          (currVal) => ({
            ...currVal,
            error: error,
          })
        );
      }
    },
    []
  );

  const handleClear = useRecoilCallback(
    ({ snapshot, set }) => (e: React.FormEvent<any> | any) => {
      e?.preventDefault?.();
      const loadableFields = snapshot.getLoadable(
        formFieldRegistryAtom(formContext.formName)
      );
      if (loadableFields.state === "hasValue") {
        const fields = loadableFields.contents;
        for (const field of fields) {
          set(formFieldAtom(field), (currVal) => ({
            ...currVal,
            touched: false,
            value: "",
            error: "",
            validationRunning: false,
          }));
        }
      }
      const loadableArrayFields = snapshot.getLoadable(
        formArrayFieldRegistryAtom(formContext.formName)
      );
      if (loadableArrayFields.state === "hasValue") {
        const arrayFields = loadableArrayFields.contents;
        for (const arrayField of arrayFields) {
          set(formArrayFieldRowsAtom(arrayField), (old) => ({
            ...old,
            resetFlag: false,
            templateFieldRows: [],
            lastInsertIndex: -1,
          }));
        }
      }
    },
    []
  );

  const handleReset = useCallback(
    (e: React.FormEvent<any>) => {
      e.preventDefault();
      if (
        typeof formContext.initialValues === "object" &&
        Object.keys(formContext.initialValues).length > 0
      ) {
        setInitValues(formContext.initialValues);
      } else {
        handleClear(null);
      }
    },
    [setInitValues, handleClear, formContext.initialValues]
  );

  const handleClearPartial = useRecoilCallback(
    ({ snapshot, set }) => (fields: string[]) => {
      for (const field of fields) {
        set(formFieldAtom(`${formContext.formName}/${field}`), (currVal) => ({
          ...currVal,
          touched: false,
          value: "",
          error: "",
          validationRunning: false,
        }));
      }
      const loadableArrayFields = snapshot.getLoadable(
        formArrayFieldRegistryAtom(formContext.formName)
      );
      if (loadableArrayFields.state === "hasValue") {
        const arrayFields = loadableArrayFields.contents;
        for (const arrayField of arrayFields) {
          set(formArrayFieldRowsAtom(arrayField), (old) => ({
            ...old,
            resetFlag: false,
            templateFieldRows: [],
            lastInsertIndex: -1,
          }));
        }
      }
    },
    [formContext.formName]
  );

  const getDependentValues = useRecoilCallback(
    ({ snapshot }) => (fields?: string[] | string) => {
      const loadable = snapshot.getLoadable(
        subscribeToFormFieldsSelector({
          formName: formContext.formName,
          fields: fields,
        })
      );
      switch (loadable.state) {
        case "hasValue": {
          return loadable.contents;
        }
      }
      return {};
    }
  );

  const handleResetPartial = useCallback(
    (fields: string[]) => {
      if (
        typeof formContext.initialValues === "object" &&
        Object.keys(formContext.initialValues).length > 0
      ) {
        let newInitialValues = {};
        for (const field of fields) {
          const result = getIn(formContext.initialValues, field, null);
          if (Boolean(result)) {
            newInitialValues = setIn(newInitialValues, field, result);
          }
        }
        if (Object.keys(newInitialValues).length > 0) {
          setInitValues(newInitialValues);
        } else {
          handleClearPartial(fields);
        }
      }
    },
    [formContext.initialValues, handleClearPartial, setInitValues]
  );

  const runValidation = async (
    field: string,
    snapshot: Snapshot,
    set: <T>(
      recoilVal: RecoilState<T>,
      valOrUpdater: T | ((currVal: T) => T)
    ) => void
  ): Promise<FormFieldAtomType | null> => {
    const loadableFieldState = snapshot.getLoadable(formFieldAtom(field));
    if (loadableFieldState.state === "hasValue") {
      const readOnlyFieldState = loadableFieldState.contents;
      //dont validate if file is excluded
      if (readOnlyFieldState.excluded === true) {
        return null;
      }
      const fieldState = { ...readOnlyFieldState };
      let result: any = null;
      if (!fieldState.touched || fieldState.validationRunning) {
        const customValidator =
          typeof fieldState.validate === "function"
            ? fieldState.validate
            : (data: FormFieldAtomType) => ({
                error: data.error,
              });
        try {
          const dependentFieldsState = getDependentValues(
            fieldState.dependentFields
          );
          result = await Promise.resolve(
            customValidator(
              fieldState,
              dependentFieldsState,
              formContext.formState
            )
          );
        } catch (e) {
          result = { error: e.message, apiResult: null };
        }
        const newFieldState = {
          ...fieldState,
          validationRunning: false,
          touched: true,
          error: result.error,
          validationAPIResult: result.apiResult,
        };
        set(formFieldAtom(field), newFieldState);
        return newFieldState;
      }
      return fieldState;
    }
    return null;
  };

  const handleSubmitPartial = useRecoilCallback(
    ({ snapshot, set }) => (fields: string[]) => {
      const _handleSubmit = async (fields: string[]) => {
        let hasError = false;
        for (const field of fields) {
          let result = await runValidation(
            `${formContext.formName}/${field}`,
            snapshot,
            set
          );
          if (result === null) {
            continue;
          }
          if (hasError === false) {
            hasError = Boolean(result.error);
          }
        }
        return hasError;
      };
      return _handleSubmit(fields);
    },
    [formContext.formName]
  );

  const handleSubmit = useRecoilCallback(
    ({ snapshot, set }) => (e: React.FormEvent<any>) => {
      const _handleSubmit = async (e: React.FormEvent<any>) => {
        const loadableFields = snapshot.getLoadable(
          formFieldRegistryAtom(formContext.formName)
        );
        if (loadableFields.state === "hasValue") {
          const fields = loadableFields.contents;
          const fieldsAggrigator: FormFieldAtomType[] = [];
          let hasError = false;
          for (const field of fields) {
            let result = await runValidation(field, snapshot, set);
            if (result === null) {
              continue;
            }
            if (hasError === false) {
              hasError = Boolean(result.error);
            }
            fieldsAggrigator.push(result);
          }
          //In debug mode allow to move to next step without validating
          if (process.env.REACT_APP_DEBUG_MODE === "true") {
            hasError = false;
          }
          if (!hasError) {
            if (typeof onSubmit === "function") {
              let resultValueObj = {};
              let resultDisplayValueObj = {};
              for (const field of fieldsAggrigator) {
                resultValueObj = setIn(
                  resultValueObj,
                  field.name.replace(`${formContext.formName}/`, ""),
                  field.value
                );
                resultDisplayValueObj = setIn(
                  resultDisplayValueObj,
                  field.name.replace(`${formContext.formName}/`, ""),
                  field.displayValue
                );
              }
              onSubmit(
                resultValueObj,
                resultDisplayValueObj,
                endSubmit,
                setFieldErrors
              );
            }
          } else {
            endSubmit(false);
          }
        }
      };
      e.preventDefault();
      startSubmit();
      _handleSubmit(e);
    },
    []
  );

  return {
    handleSubmit,
    handleSubmitPartial,
    handleReset,
    handleResetPartial,
    handleClear,
    handleClearPartial,
    ...formState,
  };
};
