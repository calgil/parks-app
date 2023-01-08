import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import { StatesMap } from "./Components/StatesMap/StatesMap";
import { LoginForm } from "./Components/LoginForm/LoginForm";
import { SignUpForm } from "./Components/SignUpForm/SignUpForm";
import { StateParks } from "./Components/StateParks/StateParks";
import { Toaster } from "react-hot-toast";
import { getParksFromAPI } from "./fetch/parks/getParksFromAPI";
import { AuthProvider } from "./providers/auth.provider";

export const parksLoader = async ({ params }) => {
  const parks = await getParksFromAPI(params.stateCode);
  return parks;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <StatesMap />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <SignUpForm />,
      },
      {
        path: "state/:stateCode",
        element: <StateParks />,
        loader: parksLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
