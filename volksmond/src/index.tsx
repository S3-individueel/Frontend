import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// PAGES
import HomePage from './components/05_page/home';
import DiscussionPage from './components/05_page/discussion';
import SolutionPage from './components/05_page/solution';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/discussion/:discussionId",
        element: <DiscussionPage />,
      },
      {
        path: "/solution/:solutionId",
        element: <SolutionPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
