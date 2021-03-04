import { format } from "date-fns";

export const DateRowCellRenderer = (props) => {
  const {
    value,
    column: { dateFormat = "dd/MM/yyyy hh:mm aaa" },
  } = props;
  if (!Boolean(value)) {
    return null;
  }
  const date = new Date(value);
  return (
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {format(date, dateFormat)}
    </span>
  );
};
