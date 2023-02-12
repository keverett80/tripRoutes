import React from 'react';
import Routes from '../src/components/Routes';
import RoutesLanding from '../src/components/RoutesLanding';
import TopNavigation from './components/topNavigation';
import Main from './components/pages/main'

import './index.css';

function App()  {
  const isLoggedIn = true;
  return (
    <div>
      {isLoggedIn ? (
        <div className="flexible-content">
          <TopNavigation />
          <main id="content" className="p-5">
            <Routes />
          </main>
        </div>
      ) : (
        <>
          <Main />
          <RoutesLanding />
        </>
      )}
    </div>
  );
}

export default App;
