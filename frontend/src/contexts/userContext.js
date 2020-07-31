import { createContext } from 'react';

const userContext = createContext({
  user: {},
  isAuthenticated: false,
  setContext: () => {}
});
export default userContext;