import { Fragment, useEffect, useState, useContext } from "react";
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { GridContext } from "../../context";
import {
  filterAtom,
  filtersAtom,
  subscribeToFilterChange,
  QueryType,
} from "../../atoms";
import { subDays } from "date-fns";

const useStyles = makeStyles((theme) => ({
  filterType: {
    color: theme.palette.secondary.main,
    fontSize: "11px",
    paddingRight: "4px",
    fontWeight: 500,
    display: "inline-flex",
  },
  paper: {
    display: "inline-flex",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}));

export const DaysFilter = ({ accessor, columnName, dependencies, last }) => {
  const classes = useStyles();
  //@ts-ignore
  const { gridCode } = useContext(GridContext);

  //set indivial filter state
  const setFilterCondition = useSetRecoilState(
    filterAtom(`${gridCode}/${accessor}`)
  );
  //the last filter will set the state of all the dependent filters
  const setFiltersCondition = useSetRecoilState(filtersAtom(gridCode));
  const [toggleState, setToggleState] = useState("");
  const [condition, setCondition] = useState<QueryType | null>(null);
  const dependentFilters = useRecoilValue(
    subscribeToFilterChange({ gridCode: gridCode, accessors: dependencies })
  );
  const resetFilter = useResetRecoilState(
    filterAtom(`${gridCode}/${accessor}`)
  );
  //reset the filter when component unmounts
  useEffect(() => {
    return resetFilter;
  }, [resetFilter]);

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    setFilterCondition(condition);
    if (last) {
      if (condition !== null) {
        setFiltersCondition([...dependentFilters, condition]);
      } else {
        setFiltersCondition([...dependentFilters]);
      }
    }
  }, [condition, last, setFilterCondition, setFiltersCondition]);

  useEffect(() => {
    setCondition(null);
    if (last) {
      setFiltersCondition(dependentFilters);
    }
  }, [last, dependentFilters, setFilterCondition, setFiltersCondition]);

  return (
    <Fragment>
      <Typography className={classes.filterType}>{columnName}</Typography>
      <Paper elevation={0} className={classes.paper}>
        <ToggleButtonGroup
          size="small"
          value={toggleState}
          onChange={(event, value) => {
            setToggleState(value);
          }}
          exclusive={true}
        >
          <ToggleButton
            key={"todays"}
            value={"todays"}
            onClick={() =>
              setCondition({
                condition: "equal",
                value: new Date(),
                accessor: accessor,
              })
            }
          >
            Todays
          </ToggleButton>
          <ToggleButton
            key={"last week"}
            value={"last week"}
            onClick={() =>
              setCondition({
                condition: "between",
                value: [subDays(new Date(), 7), new Date()],
                accessor: accessor,
              })
            }
          >
            Last Week
          </ToggleButton>
          <ToggleButton
            key={"last month"}
            value={"last month"}
            onClick={() =>
              setCondition({
                condition: "between",
                value: [subDays(new Date(), 30), new Date()],
                accessor: accessor,
              })
            }
          >
            Last Month
          </ToggleButton>
          <ToggleButton
            key={"all"}
            value={"all"}
            onClick={() => setCondition(null)}
          >
            All
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </Fragment>
  );
};
