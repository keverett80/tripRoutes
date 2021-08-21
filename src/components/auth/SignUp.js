import React from "react";
import { Auth } from "aws-amplify";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import "./auth.css";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

class SignUp extends React.Component  {

  handleSignUp = event => {
    event.preventDefault();
    const { username, email, password, phone_number } = this.props.inputs;
    Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        phone_number // optional - E.164 number convention
        // other custom attributes
      },
      validationData: [] //optional
    })
      .then(data => console.log(data))
      .then(()=>this.props.switchComponent("Verify")) // switches Sign Up to Verification
      .catch(err => console.log(err))
  };

  handlePageChange = event => {
    event.preventDefault();
    this.props.switchComponent("SignIn")
  };


  render() {
    return (

      <form className="form-elegant ">

<MDBContainer>
<MDBRow>
  <MDBCol md="6">
    <MDBCard>
      <MDBCardBody className="mx-4">
        <div className="text-center">
          <h3 className="dark-grey-text mb-5">
            <strong>Sign Up</strong>
          </h3>
        </div>
        <MDBInput
          label="Username"
          group
          type="text"
          name="username"

          validate
          error="wrong"
          success="right"
          value={this.props.username}
          onChange={this.props.handleFormInput}
        />
           <MDBInput
                label="Your email"
                group
                type="email"
                name="email"

                validate
                error="wrong"
                success="right"
                value={this.props.email}
                onChange={this.props.handleFormInput}
              />
        <MDBInput
          label="Your password"
          group
          type="password"
          type="password"
          name="password"
          validate
          containerClass="mb-0"
          value={this.props.password}
          onChange={this.props.handleFormInput}
        />
         <PhoneInput
  country={'us'}
                label="Phone Number"
                group
                type="phone"
                validate
                error="wrong"
                success="right"
                name="phone"
                value={ this.props.phone_number}
                onChange={phone_number => this.props.handleFormInput}
              />
                 <p className="font-small blue-text d-flex justify-content-end pb-3">

        </p>

        <div className="text-center mb-3">
          <MDBBtn
            type="button"
            color="brown lighten-1"
            rounded
            className="btn-block z-depth-1a"
            onClick={this.handleSignUp}
          >
            Sign Up
          </MDBBtn>
        </div>
        <p className="font-small blue-text d-flex justify-content-end pb-3">
        Back to
          <a href="#!"  onClick={this.handlePageChange} className="blue-text ml-1" >

            Login
          </a>
        </p>

      </MDBCardBody>
      <MDBModalFooter className="mx-5 pt-3 mb-1">

      </MDBModalFooter>
    </MDBCard>
  </MDBCol>
</MDBRow>
</MDBContainer>
</form>
    );
  }
}
export default SignUp;