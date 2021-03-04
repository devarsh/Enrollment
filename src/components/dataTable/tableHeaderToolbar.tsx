import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { ColumnVisibility } from "./columnVisibility";
import { RenderActions } from "./tableActionToolbar";

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
  visibleColumns,
  defaultHiddenColumns,
  allowColumnHiding,
  setGridRefresh,
  setGridAction,
  selectedFlatRows,
  alwaysAvailableAction,
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
      <RenderActions
        key="multipleFilters"
        actions={alwaysAvailableAction ?? []}
        setAction={setGridAction}
        selectedRows={selectedFlatRows}
      />
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={() => setGridRefresh(true)}
      >
        <RefreshIcon />
      </IconButton>

      {allowColumnHiding ? (
        <ColumnVisibility
          visibleColumns={visibleColumns}
          defaultHiddenColumns={defaultHiddenColumns}
        />
      ) : null}
    </Toolbar>
  );
};
