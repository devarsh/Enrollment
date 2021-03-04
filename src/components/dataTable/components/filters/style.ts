import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  searchIcon: {
    padding: "6px",
  },
  searchWrap: {
    position: "absolute",
    right: "8px",
  },
  applyBtn: {
    margin: theme.spacing(2, 1, 2, 0),
    fontSize: "0.875rem",
    background:
      "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
    border: 0,
    color: "#fff ",
    padding: "4px .75rem",
    fontWeight: 500,
    minWidth: "80px",
    letterSpacing: "1px",
    boxShadow: "none",
    textTransform: "capitalize",
    alignSelf: "flex-end",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(94,231,131,1) 0%, rgba(74,204,160,1) 35%, rgba(33,150,218,1) 100%)",
      boxShadow: "none",
    },
  },
  clearBtn: {
    margin: theme.spacing(2, 0, 2),
    fontSize: "0.875rem",
    background: "#ccc",
    border: 0,
    color: "#393939",
    padding: "4px .75rem",
    fontWeight: 500,
    minWidth: "80px",
    letterSpacing: "1px",
    boxShadow: "none",
    textTransform: "capitalize",
    alignSelf: "flex-end",
    "&:hover": {
      background: "#ddd",
      boxShadow: "none",
    },
  },
  multipleSelect: {
    marginTop: "0 !important",
    "&:after": {
      borderBottom: "2px solid #26A456",
    },
  },
  datePicker: {
    "& .MuiInput-underline": {
      "&:after": {
        borderBottom: "2px solid #26A456",
      },
    },
    "& .MuiInput-formControl": {
      marginTop: "0 !important",
    },
    "& input": {
      height: 18,
      fontSize: 12,
    },
  },
  adornmentSelect: {
    "& .MuiInputBase-root": {
      borderRight: "0 !important",
      borderTopRightRadius: "0 !important",
      borderBottomRightRadius: "0 !important",
    },
  },
  searchField: {
    "& .MuiInputBase-root": {
      borderTopLeftRadius: "0 !important",
      borderBottomLeftRadius: "0 !important",
    },
  },
}));
