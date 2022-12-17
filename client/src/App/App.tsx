import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';
import './App.css';

const App: FC = () => (
  <div className="App">
    <Navbar />
    <Outlet />
  </div>
);

export default App;
