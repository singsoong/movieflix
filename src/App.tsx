import React from "react";
import { styled } from "styled-components";
import Router from "./Router";
import Globalstyle from "./styles/Globalstyle";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";

const client = new QueryClient();

function App() {
  return (
    <Container>
      <HelmetProvider>
        <QueryClientProvider client={client}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Globalstyle />
          <Router />
        </QueryClientProvider>
      </HelmetProvider>
    </Container>
  );
}

export default App;

const Container = styled.div``;
