export const CurrencyRowCellRenderer = (props) => {
  const { value } = props;
  const renderStyle = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "INR",
  });
  return (
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {renderStyle.format(value)}
    </span>
  );
};
