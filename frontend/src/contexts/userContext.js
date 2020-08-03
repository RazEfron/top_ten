import { createContext } from 'react';

const userContext = createContext({
  user: {},
  isAuthenticated: false,
  isAdmin: false,
  setContext: () => {}
});
export default userContext;