import { RouterProvider } from "react-router-dom";
import router from "./pages/routes.tsx";
import GlobalStyle from "./core/styles/global.styled.ts";
import { Provider } from "react-redux";
import store from "./core/store/configureStore.ts";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        closeOnClick
        pauseOnFocusLoss={false} // avoid pausing when the window looses the focus
      />
    </>
  );
}

export default App;
