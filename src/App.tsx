import { RouterProvider } from "react-router-dom";
import router from "./pages/routes.tsx";
import GlobalStyle from "./core/styles/global.styled.ts";
import { Provider } from "react-redux";
import store from "./core/store/configureStore.ts";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";

function App() {
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ErrorBoundary >
    </>
  );
}

export default App;
