import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthContextProvider } from './store/auth-context';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/system/Dashboard";
import Servicos from "./pages/system/Servicos";
import Atendimentos from "./pages/system/Atendimentos";
import Atendentes from "./pages/system/Atendentes";
import Pagamentos from "./pages/system/Pagamentos";
import Clientes from "./pages/system/Clientes";
import Helpers from "./pages/system/Helpers";

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
        path: "/",
        element: <Home />,
      },

      {
        path: "dashboard",
        element: <Dashboard />,
      },

      {
        path: "servicos",
        element: <Servicos />,
      },

      {
        path: "atendimentos",
        element: <Atendimentos />,
      },

      {
        path: "atendentes",
        element: <Atendentes />,
      },

      {
        path: "formas-de-pagamento",
        element: <Pagamentos />,
      },

      {
        path: "clientes",
        element: <Clientes />,
      },

      {
        path: "helpers",
        element: <Helpers />,
      },
    ],
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
