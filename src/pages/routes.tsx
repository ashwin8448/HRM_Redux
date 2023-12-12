import { createBrowserRouter } from "react-router-dom";


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
      errorElement: <></>,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM-App-React/" }
);

export default router;
