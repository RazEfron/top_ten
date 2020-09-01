import { createContext } from "react";

const userContext = createContext({
  user: {},
  isAuthenticated: false,
  isAdmin: false,
  currentUrl: "/",
  setUrl: () => {},
  setAuthContext: () => {},
  setModal: () => {},
  language: "",
  changeLanguage: () => {},
});
export default userContext;
