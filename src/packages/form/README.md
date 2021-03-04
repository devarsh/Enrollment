# Recoil-Fast-Forms

## Motivation

This package is helps building performant forms using Recoil JS which solves the underlying challenges with the React Context API. With React context API building forms can always run into performance issues unless you're using `refs` and bailing out of reacts state update mechamism like in the case of `react-hooks-forms`. Under the hood Recoil also utilizes Context and Refs and provides us an API to perform granual updates without loosing React hooks symenatics. This has enabled for a host of features which were an ideal fit for building fast performant forms. `recoil-fast-forms` is an effort to provide a library that helps building forms a non-trivial task.

## Features

1. Multiple forms under the same recoil root
2. Initialize Form with default Values
3. Client-Side Validation field wise - async validation also supported
4. Yup schema level validation support
5. Cross field watch support
6. Nested Object support using `useFieldArray` hook
7. Form level server error and field level server error setting support
8. Support for string,number,date object storing

## Disclaimer

This is a hooks only API, so you have to create wrapper components that will consume this API. This library is currently not providing wrapper components out of the box.

## API Reference

The API is hooks based, hooks have provided us a way to cleanly seperate logic from rendering. Giving you a seamless experince while intergrate with any UI library.

### FormContext

```js
contextType = {
  formName: string;
  validationRun: string;
  resetFieldOnUnmount: boolean;
  initialValues?: Object
  validationSchema?: YupValidationSchemaObject
}
```

#### Properties

- **formName** : Name of the form, ensure that formName is unique if two are more form instances are running

- **validationRun**: Should the validation run when the field value changes, or field loses focus or both, the corresponding properties are `onChange` `onBlur` `all`

- **resetFieldOnUnmount**: Should the field values be reset when the field unmounts, if false the field values will be retained and when remounted last field state will be restored.

- **initialValues**: Provide a `key:value` pair object and form with be initialized with values passed in this object, where key is fieldName and value will be default/initital value

- **validationSchema**: The library provides inbuilt support for yup validation library and yup validation object can be passed for field level validation. We do not support cross field validation.

### useForm

```ts
const {
  submitAttempt,
  isSubmitting,
  submitSuccessful,
  serverSentError,
  handleSubmit,
  handleSubmitPartial,
  handleReset,
  handleResetPartial,
  handleClear,
  handleClearPartial,
} = useForm(submitFn(formValuesObject, endSubmit, setFieldsErrors));

SubmitFn(
  obj: FormValuesObject,
  endSubmit: (submitSuccessful: boolean, message?: string) => void,
  setFieldErrors: (fieldsErrorObj: FieldsErrorObjType) => void,
);
```

#### Properties

- **submitAttempt**: Returns the count of form submit attempt

- **isSubmitting**: Returns true if the form is currently being submitted

- **submitSuccessful**: Returns the boolean of form submit status - true if form was successfully submitted otherwise false

- **serverSentError**: Returns error or any other status returned from the server.

- **handleSubmit Function(e:FormEvent)**: calls the SubmitFn passed if there is no error in the form and submits the forms

- **handleSubmit Function(fields: string[])**: validates the fields passed as array to the function- useful in stepper or cases where partial form validation is required and returns boolean

- **handleReset Function(e:FormEvent)**: Resets all form fields to initial values passed to the form and if no initial values exists it clears the form

- **handleReset Function(fields: string[])**: Only resets the fields passed as fields array to the function

- **handleClear Function(e:FormEvent)**: Clears all form fields

- **handleClear Function(fields: string[])**: Only clear the fields passed in fileds array

#### Submit Function Args

- `formValuesObject: Object`

  - Object of key value pairs contaning field Name and corresponding value

- `endSubmit: Function(submitSuccessful: boolean, message: string) => void`

  - submitSuccessful : pass a boolean depending on form submit succes or failure
  - message: string message if any returned by the server

