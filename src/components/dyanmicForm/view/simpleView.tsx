import { FC, Suspense, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import { FormProps } from "./types";
import Divider from "@material-ui/core/Divider";

export const SimpleView: FC<FormProps> = ({ fields, formRenderConfig }) => {
  const fieldGroups = useRef<string[]>(Object.keys(fields).sort());
  const formComponentGroupWise = fieldGroups.current.map((one) => {
    const current = fields[one];
    return current.fields;
  });
  const FormComponent = formComponentGroupWise.reduce((one, accum) => {
    const newAccum = [...accum, ...one];
    return newAccum;
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Divider />
      <Grid
        container={true}
        spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
        direction={formRenderConfig?.gridConfig?.container?.direction ?? "row"}
      >
        {FormComponent}
      </Grid>
    </Suspense>
  );
};
