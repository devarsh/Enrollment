import { atomFamily, selectorFamily, DefaultValue } from "recoil";

import {
  FormAtomType,
  FormFieldAtomType,
  FormArrayFieldRowsAtomType,
  FormFieldRegisterSelectorAttributes,
  FormFieldRegistryAtomType,
  DependentValuesType,
  SubscritionFieldsType,
} from "./types";

export const atomKeys = {
  formAtom: "formAtom",
  formFieldAtom: "formFieldAtom",
  formArrayFieldRowsAtom: "formArrayFieldRowsAtom",
  formArrayFieldRegistryAtom: "formArrayFieldRegistryAtom",
  formFieldRegistryAtom: "formFieldRegistryAtom",
  formFieldRegisterSelector: "formFieldRegisterSelector",
  formFieldUnregisterSelector: "formFieldUnregisterSelector",
  formArrayFieldRegisterSelector: "formArrayFieldRegisterSelector",
  formArrayFieldUnregisterSelector: "formArrayFieldUnregisterSelector",
  subscribeToFormFieldsSelector: "subscribeToFormFieldsSelector",
  isFormArrayFieldRegistered: "isFormArrayFieldRegistered",
  formFieldsExcludedAtom: "formFieldsExcludedAtom",
  formFieldExcludeAddSelector: "formFieldExcludeAddSelector",
  formFieldExcludeRemoveSelector: "formFieldExcludeRemoveSelector",
  formFieldsErrorWatcherAtom: "formFieldsErrorWatcherAtom",
  formFieldsErrorWatcherAddSelector: "formFieldsErrorWatcherAddSelector",
  formFieldsErrorWatcherRemoveSelector: "formFieldsErrorWatcherAddSelector",
};

export const formAtom = atomFamily<FormAtomType, string>({
  key: atomKeys.formAtom,
  default: {
    submitAttempt: 0,
    isSubmitting: false,
    submitSuccessful: false,
    serverSentError: "",
  },
});

export const formFieldAtom = atomFamily<FormFieldAtomType, string>({
  key: atomKeys.formFieldAtom,
  default: (fieldKey) => ({
    fieldKey: fieldKey ?? "",
    name: fieldKey ?? "",
    value: "",
    displayValue: "",
    touched: false,
    error: null,
    validationRunning: false,
    validate: null,
    excluded: false,
    readOnly: false,
    incomingMessage: null,
  }),
});

export const formFieldsErrorWatcherAtom = atomFamily<string[], string>({
  key: atomKeys.formFieldsErrorWatcherAtom,
  default: [],
});

export const formFieldsErrorWatcherAddSelector = selectorFamily<string, string>(
  {
    key: atomKeys.formFieldsErrorWatcherAddSelector,
    set: (formName) => ({ set, get }, fieldName) => {
      if (!(fieldName instanceof DefaultValue)) {
        const fields = get(formFieldsErrorWatcherAtom(formName));
        const valueExists = fields.indexOf(fieldName) > -1;
        if (!valueExists) {
          const newFields = [...fields, fieldName];
          set(formFieldsErrorWatcherAtom(formName), newFields);
        }
      }
    },
    get: (_) => () => {
      return "";
    },
  }
);

export const formFieldsErrorWatcherRemoveSelector = selectorFamily<
  string,
  string
>({
  key: atomKeys.formFieldsErrorWatcherRemoveSelector,
  set: (formName) => ({ set, get }, fieldName) => {
    if (!(fieldName instanceof DefaultValue)) {
      const fields = get(formFieldsErrorWatcherAtom(formName));
      const index = fields.indexOf(fieldName);
      if (index > -1) {
        const newFields = [
          ...fields.slice(0, index),
          ...fields.slice(index + 1),
        ];
        set(formFieldsErrorWatcherAtom(formName), newFields);
      }
    }
  },
  get: (_) => () => {
    return "";
  },
});

export const formFieldsExcludedAtom = atomFamily<string[], string>({
  key: atomKeys.formFieldsExcludedAtom,
  default: [],
});

export const formFieldExcludeAddSelector = selectorFamily<string, string>({
  key: atomKeys.formFieldExcludeAddSelector,
  set: (formName) => ({ set, get }, fieldName) => {
    if (!(fieldName instanceof DefaultValue)) {
      const fields = get(formFieldsExcludedAtom(formName));
      const valueExists = fields.indexOf(fieldName) > -1;
      if (!valueExists) {
        const newFields = [...fields, fieldName];
        set(formFieldsExcludedAtom(formName), newFields);
      }
    }
  },
  get: (_) => () => {
    return "";
  },
});
export const formFieldExcludeRemoveSelector = selectorFamily<string, string>({
  key: atomKeys.formFieldExcludeAddSelector,
  set: (formName) => ({ set, get }, fieldName) => {
    if (!(fieldName instanceof DefaultValue)) {
      const fields = get(formFieldsExcludedAtom(formName));
      const index = fields.indexOf(fieldName);
      if (index > -1) {
        const newFields = [
          ...fields.slice(0, index),
          ...fields.slice(index + 1),
        ];
        set(formFieldsExcludedAtom(formName), newFields);
      }
    }
  },
  get: (_) => () => {
    return "";
  },
});

