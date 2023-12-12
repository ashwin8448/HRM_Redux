import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import router from "./pages/routes.tsx";

function App() {
  return (
    <>
      <ErrorBoundary>
          <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
}

export default App;
