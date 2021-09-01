import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDataTableV5,MDBFormInline, MDBInput } from 'mdbreact';
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class ViewTrips extends React.Component {
  constructor(props) {
    super(props)

  this.state = {
    queryData:'',
    modal: false,
    radio: '',
    data:{
    columns: [


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



    const apiData = await API.graphql(graphqlOperation(listTrips));
    this.state.queryData = apiData.data.listTrips.items;

    var myCustomers = [];
    //console.log(this.state.queryData)

    this.state.queryData.map((customer) => {


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
      button: <MDBBtn color='danger'  outline rounded>Status</MDBBtn>

      });

  })
  this.setState({
    data: {
      ...this.state.data, // merge with the original `state.items`
      rows: this.state.data.rows.concat(myCustomers)
    }
  });
  }


  handleRowClick  = () =>{
if(this.state.radio == "")
{
alert("Please make a selection. ")
return;

}
    var updateTrip = {
      id: this.state.localData.id,
      status: this.state.status
    };


    API.graphql(graphqlOperation( mutations.updateTrip,{input: updateTrip})).then(( )=> {
      alert('Trip Updated. ')
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


  render() {
  return (
<MDBContainer>
    <MDBDataTableV5
    hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4}
    searchTop
    searching={true}
   btn
   proSelect

    searchBottom={false}
    barReverse
    noBottomColumns
    order={['status', 'asc' ]}
   data={this.state.data}
/>

     <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
       <div className='text-center'>
       <MDBModalHeader toggle={this.toggle} >Trip Status</MDBModalHeader>
       </div>
       <MDBModalBody>
       <MDBFormInline>
        <MDBInput
          onClick={this.onClick(1)}
          checked={this.state.radio === 1 ? true : false}
          label='Pending'
          type='radio'
          id='radio1'
          containerClass='mr-5'
          onChange={this.handleChange}
        />
        <MDBInput
          onClick={this.onClick(2)}
          checked={this.state.radio === 2 ? true : false}
          label='Complete'
          type='radio'
          id='radio2'
          containerClass='mr-5'
          onChange={this.handleChange1}
        />
        <MDBInput
          onClick={this.onClick(3)}
          checked={this.state.radio === 3 ? true : false}
          label='Canceled'
          type='radio'
          id='radio3'
          containerClass='mr-5'
          onChange={this.handleChange2}
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

export default ViewTrips;