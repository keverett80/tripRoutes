import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDatatable,MDBFormInline, MDBTimepicker, MDBSelect,  MDBModalDialog,
  MDBModalContent } from 'mdb-react-ui-kit';
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips, listEmployees } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import './timePicker.css'; // Import css


class AddDriver extends React.Component {
  constructor(props) {
    super(props)

  this.state = {
    employeeToken: '',
    employeePhone:'',
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
        label: 'First Name',
        field: 'fname',
        width: 50,

      },
      {
        label: 'Last Name',
        field: 'lname',
        width: 50,
      },
      {
        label: 'Pickup Address',
        field: 'address',
        width: 200,
      },


      {
        label: 'Appointment Date',
        field: 'appointmentDate',
        sort: 'disabled',
        width: 50,
      },
      {
        label: 'Appointment Time',
        field: 'appointmentTime',
        sort: 'disabled',
        width: 50,
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

    this.state.queryData.sort(this.sortByTime).sort(this.sortByDate).map((customer) => {
      const appointmentDate = new Date(customer.appointmentDate);
      const currentDate = new Date();

      if(appointmentDate.setHours(0,0,0,0) >= currentDate.setHours(0,0,0,0)){
      myCustomers.push({
      id: customer.id||'',
      fname: customer.fname||'',
      lname: customer.lname||'',
      address: customer.address||'',
      address2: customer.address2||'',
      phone: customer.phoneNumber||'',
      wheelchair: customer.wheelchair||'',
      roundtrip: customer.roundtrip||'',
      driver: customer.driver||'',
      appointmentDate: customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'})||'',
      appointmentTime: customer.appointmentTime||'',
      status:customer.pickupTime||'',
      button: <MDBBtn color='success' onClick={() => this.toggle(customer)} outline rounded>Assign Employee</MDBBtn>

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
    console.log(this.state.driver )
    let filter = {
      emailAddress: {
          eq: this.state.driver // filter priority = 1
      }
  };
   const employeeData  = await API.graphql({ query: listEmployees, variables: { filter: filter}});

const employeePhone = employeeData.data.listEmployees.items[0].phoneNumber



this.handleRowClick(employeePhone);


  }



  handleRowClick  = (employeePhone) =>{
    const appLink = encodeURIComponent('com.fivegservices.fivegtrips://');
    fetch(`https://vsji3ei487.execute-api.us-east-2.amazonaws.com/dev/items?recipient=${employeePhone}&textmessage=A%20new%20Five%20G%20Trip%20is%20in%20your%20portal.%20`)
      .then(response => {
        // handle response
        console.log(response)
      })
      .catch(error => {
        // handle error
        console.log(error);
      });




    var updateTrip = {
      id: this.state.localData.id,
      driver: this.state.driver,
      pickupTime: this.state.pickupTime,
      trip: '1'
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

    //console.log(data)

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


  this.setState({ driver: value.value});

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
      return  1;
  }
  if (a.appointmentDate > b.appointmentDate) {
      return  -1;
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
    <MDBDatatable
search
    data={this.state.data}
/>

     <MDBModal nonInvasive={true} staticBackdrop show={this.state.modal}>
     <MDBModalDialog>
          <MDBModalContent>
       <div className='text-center'>
       <MDBModalHeader >Assign Driver</MDBModalHeader>
       </div>

       <MDBModalBody>


       <div className='text-center'>
       <div className='text-primary'><a>Employee</a></div>
        <MDBSelect
          data={this.state.employee}
          selected="Assign Employee"

          onValueChange={this.handleAssign}
        />
<div className='text-primary'><a>Pickup Time</a></div>

        <MDBTimepicker  increment  inputID="timePicker" customIconSize='2x' customIcon='fa fa-business-time'  onChange={this.getPickerValue} />

        </div>
       </MDBModalBody>

       <MDBModalFooter>
         <MDBBtn rounded color="secondary" outline onClick={this.toggle}>Close</MDBBtn>
         <MDBBtn color="primary" rounded outline onClick={this.fetchToken}>Save changes</MDBBtn>
       </MDBModalFooter>
       </MDBModalContent>
        </MDBModalDialog>
     </MDBModal>
     </MDBContainer>

  );
}
  }

export default AddDriver;