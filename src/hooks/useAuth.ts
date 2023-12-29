import { useSelector } from "react-redux";
import { IData } from "../core/interfaces/interface";
import store from "../core/store/configureStore";
import { setLogout } from "../core/store/actions";

const useAuth = () => {
  const isAuthenticated = useSelector(
    (state: IData) => state.userData.isAuthenticated
  );
  const login = async (userCredentials: { username: string; password: string }) => {
    // const response  = await 
  };
  
  const logout = () => {
    store.dispatch(setLogout());
  };
  return { login, logout, isAuthenticated };
};

export default useAuth;
