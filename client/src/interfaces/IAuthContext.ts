/* eslint-disable no-unused-vars */
import React from 'react';

export interface IAuthContext {
  id:string;
  username:string;
  email:string;
  bio:string;
  image:string
}

export interface IChildrenProps {
  children : React.ReactNode

}
