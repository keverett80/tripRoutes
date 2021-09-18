import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips } from '../../graphql/queries';
import { MDBIcon, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBTable, MDBTableBody, MDBTableHead  } from "mdbreact";

import "./calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class Calendars extends Component {
  state = {
     modal: false,
      address: '',
      address2: '',
      customer: '',
     phoneNumber:'',
    events: [

    ]
  };
 sortByTime =(b, a) => {
    if (a.appointmentTime < b.appointmentTime) {
        return 1;
    }
    if (a.appointmentTime > b.appointmentTime) {
        return -1;
    }
    return 0;
  }


  async componentDidMount(){



    const apiData = await API.graphql(graphqlOperation(listTrips, { limit: 1000 }));


    var myCustomers = [];
    //console.log(this.state.queryData)

    apiData.data.listTrips.items.sort(this.sortByTime).filter(trip => trip.status.includes('pending')).map((customer) => {

if(customer.appointmentTime !== 'Will Call'){
if(customer.wheelchair == 'Wheelchair')
      {

        myCustomers.push({

          title: customer.fname + ' ' + customer.lname + ' ' +  customer.appointmentTime +  ' WC',

          start: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
          year: 'numeric'})),
          end: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
          year: 'numeric'})),

          allday: 'yes',
          name: customer
          });


      }
      else{
      myCustomers.push({

      title: customer.fname + ' ' + customer.lname + ' ' +  customer.appointmentTime,

      start: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'})),
      end: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'})),
       name: customer


      });
    }
  }

  })
  this.setState({


      events: this.state.events.concat(myCustomers)

  });
  }
toggle = (data) => {

  console.log(data)
this.setState({ address: data.address});
this.setState({ address2: data.address2});
this.setState({ phoneNumber: data.phoneNumber});
this.setState({ customer: data.fname +  ' ' + data.lname});

  this.setState({
    modal: !this.state.modal
  });

}

  render() {
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          popup={true}
          defaultDate={new Date()}
          defaultView="month"
            onSelectEvent={events => this.toggle(events.name)}
          events={this.state.events}
          style={{ height: "100vh" }}
          eventPropGetter={(event) => {
            const backgroundColor = event.allday ? 'orange' : '';
            return { style: { backgroundColor } }
          }}
        />


      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>{this.state.customer}</MDBModalHeader>
        <MDBModalBody>
         <MDBTable>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Pickup Address</th>
          <th>Destination Address</th>
          <th>Phone Number</th>

        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>
          <td>{this.state.address}</td>
          <td>{this.state.address2}</td>
          <td>{this.state.phoneNumber}</td>
        </tr>

      </MDBTableBody>
    </MDBTable>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" rounded onClick={this.toggle}>Close</MDBBtn>

        </MDBModalFooter>
      </MDBModal>
      </div>
    );
  }
}

export default Calendars;