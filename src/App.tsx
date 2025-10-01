import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hub from "./pages/Hub";
import Login from "./pages/Login";
// import { useState, type FormEvent } from "react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Hub />,
    },
    {
      path: "/formulario",
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
