import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import UserFormProvider from "./providers/UserFormProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <QueryClientProvider client={queryClient}>
        <UserFormProvider>
          <RouterProvider router={router} />
        </UserFormProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>
);
