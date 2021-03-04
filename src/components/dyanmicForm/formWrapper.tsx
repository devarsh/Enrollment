import { FC } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Alert from "@material-ui/lab/Alert";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormContext, useForm } from "packages/form";
import { renderFieldsByGroup } from "./utils/groupWiserenderer";
import {
  constructInitialValue,
  constructInitialValuesForArrayFields,
} from "./utils/constructINITValues";
import { constructYupSchema } from "./utils/constructYupSchema";
import { attachMethodsToMetaData } from "./utils/attachMethodsToMetaData";
import { extendFieldTypes } from "./utils/extendedFieldTypes";
import { MoveSequenceToRender } from "./utils/fixSequenceInMetaData";
import { MetaDataType, FormWrapperProps } from "./types";
import { GroupedForm } from "./groupedForms";
import { SimpleForm } from "./simpleForm";
import { extendedMetaData } from "./extendedTypes";
import { useStyles } from "./style";

export const FormWrapper: FC<FormWrapperProps> = ({
  metaData: freshMetaData,
  initialValues,
  onSubmitHandler,
  hidden = false,
  disableGroupExclude,
  disableGroupErrorDetection,
  displayMode,
  children,
}) => {
  //this line is very important to preserve our metaData across render - deep clone hack
  let metaData = JSON.parse(JSON.stringify(freshMetaData)) as MetaDataType;
  metaData = extendFieldTypes(metaData, extendedMetaData);
  metaData = attachMethodsToMetaData(metaData);
  metaData = MoveSequenceToRender(metaData);
  const groupWiseFields = renderFieldsByGroup(metaData);
  const initValues = constructInitialValue(metaData.fields, initialValues);
  const defaultArrayFieldInitValues = constructInitialValuesForArrayFields(
    metaData.fields
  );
  const yupValidationSchema = constructYupSchema(metaData.fields);
  const formName = metaData.form.name ?? "NO_NAME";
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormContext.Provider
        value={{
          formName: formName,
          resetFieldOnUnmount: Boolean(metaData.form.resetFieldOnUmnount),
          validationRun: metaData.form.validationRun,
          initialValues: initValues,
          defaultArrayFieldValues: defaultArrayFieldInitValues,
          validationSchema: yupValidationSchema,
          formState: {
            formCode: metaData.form.name,
            refID: metaData.form.refID,
            ...metaData.form?.formState,
          },
        }}
      >
        <ChildFormWrapper
          formName={formName}
          formDisplayLabel={metaData?.form?.label ?? "NO_LABEL"}
          formRenderType={metaData.form.render.renderType ?? "simple"}
          formRenderConfig={metaData.form.render}
          submitFn={onSubmitHandler}
          hidden={hidden}
          displayMode={displayMode}
          groupWiseFields={groupWiseFields}
          disableGroupExclude={disableGroupExclude}
          disableGroupErrorDetection={disableGroupErrorDetection}
          wrapperChild={children}
        />
      </FormContext.Provider>
    </MuiPickersUtilsProvider>
  );
};

const ChildFormWrapper = ({
  formName,
  formDisplayLabel,
  formRenderType,
  formRenderConfig,
  submitFn,
  hidden,
  displayMode,
  groupWiseFields,
  disableGroupExclude,
  disableGroupErrorDetection,
  wrapperChild,
}) => {
  const {
    handleSubmit,
    handleSubmitPartial,
    serverSentError,
    isSubmitting,
  } = useForm({
    onSubmit: submitFn,
    readOnly: displayMode === "view" ? true : false,
  });
  const classes = useStyles();
  return (
    <Container
      component="main"
      style={{ display: hidden ? "none" : "block", paddingTop: "16px" }}
    >
      {formRenderType === "stepper" ? (
        <Typography component="h3" className={classes.title}>
          {formDisplayLabel}
        </Typography>
      ) : (
        <AppBar position="relative" color="secondary">
          <Toolbar>
            <Typography component="div" variant="h6">
              {formDisplayLabel}
              {Boolean(displayMode) && `-${displayMode}`}
            </Typography>
            <Box flexGrow={1} />
            {typeof wrapperChild === "function"
              ? wrapperChild({ isSubmitting, handleSubmit })
              : wrapperChild}
          </Toolbar>
          {!isSubmitting && Boolean(serverSentError) ? (
            <Alert severity="error">{serverSentError}</Alert>
          ) : null}
        </AppBar>
      )}
      {formRenderType === "stepper" || formRenderType === "tabs" ? (
        <GroupedForm
          key={`${formName}-grouped`}
          fields={groupWiseFields}
          formRenderConfig={formRenderConfig}
          formName={formName}
          disableGroupErrorDetection={disableGroupErrorDetection}
          disableGroupExclude={disableGroupExclude}
          //stepper - will handleSubmit there
          handleSubmit={handleSubmit}
          handleSubmitPartial={handleSubmitPartial}
        />
      ) : formRenderType === "simple" ? (
        <SimpleForm
          key={`${formName}-simple`}
          fields={groupWiseFields}
          formRenderConfig={formRenderConfig}
          formName={formName}
        />
      ) : (
        <div>RenderType {formRenderType} not available</div>
      )}
    </Container>
  );
};
