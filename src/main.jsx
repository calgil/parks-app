import React from "react";
import ReactDOM from "react-dom/client";
import "font-awesome/css/font-awesome.min.css";
import "react-tooltip/dist/react-tooltip.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./Components/Root/Root";
import { StatesMap } from "./Components/StatesMap/StatesMap";
import UserLogin, {
  action as loginAction,
} from "./Components/UserLogin/UserLogin";
import UserRegister, {
  action as registerAction,
} from "./Components/UserRegister/UserRegister";
import StateParks, {
  loader as parksLoader,
} from "./Components/StateParks/StateParks";
import { Toaster } from "react-hot-toast";
import ParkDetails, {
  loader as parkDetailsLoader,
} from "./Components/ParkDetails/ParkDetails";
import { action as nextVisitAction } from "./Components/NextVisitBtn/NextVisitBtn";
import { action as visitedAction } from "./Components/VisitBtn/VisitBtn";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import Projects from "./Components/NextVisit/NextVisit";
import Visited from "./Components/Visited/Visited";
import { UnProtectedRoute } from "./Components/UnProtectedRoute";
import UserEdit, { action as editAction } from "./Components/UserEdit/UserEdit";
import {
  deleteAction,
  logoutAction,
} from "./Components/UserActions/UserActions";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
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
                <UserLogin />
              </UnProtectedRoute>
            ),
            action: loginAction,
          },
          {
            path: "register",
            element: (
              <UnProtectedRoute>
                <UserRegister />
              </UnProtectedRoute>
            ),
            action: registerAction,
          },
          {
            path: "/logout",
            action: logoutAction,
          },
          {
            path: "/edit/:userId",
            element: (
              <ProtectedRoute>
                <UserEdit />
              </ProtectedRoute>
            ),
            action: editAction,
          },
          {
            path: "/delete/:userId",
            action: deleteAction,
          },
          {
            path: "state/:stateCode",
            element: <StateParks />,
            loader: parksLoader,
          },
          {
            path: "next-visit/:parkId/:userId/:parkCode",
            action: nextVisitAction,
          },
          {
            path: "visited/:parkId/:userId/:parkCode",
            action: visitedAction,
          },
          {
            path: "park/:parkCode",
            element: <ParkDetails />,
            loader: parkDetailsLoader,
          },
          {
            path: "next-visit",
            element: (
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            ),
          },
          {
            path: "visited",
            element: (
              <ProtectedRoute>
                <Visited />
              </ProtectedRoute>
            ),
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
