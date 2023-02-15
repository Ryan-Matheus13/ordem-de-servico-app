import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthContextProvider } from './store/auth-context';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import ServiceRegister from "./pages/ServiceRegister";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import User from "./pages/auth/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "user",
        element: <User />,
      },

      {
        path: "/",
        element: <Home />,
      },

      {
        path: "cadastrar-servico",
        element: <ServiceRegister />,
      },
    ],
  },

  {
    path: "cadastrar-servico",
    element: <ServiceRegister />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
