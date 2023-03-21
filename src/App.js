import React, { useState, useEffect } from 'react';
import Routes from '../src/components/Routes';
import TopNavigation from './components/topNavigation';
import { Auth } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthStatus();

    const listener = (data) => {
      switch (data.payload.event) {
        case 'signIn':
          setIsLoggedIn(true);
          break;
        case 'signOut':
          setIsLoggedIn(false);
          break;
        default:
          break;
      }
    };

    Hub.listen('auth', listener);

    return () => {
      Hub.remove('auth', listener);
    };
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      <TopNavigation isLoggedIn={isLoggedIn} />
      <main id="content" className="p-5">
        <Routes isLoggedIn={isLoggedIn} />
      </main>
    </div>
  );
}

export default App;
