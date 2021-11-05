import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDataTableV5,MDBFormInline, MDBTimePicker, MDBSelect, MDBCol } from 'mdbreact';
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips, listEmployees } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class TripReady extends React.Component {
  constructor(props) {
    super(props)

  this.state = {
    employeeToken: '',
    pickupTime: '',
    driver:'',
    queryData:'',
    queryEmployee:'',
    modal: false,
    radio: '',
    employee:[{text: 'No Driver', value: ''}],
    data:{
    columns: [

      {
        label: 'ID',
        field: 'id',
        width: 100,

      },


      {
        label: 'First Name',
        field: 'fname',
        width: 100,

      },
      {
        label: 'Last Name',
        field: 'lname',
        width: 100,
      },
      {
        label: 'Pickup Address',
        field: 'address',
        width: 200,
      },
      {
        label: 'Destination Address',
        field: 'address2',

        width: 200,
      },
      {
        label: 'Phone Number',
        field: 'phone',

        width: 100,
      },
      {
        label: 'Wheelchair',
        field: 'wheelchair',

        width: 100,
      },


      {
        label: 'Appointment Time',
        field: 'appointmentTime',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'Pickup Time',
        field: 'status',

        width: 100,
      },
      {
        label: 'Member Status',
        field: 'route',

        width: 100,
      },

      {
        label: 'Time Picked Up',
        field: 'statusTime',

        width: 100,
      },

      {
        label: 'Time Arrived',
        field: 'arrivedTime',

        width: 100,
      },


    ],
    rows: [

    ],
  },
  localData:[]


}


  }





  async componentDidMount(){
    let filter = {
      status: {
          eq: 'pending' // filter priority = 1
      }
  };

    const apiData = await API.graphql(graphqlOperation(listTrips,
       { limit: 1000 }));
    this.state.queryData = apiData.data.listTrips.items;

    var myCustomers = [];
    //console.log(this.state.queryData)
    var d = new Date();
    console.log(d.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
    year: 'numeric'}))
    this.state.queryData.sort(this.sortByTime).sort(this.sortByDate).map((customer) => {

      //console.log(customer.wheelchair)
      var e = new Date(customer.appointmentDate);
      if(e.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'}) ===  d.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'}) ){
      myCustomers.push({
      id: customer.id,
      fname: customer.fname,
      lname: customer.lname,
      address: customer.address,
      address2: customer.address2,
      phone: customer.phoneNumber,
      wheelchair: customer.wheelchair,
      driver: customer.driver,
      appointmentTime: customer.appointmentTime,
      route:customer.pickupStatus,
      status:customer.pickupTime,
      statusTime:(customer.pickupStatusTime) ? 'Picked up at: ' + customer.pickupStatusTime : customer.pickupStatusTime,
      arrivedTime:(customer.arrivedTime) ?'Arrived at: ' + customer.arrivedTime :customer.arrivedTime,


      });
    }
      //console.log(customer.wheelchair)

  })
  this.setState({
    data: {
      ...this.state.data, // merge with the original `state.items`
      rows: this.state.data.rows.concat(myCustomers)
    }
  });

  }















sortByTime =(b, a) => {
  if (a.appointmentTime < b.appointmentTime) {
      return 1;
  }
  if (a.appointmentTime > b.appointmentTime) {
      return -1;
  }
  return 0;
}

sortByDate =(b, a) => {
  if (a.appointmentDate < b.appointmentDate) {
      return 1;
  }
  if (a.appointmentDate > b.appointmentDate) {
      return -1;
  }
  return 0;
}



  render() {
  return (
<MDBContainer>
    <MDBDataTableV5
    hover entriesOptions={[5, 20, 25]} entries={20} pagesAmount={4}
    searchTop
   btn

    searchBottom={false}
    barReverse
    noBottomColumns


    data={this.state.data}
/>


     </MDBContainer>

  );
}
  }

export default TripReady;