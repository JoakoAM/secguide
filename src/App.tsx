import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hub from "./pages/Hub";
import Login from "./pages/Login";
// import { useState, type FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import { useState, type FormEvent } from "react";
import { login } from "./components/firebase";

function App() {
  const [IsAdmin, setAdmin] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = e.target as HTMLFormElement;
    const isAdmin = await (login(email, password))
    isAdmin ? setAdmin(isAdmin) : setAdmin(false); //seguir mañana
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Hub />,
    },
    {
      path: "/login",
      element: <Login onSubmit={onSubmit} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/adminpanel",
      element: <AdminPanel isAdmin={IsAdmin} />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
