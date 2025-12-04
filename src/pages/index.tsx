import { createBrowserRouter } from "react-router-dom";
import ErrorDetail from "./ErrorDetails";
import Hub from "./Hub";
import Layout from "./Layout";
import HubUser from "./UserPanel/HubUser";
import HubAdmin from "./AdminPanel/HubAdmin";
import AdminRoute from "../AdminRoute";
import UserRoute from "./UserPanel/UserRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Hub />, errorElement: <ErrorDetail /> },
      {
        path: "adminpanel",
        element: (
          <AdminRoute>
            <HubAdmin />
          </AdminRoute>
        ),
        errorElement: <ErrorDetail />,
      },
      {
        path: "userpanel",
        element: (
          <UserRoute>
            <HubUser />
          </UserRoute>
        ),
        errorElement: <ErrorDetail />,
      },
    ],
  },
]);

export default router;
