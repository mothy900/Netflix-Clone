import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./globalStyle";
import { theme } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import Search from "./pages/Search";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Home />} path="/"></Route>
          <Route element={<Tv />} path="/tv"></Route>
          <Route element={<Search />} path="/search"></Route>
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
