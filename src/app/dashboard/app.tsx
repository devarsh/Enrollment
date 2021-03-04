import { Fragment } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SnackbarProvider } from "notistack";
import { queryClient } from "cache";
import "components/tableCellComponents";
import IndexPage from "pages_dashboard";
import { theme } from "./theme";
import "./index.css";

const themeObj = createMuiTheme(theme);

export const App = () => {
  return (
    <Fragment>
      <ThemeProvider theme={themeObj}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
            <IndexPage />
            <ReactQueryDevtools />
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Fragment>
  );
};
