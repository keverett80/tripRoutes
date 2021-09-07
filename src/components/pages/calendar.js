import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips } from '../../graphql/queries';
import { MDBIcon } from "mdbreact";

import "./calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class Calendars extends Component {
  state = {
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

          allday: 'yes'
          });


      }
      else{
      myCustomers.push({

      title: customer.fname + ' ' + customer.lname + ' ' +  customer.appointmentTime,

      start: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'})),
      end: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'})),


      });
    }
  }

  })
  this.setState({


      events: this.state.events.concat(myCustomers)

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
          events={this.state.events}
          style={{ height: "100vh" }}
          eventPropGetter={(event) => {
            const backgroundColor = event.allday ? 'orange' : '';
            return { style: { backgroundColor } }
          }}
        />
      </div>
    );
  }
}

export default Calendars;