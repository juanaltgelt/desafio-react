import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ROUTES } from './utils/const';
import SnackbarProvider from './contexts/SnackbarContext';
import { PageLayout } from './components/UI/PageLayout.component';
import HomePage from './pages/Home/Home.page';
import ExamplePage from './pages/Example/Example.page';
import NotFoundPage from './pages/NotFound/NotFound.page';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <PageLayout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: ROUTES.EXAMPLE, element: <ExamplePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
};

export default App;
