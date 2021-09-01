import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDataTableV5,MDBFormInline, MDBInput, MDBSelect } from 'mdbreact';
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips, listEmployees } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class AddDriver extends React.Component {
  constructor(props) {
    super(props)

  this.state = {
    driver:'',
    queryData:'',
    queryEmployee:'',
    modal: false,
    radio: '',
    employee:[],
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
        label: 'Status',
        field: 'status',

        width: 100,
      },
         {
        label: 'Assigned Driver',
        field: 'driver',

        width: 100,
      },
      {

        label: 'Select',
        field: 'button'
      }
    ],
    rows: [

    ],
  },
  localData:[]


}

this.handleRowClick = this.handleRowClick.bind(this)
  }





  async componentDidMount(){
    let filter = {
      status: {
          eq: 'pending' // filter priority = 1
      }
  };

    const apiData = await API.graphql(graphqlOperation(listTrips,{filter:filter}));
    this.state.queryData = apiData.data.listTrips.items;

    var myCustomers = this.state.data.rows;
    //console.log(this.state.queryData)

    this.state.queryData.map((customer) => {

      //console.log(customer.wheelchair)
      myCustomers.push({
      id: customer.id,
      fname: customer.fname,
      lname: customer.lname,
      address: customer.address,
      address2: customer.address2,
      wheelchair: customer.wheelchair,
      roundtrip: customer.roundtrip,
      driver: customer.driver,
      appointmentDate: customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'}),
      appointmentTime: customer.appointmentTime,
      status:customer.status,
      clickEvent: (data) => this.toggle(data),
      button: <MDBBtn color='success'  outline rounded>Assign Employee</MDBBtn>

      });
      //console.log(customer.wheelchair)
      this.forceUpdate();
  })
  this.state.data.rows = myCustomers;
  this.getEmployee();
  this.forceUpdate();

  }

  getEmployee = () =>{

var myThis = this;


  const apiData =  API.graphql(graphqlOperation(listEmployees)).then(function(results)
  {
    myThis.state.queryEmployee = results.data.listEmployees.items;

    var myEmployee= myThis.state.employee;
    //console.log(myThis.state.queryEmployee)

    myThis.state.queryEmployee.map((customer) => {

      //console.log(customer.emailAddress)
      myEmployee.push({
      text: customer.firstName + ' ' + customer.lastName ,
      value: customer.emailAddress,




      });

      myThis.forceUpdate();
  })
  myThis.state.employee= myEmployee;
  myThis.forceUpdate();
  })

  }




  handleRowClick  = () =>{

    var updateTrip = {
      id: this.state.localData.id,
      driver: this.state.driver[0]
    };


    API.graphql(graphqlOperation( mutations.updateTrip,{input: updateTrip})).then(( )=> {
      alert('Driver Added. ')
       window.location.reload();
    })

  }

  submit = () => {

    confirmAlert({
      title: 'Confirm Update',
      message: 'Are you sure you want to update this? ',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>  this.handleRowClick()

        },
        {
          label: 'No',
          onClick:() =>  this.myReturn()
        }
      ]
    });
  };

 myReturn = () =>
  {
    return;
  }

  toggle = (data) => {

    //console.log(this.state.employee[0].emailAddress)

    this.setState({
      modal: !this.state.modal
    });
    this.state.localData = data
    //console.log(this.state.localData)
  }
  onClick = nr => () => {
    this.setState({
      radio: nr
    });
  };
handleChange = () =>{

  this.setState({
    status: 'pending'
  });
}
handleChange1 = () =>{

  this.setState({
    status: 'complete'
  });
  }

  handleChange2 = () =>{

    this.setState({
      status: 'canceled'
    });
    }

    handleAssign = value => {


  this.setState({ driver: value});

};


  render() {
  return (
<MDBContainer>
    <MDBDataTableV5
    hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4}
    searchTop
   btn

    searchBottom={false}
    barReverse
    noBottomColumns
    order={['status', 'asc' ]}
    columns={this.state.data.columns}
    rows={this.state.data.rows}
/>

     <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
       <div className='text-center'>
       <MDBModalHeader toggle={this.toggle} >Assign Employee</MDBModalHeader>
       </div>
       <MDBModalBody>
       <MDBFormInline>
        <MDBSelect
          options={this.state.employee}
          selected="Assign Employee"
          label="Employee"
          getValue={this.handleAssign}
        />
      </MDBFormInline>
       </MDBModalBody>
       <MDBModalFooter>
         <MDBBtn rounded color="secondary" outline onClick={this.toggle}>Close</MDBBtn>
         <MDBBtn color="primary" rounded outline onClick={this.handleRowClick}>Save changes</MDBBtn>
       </MDBModalFooter>
     </MDBModal>
     </MDBContainer>

  );
}
  }

export default AddDriver;