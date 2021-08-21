import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';

const AdminCardSection1 = () => {
  return (
    <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="route" className="primary-color"/>
                <div className="data">
                  <p>Total Trips</p>
                  <h4>
                    <strong>205</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>

                <MDBCardText>Better than last week (25%)</MDBCardText>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="address-card" className="success-color"/>
                <div className="data">
                  <p>Total Employees</p>
                  <h4>
                    <strong>7</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>

                <MDBCardText>Worse than last week (25%)</MDBCardText>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="truck" className="bg-dark"/>
                <div className="data">
                  <p>Total Vehicles</p>
                  <h4>
                    <strong>2</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>

                <MDBCardText>Worse than last week (75%)</MDBCardText>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="ban" className="red accent-2"/>
                <div className="data">
                  <p>Total Canceled Trips</p>
                  <h4>
                    <strong>20</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>

                <MDBCardText>Better than last week (25%)</MDBCardText>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
      </MDBRow>
  )
}

export default AdminCardSection1;

