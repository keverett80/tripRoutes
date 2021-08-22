import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

export default class Verify extends Component {
  handleVerification = event => {
    event.preventDefault();
    const { username, code } = this.props.inputs;
    // After retrieveing the confirmation code from the user
    Auth.confirmSignUp(username, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(data => console.log(data))
      .then(()=>this.props.switchComponent("SignIn"))
      .catch(err => console.log(err));
  };

  render() {
    return (


<MDBContainer>
<MDBRow>
  <MDBCol md="6">
    <form>
      <p className="h5 text-center mb-4">Subscribe</p>
      <div className="text-left">

        <MDBInput label="Verification Code" icon="paper-plane" group type="verify"
          success="right"   type="text"
          name="code"
          value={this.props.code}
          placeholder="Verification Code"
          onChange={this.props.handleFormInput} />
      </div>
      <div className="text-center">
        <MDBBtn outline color="black"  type="submit"
          value="SUBMIT VERIFICATION"
          onClick={this.handleVerification}>
          Verify
          <MDBIcon far icon="paper-plane" className="ml-1" />
        </MDBBtn>
      </div>
    </form>
  </MDBCol>
</MDBRow>
</MDBContainer>
    );
  }
}