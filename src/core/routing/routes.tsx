import { createBrowserRouter } from "react-router-dom";
import Layout from "../../pages/Layout.tsx";
import routerConfig from "./routerConfig.ts";
import RequireAuth from "./RequireAuth.tsx";

const router = createBrowserRouter(
  [
    {
      element: <Layout></Layout>,
      children: [
        ...routerConfig.public.map((route) => ({
          path: route.path,
          element: <route.element />,
        })),
        ...routerConfig.private.map((route) => ({
          path: route.path,
          element: (
            <RequireAuth>
              <route.element />
            </RequireAuth>
          ),
        })),
      ],
      errorElement: <></>,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM_Redux/" }
);

export default router;
