import React from 'react';
import Auth from "@aws-amplify/auth";
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';




import App from './App';





var log;
Auth.currentUserInfo({
  bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then((user) => {

  if(user)
  {
     log = true
  }
  else{
    log = false
  }
  ReactDOM.render(

    <BrowserRouter>

      <App  isLoggedIn={log}  />
    </BrowserRouter>,

    document.getElementById('root')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(//console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

}

)









