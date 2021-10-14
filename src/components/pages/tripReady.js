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
        label: 'Pickup Time',
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

    const apiData = await API.graphql(graphqlOperation(listTrips,
       { limit: 1000, filter:filter}));
    this.state.queryData = apiData.data.listTrips.items;

    var myCustomers = [];
    //console.log(this.state.queryData)
    var d = new Date();
    console.log(d.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
    year: 'numeric'}))
    this.state.queryData.sort(this.sortByTime).sort(this.sortByDate).map((customer) => {

      //console.log(customer.wheelchair)
      var e = new Date(customer.appointmentDate);
      if(customer.appointmentTime == 'Will Call' && e.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
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
      roundtrip: customer.roundtrip,
      driver: customer.driver,
      appointmentDate: customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'}),
      appointmentTime: customer.appointmentTime,
      status:customer.pickupTime,
      clickEvent: (data) => this.toggle(data),
      button: <MDBBtn color='success'  outline rounded>Assign Employee</MDBBtn>

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
  this.getEmployee();
  }

  getEmployee = () =>{

var myThis = this;


API.graphql(graphqlOperation(listEmployees)).then(function(results)
  {

    var myEmployee= [{
      text: 'None' ,
      value: '',
    }
    ];


    results.data.listEmployees.items.map((customer) => {

      myEmployee.push({
      text: customer.firstName + ' ' + customer.lastName ,
      value: customer.emailAddress,

      });


  })
 // myThis.state.employee= myEmployee;
  myThis.setState({
employee: myEmployee

  });
  })

  }

  fetchToken = async () =>{

    let filter = {
      emailAddress: {
          eq: this.state.driver[0] // filter priority = 1
      }
  };
   const employeeData  = await API.graphql({ query: listEmployees, variables: { filter: filter}});
const employeeToken = employeeData.data.listEmployees.items[0].token
this.setState({employeeToken:employeeToken})


this.handleRowClick();


  }




  handleRowClick  = () =>{

    fetch('https://exp.host/--/api/v2/push/send', {
      'mode': 'no-cors',
      'method': 'POST',
      'headers': {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
  body: JSON.stringify({
    to: this.state.employeeToken,

    title: 'Ready Pickup',
    body: 'A member is ready for pickup! ',
    sound: "default",
  }),
})

    var updateTrip = {
      id: this.state.localData.id,
      driver: this.state.driver[0],
      pickupTime: this.state.pickupTime,
      trip: '2'
    };


    API.graphql(graphqlOperation( mutations.updateTrip,{input: updateTrip})).then(( )=> {
  alert('Updated. ')
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

getPickerValue = value => {
  console.log(value);

  this.setState({ pickupTime: value});
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


    data={this.state.data}
/>

     <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
       <div className='text-center'>
       <MDBModalHeader toggle={this.toggle} >Assign Driver</MDBModalHeader>
       </div>

       <MDBModalBody>


       <div className='text-center'>
       <div className='text-primary'><a>Employee</a></div>
        <MDBSelect
          options={this.state.employee}
          selected="Assign Employee"

          getValue={this.handleAssign}
        />
<div className='text-primary'><a>Pickup Time</a></div>

        <MDBTimePicker id="timePicker" getValue={this.getPickerValue} />

        </div>
       </MDBModalBody>

       <MDBModalFooter>
         <MDBBtn rounded color="secondary" outline onClick={this.toggle}>Close</MDBBtn>
         <MDBBtn color="primary" rounded outline onClick={this.fetchToken}>Save changes</MDBBtn>
       </MDBModalFooter>
     </MDBModal>
     </MDBContainer>

  );
}
  }

export default TripReady;