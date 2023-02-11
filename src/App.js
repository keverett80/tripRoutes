import React, { Component } from 'react';
import Routes from '../src/components/Routes';
import RoutesLanding from '../src/components/RoutesLanding';
import TopNavigation from './components/topNavigation';


import './index.css';

import { Amplify } from 'aws-amplify';

import Main from './components/pages/main'
import config from './aws-exports';








function LoggedIn(props){
  return(


    <div className="flexible-content">

    <TopNavigation />

    <main id="content" className="p-5">
      <Routes />
    </main>

  </div>

   )


}

function LoggedOut(props){

return(



<>
<Main/>

    <RoutesLanding />

    </>














)

}





Amplify.configure(config);





function App(props)  {
  const isLoggedIn = props.isLoggedIn;;
  if (isLoggedIn) {
    return <LoggedIn />;
  }
  return <LoggedOut/>;


    }



    export default App;

