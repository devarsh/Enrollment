import { useEffect, useState, useContext } from "react";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import { FilterContainer } from "./filterContainer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ListItemIcon } from "@material-ui/core";
import { GridContext } from "../../context";

export const OptionsFilter = (props) => {
  const {
    column: {
      filterValue,
      setFilter,
      filterComponentProps: { selectType },
      id,
    },
    globalFiltersState,
    localFilterManager,
    handleClose,
    setSortBy,
    gotoPage,
  } = props;
  const context = useContext(GridContext);
  const isMultiple = selectType === "multiple" ? true : false;
  const [loading, setLoading] = useState(false);
  const [_options, setOptions] = useState(
    localFilterManager.getFilterState(id)?.options ?? []
  );
  const defaultValue = Boolean(filterValue?.value)
    ? filterValue?.value
    : isMultiple
    ? []
    : "";

  const [value, setValue] = useState<string | string[]>(defaultValue);
  /*eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (!Boolean(localFilterManager.getFilterState(id))) {
      setLoading(true);
      const verifiedGlobalFilter =
        typeof globalFiltersState === "object" && globalFiltersState !== null
          ? Object.values(globalFiltersState)
          : [];
      context
        ?.getGridColumnFilterData({
          accessor: id,
          result_type: "getGroups",
          filter_conditions: verifiedGlobalFilter,
        })
        .then((result) => {
          if (result.status === "success") {
            localFilterManager.addFilterState(id, {
              options: result.data?.groups,
            });
            setOptions(result.data?.groups ?? []);
            setLoading(false);
          } else {
            setLoading(false);
            setOptions([{ label: "Couldnt load data", value: "" }]);
          }
        });
    }
  }, [id, setLoading, setOptions]);

  const handleSingleChange = (currentValue) => () => {
    setValue([currentValue]);
  };
  const handleMultipleChange = (currentValue) => () => {
    if (Array.isArray(value)) {
      const currentIndex = value.indexOf(currentValue);
      const newChecked = [...value];

      if (currentIndex === -1) {
        newChecked.push(currentValue);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setValue(newChecked);
    } else {
      setValue([currentValue]);
    }
  };

  const applyFilter = () => {
    setFilter({
      condition: isMultiple ? "in" : "equal",
      value,
    });
    setSortBy([]);
    gotoPage(0);
    handleClose();
  };
  const clearFilter = () => {
    setFilter("");
    setSortBy([]);
    gotoPage(0);
    handleClose();
  };

  const listItems = _options.map((menuItem, index) => {
    return (
      <ListItem
        //keep button value to true else keyboard navigation for select will stop working
        button={true}
        dense={true}
        key={menuItem.value ?? index}
        onClick={
          isMultiple
            ? handleMultipleChange(menuItem.value)
            : handleSingleChange(menuItem.value)
        }
        style={{ padding: "0px" }}
      >
        <ListItemIcon>
          <Checkbox
            style={{ padding: "0px" }}
            checked={Array.isArray(value) && value.indexOf(menuItem.value) >= 0}
          />
        </ListItemIcon>
        <ListItemText>{menuItem.label}</ListItemText>
      </ListItem>
    );
  });

  return (
    <FilterContainer
      width={200}
      applyFilter={applyFilter}
      clearFilter={clearFilter}
      value={filterValue}
    >
      {(classes) => (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          mt={2}
        >
          {loading ? (
            <CircularProgress color="primary" variant="indeterminate" />
          ) : (
            <List>{listItems}</List>
          )}
        </Box>
      )}
    </FilterContainer>
  );
};
