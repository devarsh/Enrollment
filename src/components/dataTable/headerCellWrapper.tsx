import TableCell from "@material-ui/core/TableCell";

export const HeaderCellWrapper = ({ column, children }) => {
  const stickyHeaderCell =
    column.sticky === true
      ? {
          position: "sticky",
          background: "white",
          left: column.totalLeft,
          zIndex: 12,
        }
      : {};
  return (
    <TableCell
      component="div"
      variant="head"
      {...column.TableCellProps}
      {...column.getHeaderProps([
        {
          style: {
            position: "relative",
            display: "flex",
            overflow: "hidden",
            ...stickyHeaderCell,
          },
        },
      ])}
    >
      {children}
    </TableCell>
  );
};
