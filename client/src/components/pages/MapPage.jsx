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
import "./MapPage.css";

export default function MapPage() {
  let props = useOutletContext();
  const defaultPosition = { lat: 42.3601, lng: -71.0942 };
  const [info, setInfo] = useState(false);
  const [infoContent, setInfoContent] = useState("");
  const [infoPosition, setInfoPosition] = useState(defaultPosition); // State for dynamic position of InfoWindow

  const handleOpen = (name, position) => {
    setInfoContent(name);
    setInfoPosition(position); // Set the position of the InfoWindow
    setInfo(true);
  };

  const handleClose = () => {
    setInfo(false);
  };

  const trees = [
    // { lat: 42.360001, lng: -71.092003, name: "User" },
    { lat: 42.36236, lng: -71.099692, name: "Vim Fitness" },
    { lat: 42.365479, lng: -71.103363, name: "Planet Fitness" },
    { lat: 42.363626, lng: -71.083047, name: "Bodyscapes Fitness" },
    { lat: 42.364367, lng: -71.078978, name: "Cambridge Athletic Club" },
    // Add more markers as needed
  ];

  // If signed in, render map, else render Login
  if (props.userId) {
    return (
      <div className="Map-box">
        {/* <div className="Map-info">
          <h1>Find gyms!</h1>
        </div> */}
        <APIProvider apiKey="AIzaSyCl5hgHkcV_MyxVjv4M3kuLJ9IwRo1VY24">
          <h1>Find gyms!</h1>
          <div style={{ height: "100vh", width: "100vh" }} className="Map-map">
            <Map
              defaultZoom={12}
              defaultCenter={defaultPosition}
              mapId="49fff11dbccc3c39"
            >
              {/* This is the static marker for "You" */}
              <AdvancedMarker
                position={defaultPosition}
                onClick={() => handleOpen("User", defaultPosition)}
              >
                <Pin
                  background={"blue"}
                  borderColor={"white"}
                  glyphColor={"white"}
                />
              </AdvancedMarker>

              {info && (
                <InfoWindow position={infoPosition} onCloseClick={handleClose}>
                  {infoContent}
                </InfoWindow>
              )}

              {/* Dynamic markers for trees */}
              {trees.map((tree, index) => (
                <AdvancedMarker
                  key={index}
                  position={{ lat: tree.lat, lng: tree.lng }}
                  onClick={() =>
                    handleOpen(tree.name, { lat: tree.lat, lng: tree.lng })
                  }
                />
              ))}
            </Map>
          </div>
        </APIProvider>
      </div>
    );
  } else {
    return <Login />;
  }
}
