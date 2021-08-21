//Old login.js

import React, {PureComponent} from "react";
import Auth from "@aws-amplify/auth";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Verify from "./Verify";
import ResetVerify from "./ResetVerify";
import ForgotPassword from "./ForgotPassword";






class Logged extends React.Component {




state = {
    username: "",
    email: "",
    password: "",
    phone_number: "",
    code: "",
    user: null, // will contain our user data object when signed in
    status: "SignIn"
  };







componentDidMount() {
  Auth.currentAuthenticatedUser({
    bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then(data => {
      let user = {username:data.username,...data.attributes}
      if(user.email_verified) this.setState({user, status:"Welcome"})
    })
    .catch(err => console.log(err));
}

// Handle changes to form inputs on sign-up, verification and sign-in
handleFormInput = event => {
  this.setState({
    [event.target.name]: event.target.value
  });
};

switchComponent = (data) => {
  this.setState({
    status: data
  });
};



render() {

      switch (this.state.status) {
      case "SignUp":
        return (
          <SignUp
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );

      case "Verify":
        return (
          <Verify
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );


      case "ResetVerify":
        return (
          <ResetVerify
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );

      case "SignIn":
        return (
          <SignIn
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );

        case "ForgotPassword":
          return (
            <ForgotPassword
              switchComponent={this.switchComponent}
              handleFormInput={this.handleFormInput}
              inputs={this.state}
            />
          );

      case "Welcome":
        return    ''
      default:
        return (
          <SignIn
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );
    }


      }
    }
      export default Logged