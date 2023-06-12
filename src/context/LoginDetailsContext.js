import { createContext, useContext, useReducer } from "react";

const LoginContext = createContext();

const LoginReducer = (state, action) => {
  switch (action.type) {
    case "AUTH": {
      state.Authorization = action.value;
      // console.log("Authorization", state.Authorization);
      return state;
    }
    case "STATUS": {
      state.STATUS = action.value;
      // console.log("action.value", state.Registered);
      return state;
    }
    default: {
      return state;
    }
  }
};

const LoginProvider = ({ children }) => {
  const initialstate = {
    Authorization: "",
    STATUS: "",
  };

  const [state, dispatch] = useReducer(LoginReducer, initialstate);
  const value = { state, dispatch };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

const useLogin = () => {
  const context = useContext(LoginContext);
  return context;
};

export { useLogin, LoginProvider };
