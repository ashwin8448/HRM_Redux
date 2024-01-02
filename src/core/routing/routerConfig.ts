import privateRoute from "./privateRouters";
import { publicRoute } from "./publicRoutes";

const routerConfig = {
  private: privateRoute,
  public: publicRoute,
  defaultRedirect: "/login",
};

export default routerConfig;
