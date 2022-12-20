import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { AuthContextProvider } from '../components/context/AuthContext';
import { Navbar } from '../components';
import './App.css';

const App: FC = () => (
  <div className="App">
    <AuthContextProvider>
      <Navbar />
      <Outlet />
    </AuthContextProvider>
  </div>
);

export default App;
