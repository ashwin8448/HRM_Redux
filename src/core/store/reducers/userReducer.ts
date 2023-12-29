const initialState = {
  isAuthenticated: false,
  userName: "",
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, userName: action.payload };
    case "LOGOUT":
      return { isAuthenticated: false, userName: "" };
    default:
      return state;
  }
};

export default userReducer;
