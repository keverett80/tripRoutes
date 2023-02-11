import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDatatable,MDBFormInline, MDBInput,MDBModalDialog,
  MDBModalContent, } from 'mdb-react-ui-kit';
import { API,  graphqlOperation } from "aws-amplify";
import { listEmployees, listVehicles } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import $ from "jquery";


class Vehicles extends React.Component {
  constructor(props) {
    super(props)

  this.state = {
    myId:'',
    queryData:'',
    modal: false,
    make:'',
    model: '',
    color:'',
    tag:'',
    data:{
    columns: [



      {
        label: 'Make',
        field: 'make',
        sort: 'asc',
        width: 100,

      },
      {
        label: 'Model',
        field: 'model',
        width: 100,
      },
      {
        label: 'Tag',
        field: 'tag',

        width: 100,
      },
      {
        label: 'Color',
        field: 'color',
        width: 100,
      },
      {
        label: 'Button ',
        field: 'myButton',

        width: 100,
      },



    ],
    rows: [

    ],
  },
  localData:[]

}


  }





  async componentDidMount(){

    const apiData = await API.graphql(graphqlOperation(listVehicles));
    this.state.queryData = apiData.data.listVehicles.items;

    var myVehicles = [];
    //console.log(this.state.queryData)

    this.state.queryData.map((customer) => {


      myVehicles.push({
      id: customer.id,
      make: customer.make,
      model: customer.model,
      color: customer.color,
      tag: customer.tagNumber,
      myButton: <MDBBtn rounded outline color='danger' onClick={this.getCellValue}>Delete</MDBBtn>

      });


  })
  this.setState({
    data: {
      ...this.state.data, // merge with the original `state.items`
      rows: this.state.data.rows.concat(myVehicles)
    }
  });

  }
  getCellValue =()=>{

    var myThis = this;
        $("body").on("click", "tr", function () {



          myThis.setState({ myId: $(this).children().eq(0).text()});



          myThis.submit();
        });

    }
    deleteVehicle  = () =>{


    const vehicleDetails = {
      id: this.state.myId,
    };

   API.graphql({ query: mutations.deleteVehicle, variables: {input: vehicleDetails}}).then(()=>{
    alert('Vehicle Deleted. ')
     window.location.reload();
  });
    }

  addVehicle  = () =>{
if(this.state.make == "" || this.state.model == '' || this.state.color == '' ||this.state.tag == '')
{
alert("All fields are required. ")
return;

}
    var addVehicle = {

      make: this.state.make,
      model: this.state.model,
      color: this.state.color,
      tagNumber: this.state.tag
    };


    API.graphql(graphqlOperation( mutations.createVehicle,{input: addVehicle})).then(( )=> {
      alert('Vehicle has beed added. ')
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
          onClick: () =>  this.deleteVehicle()

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


  calculateAutofocus = (a) => {
    if (this.state['formActivePanel' + a + 'Changed']) {
      return true
    }
  }




  render() {
  return (
<MDBContainer>
<div className="text-center"> <MDBBtn onClick={this.toggle}>Add Vehicle</MDBBtn></div>
    <MDBDatatable

data={this.state.data}
/>

     <MDBModal show={this.state.modal} >
     <MDBModalDialog>
          <MDBModalContent>

       <div className='text-center'>
       <MDBModalHeader >Add Employee</MDBModalHeader>
       </div>
       <MDBModalBody>
       <div className="text-left">
        <MDBInput  value={this.state.make} onChange={event => this.setState({phone: event.target.value})}  label="Make" className="mt-4" autoFocus={this.calculateAutofocus(1)} />
            <MDBInput value={this.state.model} onChange={event => this.setState({phone: event.target.value})}   label="Model" className="mt-4" />
            <MDBInput value={this.state.tagNumber} onChange={event => this.setState({phone: event.target.value})}    label="Tag" className="mt-4" />
            <MDBInput value={this.state.color} onChange={event => this.setState({phone: event.target.value})}  label="Color" className="mt-4" />
            </div>
       </MDBModalBody>
       <MDBModalFooter>
         <MDBBtn rounded color="secondary" outline onClick={this.toggle}>Close</MDBBtn>
         <MDBBtn color="primary" rounded outline onClick={this.addVehicle}>Add Vehicle</MDBBtn>
       </MDBModalFooter>
       </MDBModalContent>
        </MDBModalDialog>
     </MDBModal>
     </MDBContainer>

  );
}
  }

export default Vehicles;