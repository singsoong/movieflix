import React from "react";
import { styled } from "styled-components";
import Router from "./Router";
import Globalstyle from "./styles/Globalstyle";

function App() {
  return (
    <Container>
      <Globalstyle />
      <Router />
    </Container>
  );
}

export default App;

const Container = styled.div``;