- `setFieldsErrors: Function(fieldsErrorObj: Object) => void`

  - fieldsErrorObject if returned by the server - used in case validation is performed at server level. The object will be a key value pair - with corresponding field name and error

### useField

```ts
const {
    fieldKey: string;
    name: string;
    value: any;
    touched: boolean;
    error: string | null;
    validationRunning: boolean;
    validate?: Function
    isSubmitting: boolean
    handleChange: Function
    handleBlur: Function
    dependentValues: Array,
    excluded: boolean,
} = useForm({
    fieldKey: string;
    name: string;
    validate?: typeof ValidateFnType;
    shouldExclude?: (
      fieldData: FormFieldAtomType,
      dependentFieldsValues: DependentValuesType) => boolean | Promise<boolean>
    dependentFields?: string[];
})
```

#### useForm Arguments

- **fieldKey**: Unique key for every field

- **name**: Name of the field

- **validate**: Validation method that should be called to perform validation

- **dependentFields**: Array of field name that needs to be watched

- **shouldExclude**: will pass currentField Data and dependentFieldsValues and function should return true to exlude the field otherwise false, if field is excluded it will excluded from form errors and handleSubmit.

#### Properties

- **fieldKey**: Unique key for every field in the form

- **name**: Name of the field

- **value**: Value of the current field

- **touched**: Touched property is true if the field has received focus atleast once

- **error**: Error property holds the current error message

- **validationRunning**: Returns boolean determining if the validation is running or not

- **validate: Function(fieldObject) => string**: Validate function that recieves current field props and it returns error in string format

  - fieldObject has `fieldKey, name, value, touched, error` properties
  - Note: if current field exist in the validationSchema then a wrapper function will wrap validation function and field validation from the validationScheam, and when field schema level validation is successful only then the validation will be called.

- **isSubmitting**: Returns true if the form is submitting

- **handleChange: Function(event| string| number | date)**: onChange handler that will be passed to the underlying fields

- **handleBlur: Function(event)**: onBlur handler that will be passed to the underlying field

- **dependentValues**: provides an array of watch fields with `fieldKey,name,value,touched,error` fields for each watched field

- **setExcluded:** : Returns true if field is excluded. This is useful in cases where you want to hide certain fields.

### useFieldArray

```ts
export const useFieldArray = ({
  arrayFieldName,
  template,
}) => {
    fieldRows,
    templateFieldNames,
    clearFieldArray,
    unshift,
    push,
    insert,
    pop,
    remove,
    swap,
    move,
    renderRows,
}
```

#### Description

ArrayFields hooks provides support for nested arrays and provides methods to add, remove fields

#### useFieldArray Arguments

- **arrayFieldName**: Name of the arrayField
- **template**: Object of key value pairs `address={ street1:"",street2:"",city:"",state:"",country:"" }`

#### Properties

- **fieldRows**: Array of rows with rowKey for the container and cells
  ```js
  [{
    fieldIndexKey: FormName/FieldName/IndexInTheArray,
    cells: {
      fieldName: { name: TemplateFieldName, key: TemplateFieldKey },
      fieldName2: { name: TemplateFieldName2, key: TemplateFieldKey2}
    }
  },
  {
    fieldIndexKey: FormName/FieldName/IndexIntheArray,
    cells: {
      ....
    }
  }]
  ```
- **templateFieldNames**: Returns an array of field names passed in the template object.

- **clearFieldArray**: This method clear all the rows from the array.

- **unshift**: Adds a new row at the beginning of the array.

- **push**: Adds a new row at the end of the array.

- **insert(insertIndex: number)**: Inserts a new row at the passed index in the array, if Index is greater than length of array or negative it will be ignored.

- **pop**: Removes the last added row from the array.

- **remove(removeAtIndex: number)**: This removes the field from the given position in the array.

- **swap(indexA: number, indexB: number)**: This method swaps two fields in the array.

- **move(fromIndex: number, toIndex: number)**: This method moves the field from `from` index to `to` index and shifts other values to the right or left depending.
