import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
const generateTestQueryClient = () => {
  const client = new QueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

export const renderWithQueryProvider = (
  ui: React.ReactElement,
  client?: QueryClient
): RenderResult => {
  const queryClient = client ? client : generateTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};
