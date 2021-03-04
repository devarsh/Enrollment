import { useState } from "react";
import Box from "@material-ui/core/Box";
import { useStyles } from "./style";
import { StyledTextField, StyledMenuItem } from "../../styledComponents";
import { FilterContainer } from "./filterContainer";

export const ValueFilter = (props) => {
  const {
    column: { filterValue, setFilter },
    handleClose,
    setSortBy,
    gotoPage,
  } = props;

  const options = [
    { label: "starts with", value: "startsWith" },
    { label: "ends with", value: "endsWith" },
    { label: "equal", value: "equal" },
    { label: "contains", value: "contains" },
  ];
  const [text, setText] = useState(filterValue?.value ?? "");
  const [searchCriteria, setSearchCriteria] = useState(
    filterValue?.condition ?? ""
  );
  const setFilterValue = () => {
    setFilter({
      condition: searchCriteria,
      value: text,
    });
    setSortBy([]);
    gotoPage(0);
    handleClose();
  };
  const clearFilterValue = () => {
    setFilter("");
    setSortBy([]);
    gotoPage(0);
    handleClose();
  };

  const optionValues = options.map((one) => (
    <StyledMenuItem key={one.value} dense={true} value={one.value}>
      {one.label}
    </StyledMenuItem>
  ));
  const classes = useStyles();
  return (
    <FilterContainer
      value={text}
      applyFilter={setFilterValue}
      clearFilter={clearFilterValue}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        px={2}
        width={1}
        mt={2}
      >
        <Box width="32%">
          <StyledTextField
            select
            placeholder="Select"
            fullWidth
            value={searchCriteria}
            className={classes.adornmentSelect}
            onChange={(e) => {
              setSearchCriteria(e.target.value);
            }}
          >
            {optionValues}
          </StyledTextField>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          width="68%"
          position="relative"
        >
          <StyledTextField
            fullWidth
            value={text || ""}
            placeholder="Search"
            className={classes.searchField}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Box>
      </Box>
    </FilterContainer>
  );
};
