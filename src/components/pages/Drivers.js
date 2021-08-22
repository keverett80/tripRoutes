import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDataTableV5,MDBFormInline, MDBInput } from 'mdbreact';
import { API,  graphqlOperation } from "aws-amplify";
import { listEmployees } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class Drivers extends React.Component {
  constructor(props) {
    super(props)

  this.state = {
    queryData:'',
    modal: false,
    fname:'',
    lname: '',
    phone:'',
    email:'',
    data:{
    columns: [



      {
        label: 'Employee First Name',
        field: 'fname',
        sort: 'asc',
        width: 100,

      },
      {
        label: 'Employee Last Name',
        field: 'lname',
        width: 100,
      },
      {
        label: 'Email Address',
        field: 'email',
        width: 100,
      },
      {
        label: 'Phone Number',
        field: 'phone',

        width: 100,
      }

    ],
    rows: [

    ],
  },
  localData:[]

}


  }





  async componentDidMount(){

    const apiData = await API.graphql(graphqlOperation(listEmployees));
    this.state.queryData = apiData.data.listEmployees.items;

    var myEmployee = this.state.data.rows;
    console.log(this.state.queryData)

    this.state.queryData.map((customer) => {


      myEmployee.push({
      id: customer.id,
      fname: customer.firstName,
      lname: customer.lastName,
      phone: customer.phoneNumber,
      email: customer.emailAddress,

      });
      this.forceUpdate();

  })
  this.state.data.rows = myEmployee;
  this.forceUpdate();

  }


  addEmployee  = () =>{
if(this.state.fname == "" || this.state.lname == '' || this.state.phone == '' ||this.state.email == '')
{
alert("All fields are required. ")
return;

}
    var addEmployee = {

      firstName: this.state.fname,
      lastName: this.state.lname,
      emailAddress: this.state.email,
      phoneNumber: this.state.phone
    };


    API.graphql(graphqlOperation( mutations.createEmployee,{input: addEmployee})).then(( )=> {
      alert('Employee has beed added. ')
      location.reload();
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

    this.setState({
      modal: !this.state.modal
    });

  }

  getFNValue = value => {
    console.log(value);
    this.setState({fname: value});

  };
  getLNValue = value => {
    console.log(value);
    this.setState({lname: value});

  };
  getPhoneValue = value => {
    console.log(value);
    this.setState({phone: value});

  };
  getEmailValue = value => {
    console.log(value);
    this.setState({email:value});

  };
  calculateAutofocus = (a) => {
    if (this.state['formActivePanel' + a + 'Changed']) {
      return true
    }
  }




  render() {
  return (
<MDBContainer>
<div className="text-center"> <MDBBtn onClick={this.toggle}>Add Employee</MDBBtn></div>
    <MDBDataTableV5
    hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4}
    searchTop


    searchBottom={false}
    barReverse
    noBottomColumns

    columns={this.state.data.columns}
    rows={this.state.data.rows}
/>

     <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
       <div className='text-center'>
       <MDBModalHeader toggle={this.toggle} >Add Employee</MDBModalHeader>
       </div>
       <MDBModalBody>
       <div className="text-left">
        <MDBInput icon='user' getValue={this.getFNValue} label="First Name" className="mt-4" autoFocus={this.calculateAutofocus(1)} />
            <MDBInput icon='user' getValue={this.getLNValue} label="Last Name" className="mt-4" />
            <MDBInput icon='phone' getValue={this.getPhoneValue} label="Phone Number" className="mt-4" />
            <MDBInput icon='envelope-open' getValue={this.getEmailValue} label="Email Address" className="mt-4" />
            </div>
       </MDBModalBody>
       <MDBModalFooter>
         <MDBBtn rounded color="secondary" outline onClick={this.toggle}>Close</MDBBtn>
         <MDBBtn color="primary" rounded outline onClick={this.addEmployee}>Add Employee</MDBBtn>
       </MDBModalFooter>
     </MDBModal>
     </MDBContainer>

  );
}
  }

export default Drivers;