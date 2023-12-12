import { RouterProvider } from "react-router-dom";
import router from "./pages/routes.tsx";
import DataProvider from "./core/store/DataProvider.tsx";
import GlobalStyle from "./core/styles/global.styled.ts";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";

function App() {
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
