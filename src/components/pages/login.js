

import React from "react";

import { MDBContainer } from "mdbreact";
import Login from "../auth/pageLogin"



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
      export default Logged