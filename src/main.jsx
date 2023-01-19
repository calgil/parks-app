import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout, { loader as layoutLoader } from "./Components/Layout/Layout";
import { StatesMap } from "./Components/StatesMap/StatesMap";
import LoginUser, {
  action as loginAction,
} from "./Components/LoginUser/LoginUser";
import RegisterUser, {
  action as registerAction,
} from "./Components/RegisterUser/RegisterUser";
import StateParks, {
  loader as parksLoader,
} from "./Components/StateParks/StateParks";
import { Toaster } from "react-hot-toast";
import { ParkDetails } from "./Components/ParkDetails/ParkDetails";
import { getParkByParkCode } from "./fetch/parks/getParkByParkCode";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { UpNext } from "./Components/UpNext/UpNext";
import Visited, { loader as visitedLoader } from "./Components/Visited/Visited";
import ErrorPage from "./Components/ErrorPage";
import { UnProtectedRoute } from "./Components/UnProtectedRoute";

export const parkDetailsLoader = async ({ params }) => {
  const parkDetails = await getParkByParkCode(params.parkCode);
  return parkDetails;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: layoutLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <StatesMap />,
          },
          {
            path: "login",
            element: (
              <UnProtectedRoute>
                <LoginUser />
              </UnProtectedRoute>
            ),
            action: loginAction,
          },
          {
            path: "register",
            element: (
              <UnProtectedRoute>
                <RegisterUser />
              </UnProtectedRoute>
            ),
            action: registerAction,
          },
          {
            path: "state/:stateCode",
            element: <StateParks />,
            loader: parksLoader,
          },
          {
            path: "park/:parkCode",
            element: <ParkDetails />,
            loader: parkDetailsLoader,
          },
          {
            path: "up-next",
            element: (
              <ProtectedRoute>
                <UpNext />
              </ProtectedRoute>
            ),
          },
          {
            path: "visited/:userId",
            element: (
              <ProtectedRoute>
                <Visited />
              </ProtectedRoute>
            ),
            loader: visitedLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
