import React from "react";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTableEditable } from "mdbreact";

const columns = ["First Name", "Last Name", "Phone Number", "Email Address"];

const data = [
  ["Kentwan", "Everett", "954-934-5447", "keverett1980@gmail.com"],
  ["Shimeka", "Everett", "954-661-9791", "shrobotham@gmail.com"],

];

const Drivers = props => {
  return (
    <MDBCard>
      <MDBCardHeader tag="h3" className="text-center font-weight-bold text-uppercase py-4">
        Drivers
      </MDBCardHeader>
      <MDBCardBody>
        <MDBTableEditable data={data} columns={columns} striped bordered />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Drivers;