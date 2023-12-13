import { RouterProvider } from "react-router-dom";
import router from "./pages/routes.tsx";
import GlobalStyle from "./core/styles/global.styled.ts";
import { Provider } from "react-redux";
import store from "./core/store/configureStore.ts";

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
