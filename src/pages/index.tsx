import { createBrowserRouter } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import ErrorDetail from "./ErrorDetails";
import Hub from "./Hub";
import Layout from "./Layout";
import UserPanel from "./UserPanel";
import HubUser from "./UserPanel/HubUser";
import HubAdmin from "./AdminPanel/HubAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: (
      <Layout>
        <ErrorDetail />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Hub />,
      },
    ],
  },
  {
    path: "/adminpanel",
    element: <AdminPanel />,
    errorElement: (
      <AdminPanel>
        <ErrorDetail />
      </AdminPanel>
    ),
    children: [
      {
        index: true,
        element: <HubAdmin />,
      },
    ],
  },
  {
    path: "/userpanel",
    element: <UserPanel />,
    errorElement: (
      <UserPanel>
        <ErrorDetail />
      </UserPanel>
    ),
    children: [
      {
        index: true,
        element: <HubUser />,
      },
    ],
  },
]);

export default router;
