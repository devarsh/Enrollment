import { useState } from "react";

import { useAsyncDebounce } from "react-table";
import { SearchBar } from "components/derived";

export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(
    (value) => setGlobalFilter(value || undefined),
    200
  );

  return (
    <SearchBar
      type="text"
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`search in ${count} records`}
    />
  );
};
