import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';

export default class ResetVerify extends Component {
  handleSignIn = event => {
    event.preventDefault();
    const { username, password, code } = this.props.inputs;
    // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger


      Auth.forgotPasswordSubmit(username, code, password)
    .then(data => console.log(data))
    .then(()=>this.props.switchComponent("SingIn")) // switches Sign Up to Verification
    .catch(err => console.log(err));
  };




  render() {

    return (
<MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Verify</strong>
                </h3>
              </div>
              <MDBInput

                group

                validate
                error="wrong"
                success="right"
                type="text"
                name="username"
                value={this.props.username}
                placeholder="Username"
                onChange={this.props.handleFormInput}
              />
                 <MDBInput

group

validate
error="wrong"
success="right"
type="text"
name="code"
value={this.props.code}
placeholder="Code"
onChange={this.props.handleFormInput}
/>
              <MDBInput
                label="Your password"
                group
                type="password"
                name="password"
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
                  color="brown lighten-1"
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
>
  <MDBIcon fab icon="facebook-f" className="brown-text text-center" />
</MDBBtn>
<MDBBtn
  tag="a" floating
  color="white"
  rounded
  className="mr-md-3 z-depth-1a"
>
  <MDBIcon fab icon="twitter" className="brown-text" />
</MDBBtn>
<MDBBtn
tag="a" floating
  color="white"
  rounded
  className="z-depth-1a"
>
  <MDBIcon fab icon="google-plus-g" className="brown-text" />
</MDBBtn>
</div>

            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="font-small grey-text d-flex justify-content-end">
                Not a member?
                <a href="#!" className="blue-text ml-1"  onClick={this.handlePageChange} >

                  Sign Up
                </a>
              </p>
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>


    );
  }
}