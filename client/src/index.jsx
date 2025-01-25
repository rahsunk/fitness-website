import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Skeleton from "./components/pages/Skeleton";
import NotFound from "./components/pages/NotFound";
import Login from "./components/modules/Login";
import Home from "./components/pages/Home";
import ProgramsPage from "./components/pages/ProgramsPage";
import MapPage from "./components/pages/MapPage";
import GamePage from "./components/pages/GamePage";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID =
  "462004688383-dj9utc9vcdagfqsnfa9neegtq5oohpn1.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/skeleton" element={<Skeleton />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home/" element={<Home />} />
      <Route path="/programs/" element={<ProgramsPage />} />
      <Route path="/map/" element={<MapPage />} />
      <Route path="/game/" element={<GamePage />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
