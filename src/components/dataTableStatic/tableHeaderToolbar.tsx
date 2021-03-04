import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalFilter } from "./components/filters";
import { RenderActions } from "components/dataTable/tableActionToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    flex: "1 1 100%",
    color: theme.palette.primary.main,
    letterSpacing: "1px",
    fontSize: "2rem",
  },
}));

export const TableHeaderToolbar = ({
  dense,
  label,
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  alwaysAvailableAction,
  setGridAction,
  selectedFlatRows,
  disableGlobalFilter,
}) => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.root} variant={dense ? "dense" : "regular"}>
      <Typography
        className={classes.title}
        color="inherit"
        variant={"h6"}
        component="div"
      >
        {label}
      </Typography>
      {disableGlobalFilter ? null : (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
      <RenderActions
        key="alwaysRender"
        selectedRows={selectedFlatRows}
        setAction={setGridAction}
        actions={alwaysAvailableAction ?? []}
      />
    </Toolbar>
  );
};
