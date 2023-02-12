import React from 'react';
import Auth from "@aws-amplify/auth";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';

async function renderApp() {
  const user = await Auth.currentUserInfo({ bypassCache: false });
  const isLoggedIn = !!user;

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <BrowserRouter>
      <App isLoggedIn={isLoggedIn} />
    </BrowserRouter>
  );
}

renderApp();
