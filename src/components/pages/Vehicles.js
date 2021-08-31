import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDataTableV5,MDBFormInline, MDBInput } from 'mdbreact';
import { API,  graphqlOperation } from "aws-amplify";
import { listEmployees, listVehicles } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class Vehicles extends React.Component {
  constructor(props) {
    super(props)

  this.state = {
    queryData:'',
    modal: false,
    make:'',
    model: '',
    color:'',
    tag:'',
    data:{
    columns: [

      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 100,

      },

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
      }


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
    console.log(this.state.queryData)

    this.state.queryData.map((customer) => {


      myVehicles.push({
      id: customer.id,
      make: customer.make,
      model: customer.model,
      color: customer.color,
      tag: customer.tagNumber,

      });


  })
  this.setState({
    data: {
      ...this.state.data, // merge with the original `state.items`
      rows: this.state.data.rows.concat(myVehicles)
    }
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

  getMakeValue = value => {
    console.log(value);
    this.setState({make: value});

  };
  getModelValue = value => {
    console.log(value);
    this.setState({model: value});

  };
  getColorValue = value => {
    console.log(value);
    this.setState({color: value});

  };
  getTagValue = value => {
    console.log(value);
    this.setState({tag:value});

  };
  calculateAutofocus = (a) => {
    if (this.state['formActivePanel' + a + 'Changed']) {
      return true
    }
  }




  render() {
  return (
<MDBContainer>
<div className="text-center"> <MDBBtn onClick={this.toggle}>Add Vehicle</MDBBtn></div>
    <MDBDataTableV5
    hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4}
    searchTop


    searchBottom={false}
    barReverse
    noBottomColumns
data={this.state.data}
/>

     <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
       <div className='text-center'>
       <MDBModalHeader toggle={this.toggle} >Add Employee</MDBModalHeader>
       </div>
       <MDBModalBody>
       <div className="text-left">
        <MDBInput  getValue={this.getMakeValue} label="Make" className="mt-4" autoFocus={this.calculateAutofocus(1)} />
            <MDBInput  getValue={this.getModelValue} label="Model" className="mt-4" />
            <MDBInput  getValue={this.getTagValue} label="Tag" className="mt-4" />
            <MDBInput getValue={this.getColorValue} label="Color" className="mt-4" />
            </div>
       </MDBModalBody>
       <MDBModalFooter>
         <MDBBtn rounded color="secondary" outline onClick={this.toggle}>Close</MDBBtn>
         <MDBBtn color="primary" rounded outline onClick={this.addVehicle}>Add Vehicle</MDBBtn>
       </MDBModalFooter>
     </MDBModal>
     </MDBContainer>

  );
}
  }

export default Vehicles;