import { createContext } from 'react';

const UserContext = createContext({
  user: {},
  setUser: null,
});

export default UserContext;
