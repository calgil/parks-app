import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import { StatesMap } from "./Components/StatesMap/StatesMap";
import { LoginForm } from "./Components/LoginForm/LoginForm";
import { SignUpForm } from "./Components/SignUpForm/SignUpForm";
import { StateParks } from "./Components/StateParks/StateParks";
import { Toaster } from "react-hot-toast";
import { getParksFromAPI } from "./fetch/parks/getParksFromAPI";
import { AuthProvider } from "./providers/auth.provider";
import { ParkDetails } from "./Components/ParkDetails/ParkDetails";
import { getParkByParkCode } from "./fetch/parks/getParkByParkCode";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { UpNext } from "./Components/UpNext/UpNext";
import { Visited } from "./Components/Visited/Visited";
import { VisitedProvider } from "./providers/visited.provider";
import { getAllVisitedAPI } from "./fetch/parks/visited/getAllVisitedAPI";
import { filterById } from "./utils/filterById";
import { getParksData } from "./fetch/parks/getParksData";

export const parksLoader = async ({ params }) => {
  const parks = await getParksFromAPI(params.stateCode);
  return parks;
};

export const visitedLoader = async ({ params }) => {
  const { userId } = params;
  const allVisitedParks = await getAllVisitedAPI();
  const userParks = filterById(allVisitedParks, +userId);
  return await getParksData(userParks);
  // return await Promise.all(
  //   visited.map(async (park) => await getParkByParkCode(park.parkCode))
  // );
  // return null;
};

export const parkDetailsLoader = async ({ params }) => {
  const parkDetails = await getParkByParkCode(params.parkCode);
  return parkDetails;
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
      {
        path: "state/:stateCode/park/:parkCode",
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <VisitedProvider>
        <RouterProvider router={router} />
      </VisitedProvider>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
