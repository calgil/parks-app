import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./Components/Root/Root";
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

const nextAdventureAction = async ({ request, params }) => {
  const userId = params.userId;
  const parkId = params.parkId;
  const parkCode = params.parkCode;
  let formData = await request.formData();
  const isNext = formData.get("next-adventure") === "true";
  if (isNext) {
    createNextAdventureAPI({
      userId,
      parkId,
      parkCode,
    });
  }
  if (!isNext) {
    console.log("delete");
    findAndDeleteNextAdventure({ userId, parkId });
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
            path: "next-adventure/:parkId/:userId/:parkCode",
            action: nextAdventureAction,
          },
          {
            path: "visited/:parkId/:userId/:parkCode",
            action: async ({ request, params }) => {
              console.log("visited action", params.parkCode);
              console.log({ request, params });
              let formData = await request.formData();
              console.log({ formData });
              return null;
            },
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
