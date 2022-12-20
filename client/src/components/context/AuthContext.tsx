// eslint-disable-next-line import/no-extraneous-dependencies
import { JSX } from '@babel/types';
import {
  useState, createContext, useEffect,
} from 'react';

import { ApiService } from '../../services/ApiServices';
import { IAuthContext, IChildrenProps } from '../../interfaces';

// set Initial value
export const AuthContext = createContext<IAuthContext>({
  id: '',
  username: '',
  email: '',
  image: '',
  bio: '',
});

export const AuthContextProvider = ({ children }:IChildrenProps):JSX.Element => {
  const [user, setUser] = useState<IAuthContext>({
    id: '',
    username: '',
    email: '',
    image: '',
    bio: '',
  });

  const fetchUserData = async ():Promise<void> => {
    try {
      const response = await ApiService.get('/api/v1/users/me');
      setUser(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};
