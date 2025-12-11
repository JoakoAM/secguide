import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { OpenProvider } from "./contexts/OpenContext";
import "./index.css";
import router from "./pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 60 * 1000,
      gcTime: 60 * 1000,
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
