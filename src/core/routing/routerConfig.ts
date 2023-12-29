import privateRoute from "./privateRouters";
import { publicRoute } from "./publicRoutes";

const routerConfig = {
  private: privateRoute,
  public: publicRoute,
  defaultRedirect: "/sign-in",
};

export default routerConfig;
