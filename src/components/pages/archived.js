import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDatatable, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips, listInvoice } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const getDaysArray = function(start, end) {
  for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt));
  }
  return arr;
};

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
class ViewTrips extends React.Component {
  constructor(props) {
    super(props)



  this.state = {
    myPo: '',
    queryData:'',
    modal: false,
    radio: '',
    startDate: new Date(today),
    endDate: new Date(today),
    status:'',
    data:{
    columns: [

      {
        label: 'ID',
        field: 'id',
        width: 100,

      },

      {

        label: 'Select',
        field: 'button'
      },

      {
        label: 'Status',
        field: 'status',

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


    ],
    rows: [

    ],
  },
  localData:[]

}

this.handleRowClick = this.handleRowClick.bind(this)
  }

  async componentDidMount(){

    this.getData();
  }





 getData = async() =>{



    const apiData = await API.graphql(graphqlOperation(listTrips, { limit: 1000 }));


    var myCustomers = [];
    //console.log(this.state.queryData)

    apiData.data.listTrips.items.sort(this.sortByTime).sort(this.sortByDate).map((customer) => {

      if(customer.status !== 'pending'){
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
      appointmentDate: customer.appointmentDate,
      appointmentTime: customer.appointmentTime,
      status:customer.status,
      cost: customer.cost,
      broker:customer.broker,
      distance: customer.distance,
      trip: customer.trip,
      clickEvent: (data) => this.toggle(data),
      button: <MDBBtn color='danger'  outline rounded>Status</MDBBtn>

      });
    }


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


    API.graphql(graphqlOperation( mutations.updateTrip,{input: updateTrip, limit: 1000 })).then(( )=> {
      //alert('Trip Updated. ')
       this.setState({modal: false})
    this.setState({data: this.state.data})
    if(this.state.status === "complete" && this.state.localData.trip === '1')
    {
this.generateInvoice(this.state.localData);
    }
    else{
    alert('Updated');
    location.reload()
    }
    })

  }

  generateInvoice = async (data) =>{

   var invoiceNumber = data.id.split('-')[0]

console.log(data);
const invoiceDetails = {
poNumber: invoiceNumber,
name: data.fname + ' ' + data.lname,
broker: data.broker,
date: data.appointmentDate,
product: data.roundtrip + ' ' + data.wheelchair,
cost: data.cost,
distance: data.distance,
address: data.address,
};

const newInvoice = await API.graphql({ query: mutations.createInvoice, variables: {input: invoiceDetails}}).then(( )=> {

 alert('Updated');
    location.reload()

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
setStartDate = (value) => {
  this.setState({
    startDate: value
  });

  var result =this.state.data.rows.filter(a => {
    var date = new Date(a.appointmentDate);
    return (date >= this.state.startDate && date <= this.state.endDate);
  });
  console.log(result)

  this.setState({
    data: {
      ...this.state.data, // merge with the original `state.items`
      rows: this.state.data.rows.concat(result)
    }
  });

  this.getData();

}
setEndDate = (value) => {
  this.setState({
    endDate: value
  });

  var result =this.state.data.rows.filter(a => {
    var date = new Date(a.appointmentDate);
    return (date >= this.state.startDate && date <= this.state.endDate);
  });
  console.log(result)
  this.setState({
    data: {
      ...this.state.data, // merge with the original `state.items`
      rows: this.state.data.rows.concat(result)
    }
  });
  this.getData();

}




  render() {
  return (
<MDBContainer>

    <MDBDatatable
     onPageChange={ value => console.log(value) }

    hover entriesOptions={[5, 20, 25]}
    entries={10}
    pagesAmount={4}

    searchTop
    searchBottom={false}

   exportToCSV




    noBottomColumns
    order={['status', 'asc' ]}
   data={this.state.data}


/>

     <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
       <div className='text-center'>
       <MDBModalHeader toggle={this.toggle} >Trip Status</MDBModalHeader>
       </div>
       <MDBModalBody>
       <form>
        <MDBInput
          onClick={this.onClick(1)}
          checked={this.state.radio === 1 ? true : false}
          label='Pending'
          type='radio'
          id='radio1'
          className='mr-5'
          onChange={this.handleChange}
        />
        <MDBInput
          onClick={this.onClick(2)}
          checked={this.state.radio === 2 ? true : false}
          label='Complete'
          type='radio'
          id='radio2'
          className='mr-5'
          onChange={this.handleChange1}
        />
        <MDBInput
          onClick={this.onClick(3)}
          checked={this.state.radio === 3 ? true : false}
          label='Canceled'
          type='radio'
          id='radio3'
          className='mr-5'
          onChange={this.handleChange2}
        />
      </form>
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