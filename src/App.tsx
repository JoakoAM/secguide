import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hub from "./pages/Hub";
import Login from "./pages/Login";
// import { useState, type FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Hub />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
