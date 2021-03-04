import { FC, Fragment } from "react";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Hidden, { HiddenProps } from "@material-ui/core/Hidden";

export interface SpacerProps {
  HiddenProps?: HiddenProps;
  GridProps?: GridProps;
  name: string;
}

const Spacer: FC<SpacerProps> = ({ name, HiddenProps, GridProps }) => {
  return (
    <Fragment key={name}>
      <Hidden {...HiddenProps}>
        <Grid item={true} {...GridProps} />
      </Hidden>
    </Fragment>
  );
};

export default Spacer;
