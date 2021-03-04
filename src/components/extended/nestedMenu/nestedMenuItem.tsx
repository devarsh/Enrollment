import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useStyles } from "./style";

type Item = {
  id: string;
  name: string;
  children?: Item[];
};

interface NestedMenuItemProps {
  id: string;
  name: string;
  childrenItems?: Item[];
  onClick: (id: string) => void;
}

const NestedMenuItem = React.forwardRef<any, NestedMenuItemProps>(
  (
    {
      id: parentId,
      name: parentName,
      childrenItems: parentChildrenItems = [],
      onClick,
    },
    ref
  ) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isSubMenuOpen = Boolean(Boolean(anchorEl));
    const classes = useStyles({ isSubMenuOpen });
    const hasChildrenItems = parentChildrenItems?.length || false;
    const isLeafNode = !hasChildrenItems;

    const handleMouseEnter = (event: React.MouseEvent<any>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<any>) => {
      event.stopPropagation();
      if (isLeafNode) {
        onClick(parentId);
      }
    };

    return (
      <MenuItem
        ref={ref}
        disableRipple
        className={classes.menuItem}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleClose}
      >
        <div className={classes.contentContainer}>
          <span className={classes.name}>{parentName}</span>
          {hasChildrenItems && (
            <ArrowForwardIosIcon className={classes.expandIcon} />
          )}
        </div>
        {hasChildrenItems && (
          <>
            <Menu
              // "pointerEvents: none" to prevent invisible Popover wrapper div to capture mouse events
              style={{ pointerEvents: "none" }}
              anchorEl={anchorEl}
              open={isSubMenuOpen}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                elevation: 4,
              }}
            >
              {/* reset pointer event here so that the menu items could receive mouse events */}
              <div style={{ pointerEvents: "auto" }}>
                {parentChildrenItems.map((item) => {
                  const { id, name, children } = item;
                  return (
                    <NestedMenuItem
                      key={id}
                      id={id}
                      name={name}
                      childrenItems={children}
                      onClick={onClick}
                    />
                  );
                })}
              </div>
            </Menu>
          </>
        )}
      </MenuItem>
    );
  }
);

export default NestedMenuItem;
