import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../components/ErrorPage/ErrorPage.tsx";

const router = createBrowserRouter(
  [
    {
      element: <></>,
      children: [
        {
          path: "/",
          element: <></>,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM-App-React/" }
);

export default router;
