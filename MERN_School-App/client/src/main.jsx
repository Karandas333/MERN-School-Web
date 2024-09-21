import React from 'react'
import App from './routes/App.jsx'
import './index.css'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminDashboard from './routes/AdminDashboard.jsx';

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <App />
    ),
  },
  {
    path: "/admin/*",
    element: <AdminDashboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
