import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';
import { API } from 'aws-amplify';
import * as queries from '../../../graphql/queries'

const AdminCardSection1 = () => {
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const [complete, setComplete] = useState(0);

  let filter = {
    status: {
        eq: 'pending' // filter priority = 1
    }
};
let filterP = {
  status: {
      eq: 'complete' // filter priority = 1
  }
};
let filterC = {
  status: {
      eq: 'canceled' // filter priority = 1
  }
};
  useEffect( async () => {
    // Update the document title using the browser API
    const total= await API.graphql({ query: queries.listTrips, variables: {limit: 1000}});
    setTotal(total.data.listTrips.items.length)
    console.log(total.data.listTrips.items.length)
    const pending = await API.graphql({ query: queries.listTrips, variables: { filter: filter,limit: 1000}});
    setPending(pending.data.listTrips.items.length)
    const canceled = await API.graphql({ query: queries.listTrips, variables: { filter: filterC ,limit: 1000}});
    setCanceled(canceled.data.listTrips.items.length)

    const complete = await API.graphql({ query: queries.listTrips, variables: { filter: filterP,limit: 1000}});
    setComplete(complete.data.listTrips.items.length)



  });
  return (
    <MDBRow className="mb-4">

        <MDBCol xl="4" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="chart-line" className="warning-color"/>
                <div className="data">
                  <p>PENDING TRIPS</p>
                  <h4>
                    <strong>{pending}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <div className="progress">
                  <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg orange" role="progressbar"
                    style={{width: '25%'}}></div>
                </div>
                <MDBCardText>Total Trips Pending (25%)</MDBCardText>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
        <MDBCol xl="4" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="chart-pie" className="green lighten-1"/>
                <div className="data">
                  <p>COMPLETE TRIPS</p>
                  <h4>
                    <strong>{complete}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <div className="progress">
                  <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar green darken-2" role="progressbar"
                    style={{width: '75%'}}></div>
                </div>
                <MDBCardText>Total Trips Complete (75%)</MDBCardText>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
        <MDBCol xl="4" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="chart-bar" className="red accent-2"/>
                <div className="data">
                  <p>CANCELED TRIPS</p>
                  <h4>
                    <strong>{canceled}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <div className="progress">
                  <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-danger" role="progressbar"
                    style={{width: '25%'}}></div>
                </div>
                <MDBCardText>Total Trips Canceled (25%)</MDBCardText>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
      </MDBRow>
  )
}

export default AdminCardSection1;
