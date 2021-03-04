import { FC } from "react";
import Grid, { GridProps } from "@material-ui/core/Grid";

interface MyGridExtendedProps {
  GridProps?: GridProps;
  enableGrid: boolean;
  defaultValue: any;
  name: string;
  label: string;
}

const MyValueField: FC<MyGridExtendedProps> = (props) => {
  let { defaultValue, label, enableGrid, GridProps } = props;
  if (typeof defaultValue === "object") {
    if (Array.isArray(defaultValue)) {
      defaultValue = defaultValue.join(",");
    } else {
      defaultValue = defaultValue?.toDateString?.() ?? "Invalid Value";
    }
  }
  if (typeof defaultValue === "boolean") {
    defaultValue = defaultValue ? "Yes" : "No";
  }

  let result = (
    <div>
      <b>{label}</b>
      <br />
      {defaultValue}
    </div>
  );
  if (Boolean(enableGrid)) {
    return <Grid {...GridProps}>{result}</Grid>;
  } else {
    return result;
  }
};

export default MyValueField;
