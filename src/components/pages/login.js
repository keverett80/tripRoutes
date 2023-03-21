

import React from "react";

import { MDBContainer } from 'mdb-react-ui-kit';
import Login from "../auth/pageLogin"
import { withAuthenticator } from '@aws-amplify/ui-react';


class Logged extends React.Component {


render() {






    return (


      <MDBContainer size="md">



    <div className='loginForm'>
    <Login/>
    </div>







      </MDBContainer>

      )
      }
    }
      export default withAuthenticator(Logged)