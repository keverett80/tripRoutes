import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';

export default class ForgotPassword extends Component {
  handleReset = event => {
    event.preventDefault();
    const { username, password } = this.props.inputs;

    Auth.forgotPassword(username)
    .then(data => console.log(data))
    .then(()=>this.props.switchComponent("ResetVerify")) // switches Sign Up to Verification
    .catch(err => console.log(err));
  };

  handlePageChange = event => {
    event.preventDefault();
    this.props.switchComponent("SignIn")
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
                  <strong>Reset Password</strong>
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

              <div className="text-center mb-3">
                <MDBBtn
                  type="button"
                  color="black"
                  rounded
                  className="btn-block z-depth-1a"
                  type="submit"

                  onClick={this.handleReset}
                >
                  Reset
                </MDBBtn>
              </div>



            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="font-small blue-text d-flex justify-content-end">
                Back to
                <a href="#!" className="blue-text ml-1"  onClick={this.handlePageChange} >

                  Sign In
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