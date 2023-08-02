import React from "react";
import logo from "./logo.svg";
import { styled } from "styled-components";
import Router from "./Router";
import Globalstyle from "./styles/Globalstyle";

function App() {
  return (
    <>
      <Globalstyle />
      <Router />
    </>
  );
}

export default App;

const Container = styled.div``;
