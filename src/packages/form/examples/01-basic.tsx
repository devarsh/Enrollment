import { Fragment } from "react";
import { RecoilRoot } from "recoil";
import {
  TextField,
  Checkbox,
  CheckboxGroup,
  Radio,
  Select,
  DatePicker,
  ToggleButtonGroup,
  ArrayField,
  ArrayField2,
  AutoComplete,
} from "components/common";
import { InputMask } from "components/derived";

import { useForm } from "packages/form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import * as yup from "yup";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FormContext } from "packages/form";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { parse, isDate } from "date-fns";

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

//@ts-ignore
const useStyles = makeStyles<any>((theme) => ({
  title: {
    color: "#26A456",
    letterSpacing: "2px",
    fontSize: "1.75rem",
    fontWeight: "700",
    alignSelf: "flex-start",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0 0 20px rgba(0,0,0,0.06)",
    padding: "1rem 2rem",
    borderRadius: 4,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <RecoilRoot>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormContext.Provider
          value={{
            formName: "form1",
            resetFieldOnUnmount: true,
            validationRun: "onBlur",
            initialValues: {
              firstName: "deva@gmail.com",
              password: "dsfdssddfgdfs",
              dob: new Date().toJSON(),
              contact: [
                { tel: 34353445, tag: 12 },
                { tel: 3335, tag: 13 },
              ],
              checking: [{ one: "devarsh", tow: "ivy" }],
            },
            validationSchema: yup.object().shape({
              email: yup
                .string()
                .required("required field")
                .email("should be valid email"),
              dob: yup.date().transform(parseDateString),
            }),
            formState: {},
          }}
        >
          <Container component="main">
            <div className={classes?.paper}>
              <Typography component="h3" className={classes?.title}>
                form1
              </Typography>
              <form className={classes?.form}>
                <MainApp />
              </form>
            </div>
          </Container>
        </FormContext.Provider>
      </MuiPickersUtilsProvider>
    </RecoilRoot>
  );
};

const MainApp = () => {
  const onSubmitHandler = (
    values,
    displayValues,
    submitEnd,
    setFieldsError
  ) => {
    setTimeout(() => {
      console.log(values);
      submitEnd(false, "Invalid request");
      setFieldsError({ firstName: "errr email taken" });
    }, 500);
  };

  const { handleSubmit, handleReset, handleClear } = useForm({
    onSubmit: onSubmitHandler,
  });
  const girdConfig: { item: boolean; xs: any; md: any; sm: any } = {
    xs: 12,
    md: 3,
    sm: 3,
    item: true,
  };

  return (
    <Fragment>
      <Grid container={true} spacing={3}>
        <TextField
          name="email"
          fieldKey="email"
          type="email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="username email"
          enableGrid={true}
          GridProps={girdConfig}
        />
        {/*@ts-ignore*/}
        <AutoComplete
          name="city"
          fieldKey="city"
          fullWidth
          label="City"
          enableGrid={true}
          showCheckbox={true}
          runValidationOnDependentFieldsChange={false}
          options={[
            { label: "Dubia", value: 1 },
            { label: "AbuDabhi", value: 2 },
            { label: "Dublin", value: 3 },
            { label: "Django", value: 4 },
            { label: "America", value: 5 },
            { label: "Panama", value: 6 },
          ]}
        />
      </Grid>
      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit Full
      </Button>
      <Button
        component="button"
        variant="contained"
        color="primary"
        onClick={handleReset}
      >
        Reset
      </Button>
      <Button variant="contained" color="primary" onClick={handleClear}>
        Clear
      </Button>
    </Fragment>
  );
};

export default App;

/*
 <DatePicker
          name="dob"
          fieldKey="dob"
          label="Date Of Birth"
          placeholder="dd/mm/yyyy"
          format="dd/MM/yyyy"
          enableGrid={true}
          GridProps={girdConfig}
        />
 <ArrayField
          arrayFieldName="contact"
          template={{ tel: "", tag: "" }}
          renderRowsFn={(props) => {
            const { row, removeFn, fields, rowIndex } = props;
            const oneRow = fields.map((field) => {
              return (
                <TextField
                  name={row.cells[field].name}
                  fieldKey={row.cells[field].key}
                  key={row.cells[field].key}
                  type="text"
                  variant="outlined"
                  margin="normal"
                  label={field}
                  enableGrid={true}
                />
              );
            });
            return (
              <div key={row.fieldIndexKey}>
                {oneRow}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFn(rowIndex);
                  }}
                >
                  Remove Key
                </button>
              </div>
            );
          }}
          renderParentFn={({ rows, key, push }) => {
            return (
              <div key={key}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    push();
                  }}
                >
                  Add
                </button>
                {rows}
              </div>
            );
          }}
        />

        <ArrayField2
          arrayFieldName="checking"
          template={{ one: "", tow: "" }}
          fieldsMeta={{
            one: {
              render: {
                componentType: "textField",
                group: 0,
              },
              name: "one",
              type: "text",
              label: "One",
              required: true,
              placeholder: "One wala",
              GridProps: {
                xs: 12,
                md: 3,
                sm: 3,
              },
            },
            tow: {
              render: {
                componentType: "textField",
                group: 0,
              },
              name: "tow",
              type: "text",
              label: "Two",
              required: true,
              placeholder: "Tow wala",

              GridProps: {
                xs: 12,
                md: 3,
                sm: 3,
              },
            },
          }}
        />
 <ToggleButtonGroup
          name="formType"
          fieldKey="formType"
          label="Form Type"
          options={[
            { label: "Personal", value: "1", iconName: "person" },
            { label: "Corporate", value: "2", iconName: "business" },
          ]}
          enableGrid={true}
          exclusive={true}
          GridProps={girdConfig}
        />
        <InputMask
          name="formatText"
          fieldKey="formatText"
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Format Text"
          enableGrid={true}
          GridProps={girdConfig}
          MaskProps={{
            mask: "0000 `00000 `0000",
            lazy: false,
            unmask: true,
            prepare: (str) => str.toUpperCase(),
          }}
        />
        <TextField
          name="email"
          fieldKey="email"
          type="email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="username email"
          enableGrid={true}
          GridProps={girdConfig}
        />
        <TextField
          name="amount"
          fieldKey="amount"
          type="number"
          variant="outlined"
          margin="normal"
          required
          label="Amount"
          fullWidth
          enableNumWords={true}
          enableGrid={true}
          GridProps={girdConfig}
        />
        <Checkbox
          name="rememberMe"
          fieldKey="rememberMe"
          label="I have read all the terms and conditions"
          enableGrid={true}
          GridProps={girdConfig}
        />
        <CheckboxGroup
          fieldKey="food"
          name="food"
          label="pick everything you want"
          options={[
            { label: "ice-cream", value: "ic" },
            { label: "oreo", value: "o" },
            { label: "laze", value: "l" },
          ]}
          enableGrid={true}
          GridProps={girdConfig}
        />
        <Radio
          name="marriageStatus"
          fieldKey="marriageStatus"
          label="Marriage Status"
          options={[
            { label: "Married", value: "m" },
            { label: "UnMarried", value: "u" },
          ]}
          enableGrid={true}
          GridProps={girdConfig}
        />
        <Radio
          name="kidsStatus"
          fieldKey="kidsStatus"
          label="Kids Status"
          options={[
            { label: "have kids", value: "h" },
            { label: "no kids", value: "n" },
          ]}
          enableGrid={true}
          GridProps={girdConfig}
          dependentFields={["marriageStatus"]}
          shouldExclude={(_, dependentValues) => {
            if (dependentValues?.marriageStatus?.value === "m") {
              return false;
            }
            return true;
          }}
        />
         <Select
          fieldKey="country"
          name="country"
          label="country"
          fullWidth
          options={() => {
            return new Promise((res, rej) => {
              setTimeout(() => {
                res([
                  { label: "India", value: 1 },
                  { label: "Usa", value: 2 },
                  { label: "Canada", value: 3 },
                ]);
              }, 5000);
            });
          }}
          enableGrid={true}
          GridProps={girdConfig}
        />
        <Select
          name="state"
          fieldKey="state"
          label="State"
          fullWidth
          enableGrid={true}
          GridProps={girdConfig}
          dependentFields={["country"]}
          options={(dependentValues) => {
            return new Promise((res) => {
              setTimeout(() => {
                let value = dependentValues?.country?.value;
                value = Boolean(value) ? value : undefined;
                if (value === 1) {
                  res([
                    { label: "Gujarat", value: 1 },
                    { label: "Maharashtra", value: 2 },
                    { label: "Rajasthan", value: 3 },
                  ]);
                } else if (value === 2) {
                  res([
                    { label: "California", value: 1 },
                    { label: "Texas", value: 2 },
                    { label: "Florida", value: 3 },
                  ]);
                } else if (value === 3) {
                  res([
                    { label: "Ontario", value: 1 },
                    { label: "Alberta", value: 2 },
                    { label: "Ottawa", value: 3 },
                  ]);
                } else {
                  res([{ label: "unknown", value: undefined }]);
                }
              }, 3000);
            });
          }}
        />
        <Select
          fieldKey="city"
          name="city"
          label="City"
          fullWidth
          enableGrid={true}
          GridProps={girdConfig}
          options={[
            { label: "Ahmedabad", value: 1 },
            { label: "Baroda", value: 2 },
            { label: "Rajkot", value: 3 },
            { label: "Surat", value: 4 },
            { label: "Nadiad", value: 5 },
          ]}
        />
        <TextField
          name="pincode"
          fieldKey="pincode"
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Pincode"
          postValidationSetCrossFieldValues={(fieldData) => {
            if (fieldData.value === "380015") {
              return {
                area: {
                  options: [
                    {
                      label: "shyamal",
                      value: 1,
                    },
                    {
                      label: "prahladnagar",
                      value: 2,
                    },
                  ],
                  value: 1,
                },
              };
            } else if (fieldData.value === "380006") {
              return {
                area: {
                  options: [
                    {
                      label: "gulbai tekra",
                      value: 1,
                    },
                    {
                      label: "c.g road",
                      value: 2,
                    },
                  ],
                  value: 2,
                },
              };
            } else {
              return {
                area: {
                  options: [
                    {
                      label: "Not found",
                      value: null,
                    },
                  ],
                  value: null,
                },
              };
            }
          }}
          enableGrid={true}
          GridProps={girdConfig}
        />
        <Select
          fieldKey="area"
          name="area"
          label="Area"
          fullWidth
          enableGrid={true}
          GridProps={girdConfig}
        />
<ArrayField
        arrayFieldName="address"
        template={{ street1: "", city: "", state: "" }}
        renderRowsFn={(props) => {
          const { row, removeFn, fields, rowIndex } = props;
          const oneRow = fields.map((field) => {
            return (
              <TextField
                name={row.cells[field].name}
                fieldKey={row.cells[field].key}
                key={row.cells[field].key}
                type="text"
                variant="outlined"
                margin="normal"
                label={field}
                validate={yupValidationHelper(
                  yup.string().required("this is required field")
                )}
                enableGrid={false}
              />
            );
          });
          return (
            <div key={row.fieldIndexKey}>
              {oneRow}
              <button onClick={() => removeFn(rowIndex)}>Remove Key</button>
            </div>
          );
        }}
        renderParentFn={({ rows, key, push }) => {
          return (
            <div key={key}>
              <button onClick={() => push()}>Add</button>
              {rows}
            </div>
          );
        }}
      />
*/
