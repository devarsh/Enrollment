import { FC, Fragment } from "react";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { renderValue } from "components/dyanmicForm/utils/valueRenderer";
import { FieldMetaDataType } from "components/dyanmicForm/";
import { MoveSequenceToRender } from "components/dyanmicForm/utils/fixSequenceInMetaData";
import { attachValuesToMetaData } from "components/dyanmicForm/utils/attachValuesToMetaData";
import { MetaDataType } from "components/dyanmicForm";
import { useStyles } from "./style";
export interface ArrayField2Props {
  fieldKey: string;
  name: string;
  label: string;
  //just to satisfy typescript no use
  enableGrid: boolean;
  GridProps?: GridProps;
  _fields: FieldMetaDataType[];
  componentProps?: any;
  removeRowFn?: any;
  arrayFieldIDName?: string;
}

const sortMetaData = (metaData: MetaDataType) => {
  if (Array.isArray(metaData.fields) && metaData?.fields.length > 0) {
    let sortedFields = metaData.fields.sort((prev, next) => {
      if ((prev?.render?.sequence ?? -1) > (next?.render?.sequence ?? -1)) {
        return 1;
      } else if (
        prev?.render?.sequence ??
        -1 < (next?.render?.sequence ?? -1)
      ) {
        return -1;
      }
      return 0;
    });
    return { form: metaData.form, fields: sortedFields };
  }
  return metaData;
};

export const ArrayFieldValues: FC<ArrayField2Props & { defaultValue: any }> = ({
  name,
  label,
  _fields,
  GridProps,
  enableGrid,
  defaultValue,
  componentProps = {},
}) => {
  let currentFieldsMeta = JSON.parse(
    JSON.stringify(_fields)
  ) as FieldMetaDataType[];
  const classes = useStyles();
  let metaData = { form: {}, fields: currentFieldsMeta } as MetaDataType;
  metaData = MoveSequenceToRender(metaData);
  metaData = sortMetaData(metaData);

  if (!Array.isArray(defaultValue)) {
    return <div>Invalid data for arrayField</div>;
  }
  const rows = defaultValue.map((oneRowDefaultValues, RowIndex) => {
    const metaDataWithDefaultValuesForRow = attachValuesToMetaData(
      currentFieldsMeta,
      oneRowDefaultValues
    );
    const oneRow = metaDataWithDefaultValuesForRow.map(
      (oneColumnMeta, Columnindex) => {
        const component = renderValue(
          oneColumnMeta,
          {} as any,
          name,
          componentProps
        );
        return (
          <Fragment key={`${oneColumnMeta.name}-${Columnindex}`}>
            {component}
          </Fragment>
        );
      }
    );
    return (
      <Fragment key={RowIndex}>
        <Grid
          container
          item
          xs={12}
          md={12}
          sm={12}
          spacing={2}
          className={classes.arrayRowContainer}
        >
          {oneRow}
        </Grid>
      </Fragment>
    );
  });

  let result = (
    <Fragment>
      <Card className={classes.arrayRowCard}>
        <CardHeader title={label} />
        <CardContent className={classes.arrayRowCardContent}>
          <Grid container spacing={1} xs={12} md={12} sm={12}>
            {rows}
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
  if (Boolean(enableGrid)) {
    return (
      <Grid container {...GridProps} key={name}>
        {result}
      </Grid>
    );
  } else {
    return <Fragment key={name}>{result}</Fragment>;
  }
};
