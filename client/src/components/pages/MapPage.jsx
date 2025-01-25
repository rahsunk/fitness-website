"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useOutletContext } from "react-router-dom";
import Login from "../modules/Login";

export default function MapPage() {
  let props = useOutletContext();
  const position = { lat: 42.3601, lng: -71.0942 };
  const [info, setInfo] = useState(false);

  const handleOpen = () => {
    setInfo(true);
  };

  const handleClose = () => {
    setInfo(false);
  };

  // If signed in, render map, else render Login
  if (props.userId) {
    return (
      <APIProvider
        // apiKey={process.env.REACT_APP_MAP_KEY}
        apiKey="AIzaSyCl5hgHkcV_MyxVjv4M3kuLJ9IwRo1VY24"
      >
        <div style={{ height: "100vh", width: "100vh" }}>
          <Map
            defaultZoom={12}
            defaultCenter={position}
            mapId="49fff11dbccc3c39"
          >
            <AdvancedMarker
              position={position}
              onClick={handleOpen}
            ></AdvancedMarker>

            {info && (
              <InfoWindow position={position} onCloseClick={handleClose}>
                I am a user!
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    );
  } else {
    return <Login />;
  }
}
