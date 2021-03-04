import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  menuItem: {
    backgroundColor: ({ isSubMenuOpen }: { isSubMenuOpen: boolean }) =>
      isSubMenuOpen ? theme.palette.action.hover : "transparent",
    minWidth: "12rem",
  },
  contentContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    paddingRight: 6,
  },
  expandIcon: {
    fontSize: 12,
  },
}));
