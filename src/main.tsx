import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";

import App from "./App";

import { queryClient } from "@/shared/api/query-client";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
