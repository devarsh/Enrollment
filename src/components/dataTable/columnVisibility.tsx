import React from "react";
import MenuList from "@material-ui/core/MenuList";
import { StyledMenuItem } from "./styledComponents";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";

const ITEM_HEIGHT = 48;

export const ColumnVisibility = ({ visibleColumns, defaultHiddenColumns }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = visibleColumns.reduce((accum, column) => {
    const { checked, style, onChange } = column.getToggleHiddenProps();
    if (defaultHiddenColumns.indexOf(column.id) === -1) {
      accum.push(
        <StyledMenuItem dense={true} key={column.id} onChange={onChange}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={onChange}
                name={column.id}
                color="primary"
              />
            }
            label={column.columnName}
            style={style}
          />
        </StyledMenuItem>
      );
    }
    return accum;
  }, []);

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={"columnVisibility"}
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
        <Paper
          style={{
            maxHeight: ITEM_HEIGHT * 4.5,
            overflow: "scroll",
          }}
        >
          <MenuList dense={true}>{menuItems}</MenuList>
        </Paper>
      </Popover>
    </div>
  );
};
