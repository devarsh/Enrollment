import { FC, useEffect } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import { GridProps } from "@material-ui/core/Grid";

interface MyGridExtendedProps {
  GridProps?: GridProps;
  enableGrid: boolean;
}

export type MyHiddenFieldProps = UseFieldHookProps & MyGridExtendedProps;

const MyHiddenField: FC<MyHiddenFieldProps> = ({
  name: fieldName,
  fieldKey: fieldID,
}) => {
  const { handleBlur } = useField({
    name: fieldName,
    fieldKey: fieldID,
  });
  //set touch property to true of the field
  useEffect(() => {
    handleBlur();
  }, [handleBlur]);

  return null;
};

export default MyHiddenField;
