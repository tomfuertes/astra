import { ThemeProvider } from "@mui/material";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { socket, SocketProvider } from "./context/socket";
import { theme } from "./context/theme";
import Dashboard from "./pages/Dashboard";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Watchlist from "./pages/Watchlist";
axios.defaults.baseURL = "http://localhost:5001";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SocketProvider value={socket}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </SocketProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
