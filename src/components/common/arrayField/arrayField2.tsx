import {
  FC,
  cloneElement,
  Fragment,
  useRef,
  useState,
  useCallback,
} from "react";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { renderField } from "components/dyanmicForm/utils/fieldRenderer";
import { FieldMetaDataType } from "components/dyanmicForm/";
import { useFieldArray } from "packages/form";
import { extendFieldTypes } from "components/dyanmicForm/utils/extendedFieldTypes";
import { extendedMetaData } from "components/dyanmicForm/extendedTypes";
import { attachMethodsToMetaData } from "components/dyanmicForm/utils/attachMethodsToMetaData";
import { MoveSequenceToRender } from "components/dyanmicForm/utils/fixSequenceInMetaData";
import { MetaDataType } from "components/dyanmicForm";
import { useStyles } from "./style";
import { useRecoilCallback } from "recoil";
import { formFieldAtom } from "packages/form";
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

const metaDataTransform = (metaData: MetaDataType): MetaDataType => {
  metaData = extendFieldTypes(metaData, extendedMetaData);
  metaData = attachMethodsToMetaData(metaData);
  metaData = MoveSequenceToRender(metaData);
  return metaData;
};

export const ArrayField2: FC<ArrayField2Props> = ({
  name,
  label,
  _fields,
  GridProps,
  enableGrid,
  componentProps = {},
  removeRowFn,
  arrayFieldIDName,
}) => {
  let currentFieldsMeta = JSON.parse(
    JSON.stringify(_fields)
  ) as FieldMetaDataType[];
  const classes = useStyles();
  let metaData = { form: {}, fields: currentFieldsMeta } as MetaDataType;
  const transformedMetaData = useRef<MetaDataType | null>(null);
  if (transformedMetaData.current === null) {
    transformedMetaData.current = metaDataTransform(metaData);
  }
  const template = useRef(
    transformedMetaData?.current?.fields?.reduce((accum, one) => {
      accum[one.name] = "";
      return accum;
    }, {})
  );

  const currentMetaToObj = useRef(
    transformedMetaData?.current?.fields?.reduce((accum, one) => {
      accum[one.name] = one;
      return accum;
    }, {})
  );

  const {
    renderRows,
    unshift,
    isSubmitting,
    formState,
    formName,
  } = useFieldArray({
    arrayFieldName: name,
    template: template.current,
  });

  let rows = renderRows(({ row, removeFn, rowIndex, fields, totalRows }) => {
    const oneRow = fields.map((field) => {
      const currentFieldMetaData = currentMetaToObj.current[field];
      if (!Boolean(currentFieldMetaData)) {
        return null;
      }
      const component = renderField(
        currentFieldMetaData,
        //@ts-ignore
        {},
        name,
        componentProps
      );
      const clonedComponent = cloneElement(component, {
        fieldKey: row.cells[field].key,
        name: row.cells[field].name,
      });
      return <Fragment key={row.cells[field].key}>{clonedComponent}</Fragment>;
    });
    return (
      <ArrayFieldRow
        key={row.fieldIndexKey}
        fieldKey={row.cells[arrayFieldIDName ?? ""]?.key ?? ""}
        oneRow={oneRow}
        classes={classes}
        removeFn={removeFn}
        rowIndex={rowIndex}
        removeRowFn={removeRowFn}
        row={row}
        totalRows={totalRows}
        isSubmitting={isSubmitting}
        formState={formState}
        formName={formName}
        arrayFieldIDName={arrayFieldIDName}
        arrayFieldName={name}
      />
    );
  });
  let result = (
    <Fragment>
      <Card className={classes.arrayRowCard}>
        <CardHeader
          title={label}
          action={
            <IconButton onClick={unshift} disabled={isSubmitting}>
              <AddCircleOutlineIcon />
            </IconButton>
          }
        />
        <CardContent className={classes.arrayRowCardContent}>
          <Grid container spacing={1} xs={12} md={12} sm={12}>
            {rows}
            {rows.length <= 0 ? (
              <Typography>
                No Records Found, click the add button to add one
              </Typography>
            ) : null}
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

export const ArrayFieldRow = ({
  row,
  fieldKey,
  oneRow,
  classes,
  removeFn,
  rowIndex,
  removeRowFn,
  totalRows,
  isSubmitting,
  formState,
  formName,
  arrayFieldIDName,
  arrayFieldName,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dialogAccept = useRecoilCallback(
    ({ snapshot }) => async () => {
      const loader = snapshot.getLoadable(
        formFieldAtom(`${formName}/${fieldKey}`)
      );
      if (loader.state === "hasValue") {
        const field = loader.contents;
        if (Boolean(field.value)) {
          try {
            setLoading(true);
            await Promise.resolve(
              removeRowFn(
                { ...formState, [arrayFieldIDName]: field.value },
                arrayFieldName
              )
            );
            setLoading(false);
            setError("");
            setSuccess(true);
          } catch (e) {
            console.log(e);
            setLoading(false);
            setError(e?.error_msg ?? "Unkown error occured");
          }
        } else {
          setSuccess(true);
        }
      }
    },
    [setError, setSuccess, setLoading]
  );
  const dialogReject = useCallback(() => {
    if (success) {
      removeFn(rowIndex);
    } else {
      setIsDialogOpen(false);
      setTimeout(() => {
        setLoading(false);
        setError("");
        setSuccess(false);
      }, 1);
    }
  }, [
    setIsDialogOpen,
    setLoading,
    setError,
    setSuccess,
    success,
    removeFn,
    rowIndex,
  ]);
  const dialogOpen = useCallback(() => {
    setIsDialogOpen(true);
  }, [setIsDialogOpen]);

  return (
    <Fragment key={row.fieldIndexKey}>
      <Typography gutterBottom>
        {rowIndex + 1} of {totalRows}
      </Typography>
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
        {typeof removeFn === "function" ? (
          <IconButton
            onClick={dialogOpen}
            className={classes.arrayRowRemoveBtn}
            disabled={isSubmitting}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        ) : null}
      </Grid>
      <Dialog
        open={isDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {success
            ? "Record successfully deleted"
            : loading
            ? "Please wait deleting record"
            : Boolean(error)
            ? error
            : "Are you Sure you want to delete this record?"}
        </DialogTitle>
        {success || error ? (
          <DialogActions>
            <Button onClick={dialogReject} color="primary">
              Ok
            </Button>
          </DialogActions>
        ) : loading ? null : (
          <DialogActions>
            <Button onClick={dialogReject} color="primary">
              Disagree
            </Button>
            <Button onClick={dialogAccept} color="primary">
              Agree
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Fragment>
  );
};
