import React from 'react';
import routes from './routes';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css';

function App() {
  const router=createBrowserRouter(routes);
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