export const formFieldRegistryAtom = atomFamily<
  FormFieldRegistryAtomType,
  string
>({
  key: atomKeys.formFieldRegistryAtom,
  default: [],
});

export const formFieldRegisterSelector = selectorFamily<
  FormFieldRegisterSelectorAttributes,
  string
>({
  key: atomKeys.formFieldRegisterSelector,
  set: (formName) => ({ set, get }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const fields = get(formFieldRegistryAtom(formName));
      const valueExists = fields.indexOf(newValue.fieldName) > -1;
      if (!valueExists) {
        const newFields = [...fields, newValue.fieldName];
        set(formFieldRegistryAtom(formName), newFields);
        if (newValue.defaultValue !== null) {
          set(formFieldAtom(newValue.fieldName), (prev) => ({
            ...prev,
            ...newValue.defaultValue,
          }));
        }
      }
    }
  },
  get: (_) => () => {
    return { defaultValue: "", fieldName: "" };
  },
});

export const formFieldUnregisterSelector = selectorFamily<string, string>({
  key: atomKeys.formFieldUnregisterSelector,
  set: (formName) => ({ set, get, reset }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const fields = get(formFieldRegistryAtom(formName));
      const index = fields.indexOf(newValue);
      if (index > -1) {
        reset(formFieldAtom(newValue));
        const newFields = [
          ...fields.slice(0, index),
          ...fields.slice(index + 1),
        ];
        set(formFieldRegistryAtom(formName), newFields);
      }
    }
  },
  get: (_) => () => {
    return "";
  },
});

export const formArrayFieldRowsAtom = atomFamily<
  FormArrayFieldRowsAtomType,
  string
>({
  key: atomKeys.formArrayFieldRowsAtom,
  default: (fieldName) => ({
    fieldName: fieldName,
    templateFieldRows: [],
    lastInsertIndex: -1,
    resetFlag: false,
  }),
  dangerouslyAllowMutability: true,
});

export const formArrayFieldRegistryAtom = atomFamily<string[], string>({
  key: atomKeys.formArrayFieldRegistryAtom,
  default: [],
});

export const formArrayFieldRegisterSelector = selectorFamily<string, string>({
  key: atomKeys.formArrayFieldRegisterSelector,
  set: (formName) => ({ set, get }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const fields = get(formArrayFieldRegistryAtom(formName));
      const valueExists = fields.indexOf(newValue) > -1;
      if (!valueExists) {
        const newFields = [...fields, newValue];
        set(formArrayFieldRegistryAtom(formName), newFields);
      }
    }
  },
  get: (_) => () => {
    return "";
  },
});

export const formArrayFieldUnregisterSelector = selectorFamily<string, string>({
  key: atomKeys.formArrayFieldUnregisterSelector,
  set: (formName) => ({ set, get, reset }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const fields = get(formArrayFieldRegistryAtom(formName));
      const index = fields.indexOf(newValue);
      if (index > -1) {
        reset(formArrayFieldRegistryAtom(newValue));
        const newFields = [
          ...fields.slice(0, index),
          ...fields.slice(index + 1),
        ];
        set(formArrayFieldRegistryAtom(formName), newFields);
      }
    }
  },
  get: (_) => () => {
    return "";
  },
});

export const subscribeToFormFieldsSelector = selectorFamily<
  DependentValuesType,
  SubscritionFieldsType
>({
  key: atomKeys.subscribeToFormFieldsSelector,
  get: (subscriptionFields) => ({ get }) => {
    if (typeof subscriptionFields !== "object") {
      return {};
    }
    let fields = subscriptionFields.fields;
    if (fields === undefined) {
      fields = [];
    }
    if (typeof fields === "string") {
      fields = [fields];
    }
    let fieldValues: DependentValuesType = {};
    for (let field of fields) {
      if (typeof field === "string" && Boolean(field)) {
        let fieldState = get(
          formFieldAtom(`${subscriptionFields.formName}/${field}`)
        );
        fieldValues[field] = fieldState;
      }
    }
    return fieldValues;
  },
});
