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
import { toast, Toaster } from "react-hot-toast";
import ParkDetails, {
  loader as parkDetailsLoader,
} from "./Components/ParkDetails/ParkDetails";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import Projects from "./Components/NextVisit/NextVisit";
import Visited from "./Components/Visited/Visited";
import { UnProtectedRoute } from "./Components/UnProtectedRoute";
import { createVisitedAPI } from "./fetch/parks/visited/createVisitedAPI";
import { createNewProjectAPI } from "./fetch/parks/nextVisit/createNewNextVisitAPI";
import { findAndDeleteNextVisit as findAndDeleteNextVisit } from "./fetch/parks/nextVisit/findAndDeleteNextVisit";
import { findAndDeleteVisited } from "./fetch/parks/visited/deleteVisitedAPI";
import UserEdit, { action as editAction } from "./Components/UserEdit/UserEdit";
import {
  deleteAction,
  logoutAction,
} from "./Components/UserActions/UserActions";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import { getParkNameByParkCode } from "./fetch/parks/getParkName";

const nextVisitAction = async ({ request, params }) => {
  const userId = params.userId;
  const parkId = params.parkId;
  const parkCode = params.parkCode;
  const parkName = await getParkNameByParkCode(parkCode);
  let formData = await request.formData();
  const isNext = formData.get("next-visit") === "true";
  if (isNext) {
    toast.success(`${parkName} is added to Next Visit`);
    return createNewProjectAPI({
      userId,
      parkId,
      parkCode,
    });
  }
  if (!isNext) {
    toast.success(`${parkName} is removed from Next Visit`);
    findAndDeleteNextVisit({ userId, parkId });
  }
  return null;
};

const visitedAction = async ({ request, params }) => {
  const userId = params.userId;
  const parkId = params.parkId;
  const parkCode = params.parkCode;
  const parkName = await getParkNameByParkCode(parkCode);
  let formData = await request.formData();
  const addVisited = formData.get("visited") === "true";
  if (addVisited) {
    findAndDeleteNextVisit({ userId, parkId });
    createVisitedAPI({ userId, parkId, parkCode });
    return toast.success(`${parkName} added to Visited`);
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
            errorElement: <ErrorPage />,
          },
          {
            path: "/edit/:userId",
            element: (
              <ProtectedRoute>
                <UserEdit />
              </ProtectedRoute>
            ),
            action: editAction,
            errorElement: <ErrorPage />,
          },
          {
            path: "/delete/:userId",
            action: deleteAction,
            errorElement: <ErrorPage />,
          },
          {
            path: "state/:stateCode",
            element: <StateParks />,
            loader: parksLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "next-visit/:parkId/:userId/:parkCode",
            action: nextVisitAction,
            errorElement: <ErrorPage />,
          },
          {
            path: "visited/:parkId/:userId/:parkCode",
            action: visitedAction,
            errorElement: <ErrorPage />,
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
