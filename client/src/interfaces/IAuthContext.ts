import React from 'react';

export interface IAuthContext {
  id:string;
  username:string;
  email:string;
  bio:string;
  image:string
  isLogged:boolean;
  // eslint-disable-next-line no-unused-vars
  setIsLogged:(isLogged:boolean) => void;
}

export interface IChildrenProps {
  children : React.ReactNode

}
