import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDataTableV5, MDBFormInline, MDBInput } from 'mdbreact';
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
            label: 'ID',
            field: 'id',
            sort: 'asc',
            width: 100,
          },
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
            label: 'Pay',
            field: 'payButton',
            width: 100,
        },
          {
            label: 'Edit ',
            field: 'editButton',
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
   this.setState({payData: JSON.parse(localStorage.getItem("payData")) || []});
    //this.setState({payData: {pay: JSON.parse(localStorage.getItem("payData"))}})
    console.log(JSON.parse(localStorage.getItem("payData")))

    const apiData = await API.graphql(graphqlOperation(listEmployees));
    this.setState({ queryData: apiData.data.listEmployees.items });

    var myEmployee = [];

    this.state.queryData.map(customer => {
      myEmployee.push({
        id: customer.id,
        fname: customer.firstName,
        lname: customer.lastName,
        phone: customer.phoneNumber,
        email: customer.emailAddress,
        payButton: (<MDBBtn rounded outline color="success" onClick={this.toggleModalPay}>Pay</MDBBtn>
        ),
        editButton: (

          <MDBBtn rounded outline color="warning" onClick={() => this.editEmployee(customer.id)}>
            Edit
          </MDBBtn>
        ),
        myButton: (
          <MDBBtn rounded outline color="danger" onClick={this.getCellValue}>
            Delete
          </MDBBtn>
        ),
      });
    });

    this.setState({
      data: {
        ...this.state.data,
        rows: myEmployee,
      },
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
        <MDBModal isOpen={this.state.modalPay} toggle={this.toggleModalPay}>
  <MDBModalHeader toggle={this.toggleModalPay}>Add Pay</MDBModalHeader>
  <MDBModalBody>
    <table>
      <thead>
        <tr>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>Th</th>
          <th>F</th>
          <th>S</th>
          <th>Sn</th>
        </tr>
        <tr>
          <td>

            <MDBInput name="pay" value={this.state.payData.pay} label="Pay" type="text" onChange={this.handleChangePay} />

          </td>
          <td>
          <MDBInput name="pay" value={this.state.payData.pay} label="Pay" type="text" onChange={this.handleChangePay} />

          </td>
          <td>
          <MDBInput name="pay" value={this.state.payData.pay} label="Pay" type="text" onChange={this.handleChangePay} />

          </td>
          <td>
          <MDBInput name="pay" value={this.state.payData.pay} label="Pay" type="text" onChange={this.handleChangePay} />

          </td>
          <td>
          <MDBInput name="pay" value={this.state.payData.pay} label="Pay" type="text" onChange={this.handleChangePay} />

          </td>
          <td>
          <MDBInput name="pay" value={this.state.payData.pay} label="Pay" type="text" onChange={this.handleChangePay} />

          </td>
          <td>
          <MDBInput name="pay" value={this.state.payData.pay} label="Pay" type="text" onChange={this.handleChangePay} />

          </td>
        </tr>
      </thead>
      </table>
    <MDBBtn color="primary" onClick={this.handlePay}>Add</MDBBtn>
    <MDBBtn color="danger" onClick={this.toggleModalPay}>Cancel</MDBBtn>
  </MDBModalBody>
</MDBModal>



        <MDBBtn onClick={() => this.setState({ modal: true })}>Add Employee</MDBBtn>
          <MDBModal isOpen={this.state.modal} toggle={this.handleModalClose}>
            <MDBModalHeader toggle={this.handleModalClose}>Edit Employee</MDBModalHeader>
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
          </MDBModal>
          <MDBDataTableV5
            hover
            data={data}
            entries={5}
            entriesOptions={[5, 10, 15]}
            pagesAmount={4}
           // activePage={1}
          />

        </MDBContainer>
      </div>
    );
  }
}


export default Drivers;