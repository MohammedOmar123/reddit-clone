import { createBrowserRouter } from 'react-router-dom';
import App from './App/App';
import {
  LoginPage, SignupPage, ProfilePage, HomePage, AddPostPage,
} from './pages';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <h1>404</h1>,
  children: [{
    index: true,
    element: <HomePage />,
  }, {
    path: 'profile/:userId',
    element: <ProfilePage />,
  },
  {
    path: 'addPost',
    element: <AddPostPage />,
  }],
},
{
  path: 'signup',
  element: <SignupPage />,
}, {
  path: 'login',
  element: <LoginPage />,
},
]);
export default router;
