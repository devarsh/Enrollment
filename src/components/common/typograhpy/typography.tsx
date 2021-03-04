import { FC, Fragment } from "react";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

export interface AllTypographyProps {
  TypographyProps?: TypographyProps;
  GridProps?: GridProps;
  name: string;
  label: string;
}

const MyTypography: FC<AllTypographyProps> = ({
  name,
  TypographyProps,
  GridProps,
  label,
}) => {
  return (
    <Fragment key={name}>
      <Grid {...GridProps}>
        <Typography {...TypographyProps}>{label}</Typography>
      </Grid>
    </Fragment>
  );
};

export default MyTypography;
