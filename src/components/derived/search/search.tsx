import { useRef, FC } from "react";
import Input, { InputProps } from "@material-ui/core/Input";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStyles } from "./style";
import SearchIcon from "@material-ui/icons/Search";

export const SearchBar: FC<InputProps> = (props) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const inputRef = useRef(null);
  return (
    <div
      className={classes.searchRoot}
      style={{ display: desktop ? "flex" : "none" }}
    >
      <Input
        {...props}
        disableUnderline
        inputRef={inputRef}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
      <div className={classes.search}>
        <SearchIcon />
      </div>
    </div>
  );
};
