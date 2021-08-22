import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default class SignIn extends Component {
  handleSignIn = event => {
    event.preventDefault();
    const { username, password } = this.props.inputs;
    // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
    Auth.signIn({ username, password })
      .then(user => console.log(user))
      .then(() => location.href='/')
      .catch(err => console.log(err));
  };

  handleSignInGoogle = event => {
    event.preventDefault();

 const user = Auth.currentAuthenticatedUser()
 console.log('user:' , user)
  };

  handlePageChange = event => {
    event.preventDefault();
    this.props.switchComponent("SignUp")
  };
  handlePageReset = event => {
    event.preventDefault();
    this.props.switchComponent("ForgotPassword")
  };


  render() {

    return (
<>
              <MDBInput

                group

                validate
                error="wrong"
                success="right"
                type="text"
                name="username"
                autoComplete="off"
                value={this.props.username}
                placeholder="Username"
                onChange={this.props.handleFormInput}
              />
              <MDBInput
                label="Your password"
                group
                type="password"
                name="password"
                autoComplete="off"
                value={this.props.password}
                placeholder="Password"
                onChange={this.props.handleFormInput}
                validate
                containerClass="mb-0"
              />
              <p className="font-small blue-text d-flex justify-content-end pb-3">
                Forgot
                <a href="#!" className="blue-text ml-1"  onClick={this.handlePageReset}>

                  Password?
                </a>
              </p>
              <div className="text-center mb-3">
                <MDBBtn
                  type="button"
                  color="black "
                  rounded
                  className="btn-block z-depth-1a"
                  type="submit"

                  onClick={this.handleSignIn}
                >
                  Sign in
                </MDBBtn>
              </div>
              <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

or Sign in with:
</p>
<div className="row my-3 d-flex justify-content-center">
<MDBBtn
   tag="a" floating
  color="white"
  rounded
  className="mr-md-3 z-depth-1a"
  onClick={()=> Auth.federatedSignIn({provider: "Facebook"}) }
>
  <MDBIcon fab icon="facebook-f" className="black-text text-center" />
</MDBBtn>

<MDBBtn
tag="a" floating
  color="white"
  rounded
  className="z-depth-1a"
  onClick={()=> Auth.federatedSignIn({provider: "Google"}) }
>
  <MDBIcon fab icon="google-plus-g" className="black-text" />
</MDBBtn>
</div>
</>




    );
  }
}