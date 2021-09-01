import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

import "./calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class Calendars extends Component {
  state = {
    events: [



    ]
  };


  async componentDidMount(){



    const apiData = await API.graphql(graphqlOperation(listTrips));


    var myCustomers = [];
    //console.log(this.state.queryData)

    apiData.data.listTrips.items.map((customer) => {

console.log(customer)
      myCustomers.push({

      title: customer.fname + ' ' + customer.lname + '/n' +  customer.appointmentTime,

      start: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'})),
      end: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'})),



      });

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
        />
      </div>
    );
  }
}

export default Calendars;