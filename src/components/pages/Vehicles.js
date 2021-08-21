import React from "react";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTableEditable } from "mdbreact";

const columns = ["Make", "Model", "Color", "Tag Number"];

const data = [
  ["Ford", "Transit", "Black", "NEK6Y"],
  ["Ford", "Connect", "Red", "NEK6Y"],

];

const Vehicles = props => {
  return (
    <MDBCard>
      <MDBCardHeader tag="h3" className="text-center font-weight-bold text-uppercase py-4">
        Vehicles
      </MDBCardHeader>
      <MDBCardBody>
        <MDBTableEditable data={data} columns={columns} striped bordered />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Vehicles;