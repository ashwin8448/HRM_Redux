import { RouterProvider } from "react-router-dom";
import router from "./pages/routes.tsx";
import GlobalStyle from "./core/styles/global.styled.ts";

function App() {
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary>
          <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
}

export default App;
