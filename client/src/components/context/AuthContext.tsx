// eslint-disable-next-line import/no-extraneous-dependencies
import { JSX } from '@babel/types';
import {
  useState, createContext, useEffect,
} from 'react';
import { ApiService } from '../../services/ApiServices';
import { IAuthContext, IChildrenProps } from '../../interfaces';

export const AuthContext = createContext<IAuthContext|null>(null);

export const AuthContextProvider = ({ children }:IChildrenProps):JSX.Element => {
  const [user, setUser] = useState<IAuthContext|null>(null);

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const fetchUserData = async ():Promise<void> => {
    try {
      const response = await ApiService.get('/users/me');
      setIsLogged(true);
      setId(response.data.id);
      setUser({
        ...response.data, setIsLogged, isLogged, id, setId,
      });
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
