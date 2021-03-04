import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useStyles } from "./style";

export const FilterContainer = ({
  children,
  applyFilterLabel = "Apply",
  clearFilterLabel = "Clear",
  applyFilter,
  clearFilter,
  width = 360,
  value,
}) => {
  const classes = useStyles();
  return (
    <Box style={{ width: `${width}px` }}>
      {typeof children === "function" ? children(classes) : children}
      <Box display="flex" justifyContent="flex-end" px={2} width={1}>
        <Button className={classes.applyBtn} onClick={() => applyFilter()}>
          {applyFilterLabel}
        </Button>
        <Button
          className={classes.clearBtn}
          disabled={Boolean(value) ? false : true}
          onClick={() => clearFilter()}
        >
          {clearFilterLabel}
        </Button>
      </Box>
    </Box>
  );
};
