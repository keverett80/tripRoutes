import React from 'react';
import { MDBContainer, MDBDatatable,  MDBTabsPane, MDBTabsContent, MDBNavbar, MDBNavbarItem, MDBNavbarLink, MDBIcon } from 'mdb-react-ui-kit';
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips, listEmployees} from '../../graphql/queries';
import { Tooltip as ReactTooltip } from 'react-tooltip'




class DriverStatus extends React.Component {
  constructor(props) {
    super(props)

  this.state = {


    lng: '',
    lat:'',
    zoom: 9,
    activeItemJustified: "1",
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
        label: <p data-tip="First Name">FN</p>,
        field: 'fname',
        width: 300,

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
this.mapContainer = React.createRef();

  }





  async componentDidMount(){
    window.dispatchEvent(new Event('resize'));







    let filter = {
      or: [{ status: {eq:'complete'} },
           { status: {eq:'pending'} }]
  };
    const apiData = await API.graphql(graphqlOperation(listTrips,
        { filter: filter,limit: 1000 }));
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





  toggleJustified = tab => e => {
    if (this.state.activeItemJustified !== tab) {
      this.setState({
        activeItemJustified: tab
      });
    }
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



    <MDBDatatable
search

    data={this.state.data}
/>
<ReactTooltip />


     </MDBContainer>

  );
}
  }

export default DriverStatus;