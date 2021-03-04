import { Theme } from "@material-ui/core/styles";

export const theme: Theme = {
  palette: {
    //@ts-ignore
    primary: {
      main: "#0063a3",
    },
    //@ts-ignore
    secondary: {
      main: "#26A456",
    },
  },

  overrides: {
    MuiInputBase: {
      root: {
        border: "1px solid #BABABA",
        marginTop: "26px",
        borderRadius: 5,
        backgroundColor: "#fff",
        "@media (max-width: 1200px)": {
          fontSize: "0.875rem",
        },
      },
      input: {
        padding: "6px  7px",
        height: "22px",
        "&::placeholder": {
          color: "#000",
          fontSize: "0.875rem",
        },
        "@media (max-width: 1200px)": {
          height: "18px",
        },
      },
      inputMultiline: {
        padding: "6px  7px",
      },
    },

    MuiInput: {
      formControl: {
        marginTop: "26px !important",
        "@media (max-width: 1200px)": {
          marginTop: "18px !important",
        },
      },
      underline: {
        "&:before": {
          borderBottom: "0",
        },
        "&:after": {
          borderBottom: "2px solid #3f51b5",
          transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        },
        "&:hover": {
          "&:before": {
            borderBottom: "0 !important",
          },
        },
      },
    },

    MuiInputLabel: {
      formControl: {
        color: "#736f6f",
        fontWeight: 600,
        textTransform: "capitalize",
        fontSize: "1rem",
        "@media (max-width: 1200px)": {
          fontSize: "0.75rem",
        },
        "@media (max-width: 1440px)": {
          fontSize: "0.875rem",
        },
      },
      shrink: {
        transform: "translate(0, 1.5px) scale(1)",
      },
    },

    MuiInputAdornment: {
      positionStart: {
        borderRight: "1px solid #BABABA !important",
        height: "36px",
        maxHeight: "36px",
        padding: "0 1rem",
      },
    },

    MuiSelect: {
      selectMenu: {
        minHeight: "22px",
        lineHeight: "22px",
        "@media (max-width: 1200px)": {
          minHeight: "18px",
          lineHeight: "18px",
        },
      },
    },

    MuiPickersToolbarButton: {
      toolbarBtn: {
        background: "none",
        "&:hover": {
          background: "none",
        },
      },
    },

    MuiDialogActions: {
      //@ts-ignore
      MuiButton: {
        text: {
          backgroundColor: "red !important",
          background: "red !important",
        },
      },
    },

    MuiStepper: {
      root: {
        padding: "0",
      },
    },
    MuiStepIcon: {
      active: {
        color: "#26A456 !important",
      },
    },

    MuiFormHelperText: {
      root: {
        color: "#26A456",
      },
    },
    MuiFormLabel: {
      root: {
        fontWeight: 600,
      },
    },

    MuiPopover: {
      paper: {
        boxShadow: "0 3px 6px rgba(0,0,0,0.5)",
        border: "1px solid rgba(0,0,0,0.3)",
      },
    },

    MuiBadge: {
      badge: {
        backgroundColor: "#da2121 !important",
      },
    },
    MUIDataTableToolbar: {
      titleText: {
        fontWeight: "700",
        color: "#26A456",
        letterSpacing: "1px",
      },
    },
    MUIDataTable: {
      liveAnnounce: {
        position: "unset ",
      },
      responsiveBase: {
        maxHeight: "calc(100vh - 272px)",
      },
    },
    MuiTablePagination: {
      input: {
        marginTop: "0px",
      },
    },
    MuiTypography: {
      body1: {
        fontFamily: '"Montserrat", Helvetica, Arial, Lucida, sans-serif',
      },
    },
  },
};
