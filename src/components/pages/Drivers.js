import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,  MDBDatatable,  MDBInput,  MDBModalDialog,
  MDBModalContent, } from 'mdb-react-ui-kit';
import { API, graphqlOperation } from 'aws-amplify';
import { listEmployees } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

class Drivers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalPay: false,
    payData:{
      pay: '',
    },
      myId: '',
      queryData: '',
      modal: false,
      fname: '',
      lname: '',
      phone: '',
      email: '',
      daysWorked: '',
      payPerDay: '',
      modalAdd: false,
      data: {
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
          },






          {
            label: 'Delete ',
            field: 'myButton',
            width: 100,
          },
        ],
        rows: [],
      },
      localData: [],
    };
  }

  async componentDidMount() {
    const apiData = await API.graphql(graphqlOperation(listEmployees));
    this.state.queryData = apiData.data.listEmployees.items;

    var myEmployee = [];
    //console.log(this.state.queryData)

    this.state.queryData.map((customer) => {


      myEmployee.push({
      id: customer.id,
      fname: customer.firstName,
      lname: customer.lastName,
      phone: customer.phoneNumber,
      email: customer.emailAddress,
      myButton: <MDBBtn rounded outline color='danger' onClick={this.getCellValue}>Delete</MDBBtn>

      });


  })
  this.setState({
    data: {
      ...this.state.data, // merge with the original `state.items`
      rows: this.state.data.rows.concat(myEmployee)
    }
  });
  }



  toggleModalPay = () => {
    this.setState({
        modalPay: !this.state.modalPay,
    });
}

handleChangePay = (e) => {
  this.setState({ payData: { ...this.state.payData, [e.target.name]: e.target.value } });
}


handlePay = () => {
  let payData = JSON.parse(localStorage.getItem("payData")) || []
  payData.push(this.state.payData)
  this.setState({payData: payData});
  localStorage.setItem("payData", JSON.stringify(payData))
  this.toggleModalPay();
}




  getCellValue =()=>{

    var myThis = this;
        $("body").on("click", "tr", function () {



          myThis.setState({ myId: $(this).children().eq(0).text()});



          myThis.submit();
        });

    }
    deleteEmployee  = () =>{


    const employeeDetails = {
      id: this.state.myId,
    };

 API.graphql({ query: mutations.deleteEmployee, variables: {input: employeeDetails}}).then(()=>{
    alert('Employee Deleted. ')
     window.location.reload();
 });

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
      phoneNumber: this.state.phone,
      token: ''

    };


    API.graphql(graphqlOperation( mutations.createEmployee,{input: addEmployee , limit: 1000 })).then(( )=> {
      alert('Employee has been added. ')
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
          onClick: () =>  this.deleteEmployee()

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
    //console.log(value);
    this.setState({fname: value});

  };
  getLNValue = value => {
    //console.log(value);
    this.setState({lname: value});

  };
  getPhoneValue = value => {
    //console.log(value);
    this.setState({phone: value});

  };
  getEmailValue = value => {
    //console.log(value);
    this.setState({email:value});

  };
  calculateAutofocus = (a) => {
    if (this.state['formActivePanel' + a + 'Changed']) {
      return true
    }
  }
  editEmployee = (id) => {
    const employee = this.state.queryData.find((employee) => employee.id === id);
    this.setState({
      modal: true,
      employeeId: id,
      fname: employee.firstName,
      lname: employee.lastName,
      phone: employee.phoneNumber,
      email: employee.emailAddress,
    });
  }

  updateEmployee = async () => {
    const updatedEmployee = {
      id: this.state.employeeId,
      firstName: this.state.fname,
      lastName: this.state.lname,
      emailAddress: this.state.email,
      phoneNumber: this.state.phone,
    };
    try {
      await API.graphql(
        graphqlOperation(mutations.updateEmployee, { input: updatedEmployee })
      );

      const apiData = await API.graphql(graphqlOperation(listEmployees)).then(apiData => {
        this.setState({
          queryData: apiData.data.listEmployees.items,
          modal: false,
          employeeId: "",
          fname: "",
          lname: "",
          phone: "",
          email: "",
        });
        alert("Employee updated successfully.");
        location.reload();
      });

    } catch (err) {
      console.log("Error updating employee:", err);

    }
  }

  handleModalClose = () => {
    this.setState({
      modal: false,
      employeeId: "",
      fname: "",
      lname: "",
      phone: "",
      email: "",
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <MDBContainer>



        <MDBBtn onClick={() => this.setState({ modal: true })}>Add Employee</MDBBtn>
          <MDBModal show={this.state.modal} >
          <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>Edit Employee</MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                label="First Name"
                value={this.state.fname}
                onChange={(e) => this.setState({ fname: e.target.value })}
              />
              <MDBInput
                label="Last Name"
                value={this.state.lname}
                onChange={(e) => this.setState({ lname: e.target.value })}
              />
              <MDBInput
                label="Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <MDBInput
                label="Phone"
                value={this.state.phone}
                onChange={(e) => this.setState({ phone: e.target.value })}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.handleModalClose}>
                Close
              </MDBBtn>
              <MDBBtn color="primary" onClick={this.updateEmployee}>
                Save changes
              </MDBBtn>
            </MDBModalFooter>
            </MDBModalContent>
        </MDBModalDialog>
          </MDBModal>
          <MDBDatatable

            data={data}

          />

        </MDBContainer>
      </div>
    );
  }
}


export default Drivers;