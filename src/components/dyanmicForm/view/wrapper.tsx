import { FC } from "react";
import { renderValuesByGroup } from "../utils/groupWiserenderer";
import { MoveSequenceToRender } from "../utils/fixSequenceInMetaData";
import { attachValuesToMetaData } from "../utils/attachValuesToMetaData";
import { ViewFormWrapperProps } from "./types";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { GroupedView } from "./groupedView";
import { SimpleView } from "./simpleView";
import {
  MetaDataType,
  FormMetaDataType,
  GroupWiseRenderedFieldsType,
} from "../types";
import { InitialValuesType } from "packages/form";
import { useStyles } from "../style";

const attachGroupExcludedProps = (
  groupWiseFields: GroupWiseRenderedFieldsType,
  inititalValues: InitialValuesType
) => {
  const fieldGroups = Object.keys(groupWiseFields).sort();
  //we will only loop through array and mutate the object
  /* eslint-disable array-callback-return */
  fieldGroups.map((group) => {
    const excluded = groupWiseFields[group].fieldNames.filter((one) =>
      Boolean(inititalValues[one])
    );
    groupWiseFields[group].excluded = excluded.length > 0 ? false : true;
  });
};

export const ViewFormWrapper: FC<ViewFormWrapperProps> = ({
  metaData,
  formDisplayValues,
  hidden = false,
  isSubmitting,
  onAccept,
  onReject,
  children,
}) => {
  metaData = MoveSequenceToRender(metaData);
  const transformedFields = attachValuesToMetaData(
    metaData.fields,
    formDisplayValues ?? {}
  );
  const transformedMetaData = {
    form: metaData.form,
    fields: transformedFields,
  } as MetaDataType;
  const groupWiseFields = renderValuesByGroup(transformedMetaData);
  attachGroupExcludedProps(groupWiseFields, formDisplayValues);
  const formRenderType = transformedMetaData.form.render.renderType ?? "simple";
  const classes = useStyles();

  return (
    <Container component="main" style={{ display: hidden ? "none" : "block" }}>
      <Typography component="h3" className={classes.title}>
        {metaData.form.label} View Mode
      </Typography>
      <div className={classes.form}>
        {formRenderType === "stepper" || formRenderType === "tabs" ? (
          <GroupedView
            key={`${metaData.form.name}-grouped`}
            fields={groupWiseFields}
            formRenderConfig={metaData.form.render}
            classes={classes}
          />
        ) : formRenderType === "simple" ? (
          <SimpleView
            key={`${metaData.form.name}-simple`}
            fields={groupWiseFields}
            formRenderConfig={metaData.form.render}
          />
        ) : (
          <div>RenderType {formRenderType} not available</div>
        )}
      </div>
      {typeof children === "function"
        ? children({
            classes,
            isSubmitting,
            formMetaData: transformedMetaData.form as FormMetaDataType,
            onAccept,
            onReject,
          })
        : children}
    </Container>
  );
};
