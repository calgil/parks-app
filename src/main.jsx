import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
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
import { ProtectedRoute } from "./Components/ProtectedRoute";
import NextAdventure from "./Components/NextAdventure/NextAdventure";
import Visited from "./Components/Visited/Visited";
import ErrorPage from "./Components/ErrorPage";
import { UnProtectedRoute } from "./Components/UnProtectedRoute";
import { createVisitedAPI } from "./fetch/parks/visited/createVisitedAPI";
import { createNextAdventureAPI } from "./fetch/parks/nextAdventure/createNextAdventureAPI";
import { findAndDeleteNextAdventure } from "./fetch/parks/nextAdventure/findAndDeleteNext";
import { findAndDeleteVisited } from "./fetch/parks/visited/deleteVisitedAPI";
import UserEdit, { action as editAction } from "./Components/UserEdit/UserEdit";
import {
  deleteAction,
  logoutAction,
} from "./Components/UserActions/UserActions";

const nextAdventureAction = async ({ request, params }) => {
  const userId = params.userId;
  const parkId = params.parkId;
  const parkCode = params.parkCode;
  let formData = await request.formData();
  const isNext = formData.get("next-adventure") === "true";
  if (isNext) {
    return createNextAdventureAPI({
      userId,
      parkId,
      parkCode,
    });
  }
  if (!isNext) {
    findAndDeleteNextAdventure({ userId, parkId });
  }
  return null;
};

const visitedAction = async ({ request, params }) => {
  const userId = params.userId;
  const parkId = params.parkId;
  const parkCode = params.parkCode;
  let formData = await request.formData();
  const addVisited = formData.get("visited") === "true";
  if (addVisited) {
    return createVisitedAPI({ userId, parkId, parkCode });
  }
  if (!addVisited) {
    findAndDeleteVisited({ userId, parkId });
  }
  return null;
};

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
            path: "next-adventure/:parkId/:userId/:parkCode",
            action: nextAdventureAction,
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
            path: "next-adventure/:userId",
            element: (
              <ProtectedRoute>
                <NextAdventure />
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
