import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import NestedMenuItem from "./nestedMenuItem";

const menuItems = [
  {
    id: "1",
    name: "Item 1",
    children: [
      {
        id: "2",
        name: "Item 1.1",
      },
      {
        id: "3",
        name: "Item 1.2",
        children: [
          {
            id: "4",
            name: "Item 1.2.1",
          },
          {
            id: "5",
            name: "Item 1.2.2",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Item 2",
    children: [
      {
        id: "7",
        name: "Item 2.1",
      },
      {
        id: "8",
        name: "Item 2.2",
      },
      {
        id: "9",
        name: "Item 2.3",
      },
    ],
  },
  {
    id: "10",
    name: "Item 3",
  },
];

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMouseEnter = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (id: string) => {
    setAnchorEl(null);
    console.log(id);
  };

  return (
    <>
      <IconButton onMouseEnter={handleMouseEnter}>
        <MenuRoundedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        MenuListProps={{
          onMouseLeave: handleClose,
        }}
        PaperProps={{
          elevation: 4,
        }}
      >
        {menuItems.map((item: any) => {
          const { id, name, children } = item;
          return (
            <NestedMenuItem
              key={id}
              id={id}
              name={name}
              childrenItems={children}
              onClick={handleItemClick}
            />
          );
        })}
      </Menu>
    </>
  );
};

export default App;
