import { useState, useRef, MouseEvent } from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useDrag, useDrop } from "react-dnd";

export const DefaultHeaderColumnRenderer = ({
  column,
  visibleColumns,
  setColumnOrder,
  allowColumnReordering,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? column.id : undefined;
  //Column change order using drag and drop
  const [{ isDragging }, drag] = useDrag({
    item: { type: "Column" },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    end: (_, monitor) => {
      if (monitor.didDrop()) {
        const { id } = monitor.getDropResult();
        const columns = visibleColumns.map((one) => one.id);
        const toIndex = columns.indexOf(id);
        const fromIndex = columns.indexOf(column.id);
        var b = columns[toIndex];
        columns[toIndex] = columns[fromIndex];
        columns[fromIndex] = b;
        setColumnOrder(columns);
      }
    },
    canDrag: () => {
      return allowColumnReordering;
    },
  });
  const [{ isOver }, drop] = useDrop({
    accept: "Column",
    drop: () => ({ id: column.id }),
    collect: (monitor) => ({
      isOver: allowColumnReordering && !!monitor.isOver(),
    }),
    canDrop: () => {
      return allowColumnReordering;
    },
  });
  const dragDropRef = useRef(null);
  drag(drop(dragDropRef));
  return (
    <>
      <TableSortLabel
        active={column.isSorted}
        direction={column.isSortedDesc ? "desc" : "asc"}
        hideSortIcon={true}
        ref={dragDropRef}
        {...column.getSortByToggleProps([
          {
            style: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
              color: "#0063a3",
              fontSize: "1 rem",
              fontWeight: "600",
              paddingRight:
                //@ts-ignore
                (column?.TableCellProps?.align ?? "left") === "right" &&
                column.canFilter
                  ? "15px"
                  : "10px",
              opacity: isDragging || isOver ? 0.5 : 1,
              cursor: isDragging ? "move" : "default",
            },
          },
        ])}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            paddingRight: "10px",
          }}
        >
          {column.columnName}
        </span>
      </TableSortLabel>
      {column.canFilter ? (
        <IconButton
          aria-label="filter"
          aria-controls="popover"
          aria-haspopup="true"
          style={{
            position: "absolute",
            right: "15px",
            padding: "0",
            color: open || Boolean(column.filterValue) ? "red" : "inherit",
          }}
          onClick={handleClick}
        >
          <FilterListIcon />
        </IconButton>
      ) : null}
      <div
        {...column.getResizerProps([
          {
            style: {
              display: "inline-block",
              position: "absolute",
              right: "-5px",
              top: "0",
              padding: "0 5px",
              zIndex: 1,
            },
          },
        ])}
      >
        <div
          style={{
            height: "35px",
            width: "6px",
            backgroundColor: "#888",
          }}
        ></div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {column.render("Filter", { handleClose })}
      </Popover>
    </>
  );
};
