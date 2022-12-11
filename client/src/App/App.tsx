import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import './App.css';

const App: FC = () => (
  <div className="App">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

export default App;
