import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./contexts/AuthContext";
import { OpenProvider } from "./contexts/OpenContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000, // 5  min
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      structuralSharing: true,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <ChakraProvider value={defaultSystem}>
    <QueryClientProvider client={queryClient}>
      <OpenProvider>
        <AuthProvider>
          <ReactQueryDevtools />
          <RouterProvider router={router} />
        </AuthProvider>
      </OpenProvider>
    </QueryClientProvider>
  </ChakraProvider>
);
