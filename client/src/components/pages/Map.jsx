import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { MapContainer } from "https://cdn.esm.sh/react-leaflet/MapContainer";
import { TileLayer } from "https://cdn.esm.sh/react-leaflet/TileLayer";
import { Marker } from "https://cdn.esm.sh/react-leaflet/Marker";
import { Popup } from "https://cdn.esm.sh/react-leaflet/Popup";
import "../../utilities.css";
import "./Map.css";

const mapPins = [
  { id: 1, city: "Cambridge, MA", num: 234, lat: 42.3601, lng: -71.0942 },
  { id: 2, city: "New York, NY", num: 500, lat: 40.7128, lng: -74.006 },
  { id: 3, city: "Los Angeles, CA", num: 320, lat: 34.0522, lng: -118.2437 },
  { id: 4, city: "Chicago, IL", num: 400, lat: 41.8781, lng: -87.6298 },
  { id: 5, city: "Houston, TX", num: 180, lat: 29.7604, lng: -95.3698 },
  { id: 6, city: "Phoenix, AZ", num: 150, lat: 33.4484, lng: -112.074 },
  { id: 7, city: "Philadelphia, PA", num: 210, lat: 39.9526, lng: -75.1652 },
  { id: 8, city: "San Antonio, TX", num: 275, lat: 29.4241, lng: -98.4936 },
  { id: 9, city: "San Diego, CA", num: 200, lat: 32.7157, lng: -117.1611 },
  { id: 10, city: "Dallas, TX", num: 250, lat: 32.7767, lng: -96.797 },
  { id: 11, city: "Austin, TX", num: 220, lat: 30.2672, lng: -97.7431 },
  { id: 12, city: "Jacksonville, FL", num: 160, lat: 30.3322, lng: -81.6557 },
  { id: 13, city: "Fort Worth, TX", num: 190, lat: 32.7555, lng: -97.333 },
  { id: 14, city: "Columbus, OH", num: 130, lat: 39.9612, lng: -82.9988 },
  { id: 15, city: "Indianapolis, IN", num: 145, lat: 39.7684, lng: -86.158 },
  { id: 16, city: "Charlotte, NC", num: 120, lat: 35.2271, lng: -80.8431 },
  { id: 17, city: "Seattle, WA", num: 160, lat: 47.6062, lng: -122.3321 },
  { id: 18, city: "Denver, CO", num: 140, lat: 39.7392, lng: -104.9903 },
  { id: 19, city: "Washington, D.C.", num: 300, lat: 38.9072, lng: -77.0369 },
  { id: 20, city: "Boston, MA", num: 260, lat: 42.3601, lng: -71.0589 },
];

const customIcon = new L.Icon({
  iconUrl:
    "https://images.ctfassets.net/3prze68gbwl1/assetglossary-17su9wok1ui0z7w/c4c4bdcdf0d0f86447d3efc450d1d081/map-marker.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, 32],
});

const position = [51.505, -0.09];

const Map = (props) => {
  return (
    <div className="Map-box">
      <h1>Search for Fit-mates</h1>
      {/* <img src="../../assets/fitMatesLogo.png"></img> */}
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
