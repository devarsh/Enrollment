import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import { theme } from "./theme";
import IndexPage from "pages_enrollment";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "cache";

const themeObj = createMuiTheme(theme);

export const App = () => {
  return (
    <ThemeProvider theme={themeObj}>
      <QueryClientProvider client={queryClient}>
        <IndexPage />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
