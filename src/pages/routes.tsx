import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";

const router = createBrowserRouter(
  [
    {
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: <></>,
        },
      ],
      errorElement: <></>,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM-App-React/" }
);

export default router;
