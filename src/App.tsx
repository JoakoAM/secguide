import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hub from "./pages/Hub";
import Login from "./pages/Login";
// import { useState, type FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import { useState, type FormEvent } from "react";
import { login, register } from "./components/firebase";

function App() {
  const [IsAdmin, setAdmin] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = e.target as HTMLFormElement;
    const isAdmin = await login(email, password);
    isAdmin ? setAdmin(isAdmin) : setAdmin(false);
  };
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password, name } = e.target as HTMLFormElement;
    const success = await register(email, password, name);
    success ? setSuccess(success) : setError(success);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Hub />,
    },
    {
      path: "/login",
      element: <Login onSubmit={handleLogin} />,
    },
    {
      path: "/register",
      element: (
        <Register error={error} onSubmit={handleRegister} success={success} />
      ),
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
