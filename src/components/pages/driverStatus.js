import React from 'react';
import { MDBContainer, MDBTooltip, MDBDataTableV5} from 'mdbreact';
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips} from '../../graphql/queries';
import ReactTooltip from 'react-tooltip';
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
        label: <p data-tip="First Name">FN</p>,
        field: 'fname',
        width: 100,

      },
      {
        label: <p data-tip="Last Name">LN</p>,
        field: 'lname',
        width: 100,
      },
      {
        label: <p data-tip="Pickup Address">PA</p>,
        field: 'address',
        width: 200,
      },
      {
        label: <p data-tip="Destination Address">DA</p>,
        field: 'address2',

        width: 200,
      },
      {
        label: <p data-tip="Phone Number">PN</p>,
        field: 'phone',

        width: 100,
      },
      {
        label: <p data-tip="Type">TY</p>,
        field: 'wheelchair',

        width: 100,
      },


      {
        label: <p data-tip="Appointment Time">AT</p>,
        field: 'appointmentTime',
        sort: 'disabled',
        width: 75,
      },
      {
        label: <p data-tip="Pickup Time">PT</p>,
        field: 'status',

        width: 75,
      },
      {
        label: <p data-tip="Status">ST</p>,
        field: 'route',

        width: 75,
      },

      {
        label: <p data-tip="Time Picked Up">TPU</p>,
        field: 'statusTime',

        width: 200,
      },

      {
        label: <p data-tip="Time Arrived">TA</p>,
        field: 'arrivedTime',

        width: 200,
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
<ReactTooltip />

     </MDBContainer>

  );
}
  }

export default TripReady;