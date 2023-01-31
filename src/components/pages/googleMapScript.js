import React, { useEffect, useState } from "react";
import AddTrips from "./AddTrips";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const GoogleMapScript = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAdnS_bTUUA8hlPRJkr0tDPBZ_vdA4hH9Y&libraries=places,distancematrix"
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return scriptLoaded ? <AddTrips/> : null;
};

export default GoogleMapScript;
