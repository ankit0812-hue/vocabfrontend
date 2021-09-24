import Home from "./components/Home";
import { ThemeProvider } from "@mui/material/styles";
import store from "./container/store";
import { Provider } from "react-redux";
import theme from "./Theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Home />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
