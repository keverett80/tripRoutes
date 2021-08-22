import React from 'react';
import { MDBDataTableV5, MDBBtn } from 'mdbreact';
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips } from '../../graphql/queries';


class ViewTrips extends React.Component {
  constructor(props) {
    super(props)

  this.state = {
    queryData:'',
    data:{
    columns: [


      {
        label: 'First Name',
        field: 'fname',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Last Name',
        field: 'lname',
        width: 150,
      },
      {
        label: 'Pickup Address',
        field: 'address',
        width: 200,
      },
      {
        label: 'Destination Address',
        field: 'address2',
        sort: 'asc',
        width: 200,
      },
      {
        label: 'Wheelchair',
        field: 'wheelchair',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'Round Trip',
        field: 'roundtrip',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'Appointment Date',
        field: 'appointmentDate',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'Appointment Time',
        field: 'appointmentTime',
        sort: 'disabled',
        width: 100,
      },
      {

        label: 'Select',
        field: 'button'
      }
    ],
    rows: [

    ],
  }

}
  }





  async componentDidMount(){

    const apiData = await API.graphql(graphqlOperation(listTrips));
    this.state.queryData = apiData.data.listTrips.items;

    var myCustomers = this.state.data.rows;
    console.log(this.state.queryData)

    this.state.queryData.map((customer) => {

      console.log(customer.wheelchair)
      myCustomers.push({
      fname: customer.fname,
      lname: customer.lname,
      address: customer.address,
      address2: customer.address2,
      wheelchair: customer.wheelchair,
      roundtrip: customer.roundtrip,
      appointmentDate: customer.appointmentDate,
      appointmentTime: customer.appointmentTime,
      clickEvent: (data) => this.handleRowClick(data),
      button: <MDBBtn color='danger' outline rounded>Delete</MDBBtn>

      });
      console.log(customer.wheelchair)
      this.forceUpdate();
  })
  this.state.data.rows = myCustomers;
  this.forceUpdate();
  }

  handleRowClick  = (data) =>{

    console.log(data)
  }
  render() {
  return (

    <MDBDataTableV5
    hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4}
    searchTop
    searchBottom={false}
    barReverse


    columns={this.state.data.columns}
    rows={this.state.data.rows}
/>

  );
}
  }

export default ViewTrips;