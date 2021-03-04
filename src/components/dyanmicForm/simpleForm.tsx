import { FC, useRef, Suspense } from "react";

import Grid from "@material-ui/core/Grid";
import { FormProps } from "./types";
import Container from "@material-ui/core/Container";

export const SimpleForm: FC<FormProps> = ({ fields, formRenderConfig }) => {
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
    <Container maxWidth="lg" style={{ background: "white" }}>
      <br />
      <br />
      <div style={{ height: "65vh", overflowY: "auto", overflowX: "hidden" }}>
        <Grid
          container={true}
          spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
          direction={
            formRenderConfig?.gridConfig?.container?.direction ?? "row"
          }
        >
          <Suspense fallback={<div>Loading...</div>}>{FormComponent}</Suspense>
        </Grid>
      </div>
    </Container>
  );
};
