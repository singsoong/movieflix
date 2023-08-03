import React from "react";
import { styled } from "styled-components";
import Router from "./Router";
import Globalstyle from "./styles/Globalstyle";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

function App() {
  return (
    <Container>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Globalstyle />
        <Router />
      </QueryClientProvider>
    </Container>
  );
}

export default App;

const Container = styled.div``;
