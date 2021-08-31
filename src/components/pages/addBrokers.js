import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDataTable, MDBCol, MDBFormInline, MDBIcon, MDBInput, MDBRow, MDBDataTableV5 } from 'mdbreact';
import { API,  graphqlOperation } from "aws-amplify";
import { listBrokers } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import $ from "jquery";
import './datatable.css'


class Broker extends React.Component {
  constructor(props) {
    super(props)

  this.state = {
    queryData:'',
    modal: false,
    name:'',
    phone:'',
    email:'',
    ambRate: '',
    wcRate:'',
    data:{
    columns: [

      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 100,

      },



      {
        label: 'Broker Name',
        field: 'name',
        sort: 'asc',
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
        label: 'Ambulatory Rates',
        field: 'ambRate',

        width: 100,
      },
      {
        label: 'Wheelchair Rates',
        field: 'wcRate',

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



    const apiData = await API.graphql(graphqlOperation(listBrokers));
    this.state.queryData = apiData.data.listBrokers.items;

    let myBroker = [];
    console.log(this.state.queryData)

    this.state.queryData.map((customer) => {






      myBroker.push({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      ambRate: customer.ambRate,
      wcRate: customer.wcRate,
      myButton: <MDBBtn onClick={this.getCellValue}>Button</MDBBtn>

      });



  })
  this.setState({
    data: {
      ...this.state.data, // merge with the original `state.items`
      rows: this.state.data.rows.concat(myBroker)
    }
  });


  }

getCellValue =()=>{
  var myThis = this;

    $("body").on("click", "tr", function () {



      console.log($(this).children().eq(0).text());



      //myThis.deleteSupervisor();
    });

}
  addBroker  = () =>{
if(this.state.name == "" || this.state.phone == '' ||this.state.email == '')
{
alert("All fields are required. ")
return;

}
    var addBroker = {
      id: this.state.id,
      name: this.state.name,

      email: this.state.email,
      phone: this.state.phone,
      ambRate: this.state.ambRate,
      wcRate: this.state.wcRate
    };


    API.graphql(graphqlOperation( mutations.createBroker,{input: addBroker})).then(( )=> {
      alert('Broker has beed added. ')
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

  getNameValue = value => {
    console.log(value);
    this.setState({name: value});

  };

  getPhoneValue = value => {
    console.log(value);
    this.setState({phone: value});

  };
  getEmailValue = value => {
    console.log(value);
    this.setState({email:value});

  };
  getAMBValue = value => {
    console.log(value);
    this.setState({ambRate: value});

  };
  getWCValue = value => {
    console.log(value);
    this.setState({wcRate: value});

  };
  calculateAutofocus = (a) => {
    if (this.state['formActivePanel' + a + 'Changed']) {
      return true
    }
  }

 filterItems(arr, query) {
    return arr.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }







  render() {
  return (
<MDBContainer>

<div className="text-center"> <MDBBtn onClick={this.toggle}>Add Broker</MDBBtn></div>


    <MDBDataTableV5
    hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4}
    searchTop={true}


    searchBottom={false}
    barReverse
    noBottomColumns
    data={this.state.data}
/>

     <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
       <div className='text-center'>
       <MDBModalHeader toggle={this.toggle} >Add Broker</MDBModalHeader>
       </div>
       <MDBModalBody>
       <div className="text-left">
        <MDBInput icon='user' getValue={this.getNameValue} label="Name" className="mt-4" autoFocus={this.calculateAutofocus(1)} />

            <MDBInput icon='phone' getValue={this.getPhoneValue} label="Phone Number" className="mt-4" />
            <MDBInput icon='envelope-open' getValue={this.getEmailValue} label="Email Address" className="mt-4" />
            <MDBInput icon='dollar-sign' getValue={this.getAMBValue} label="Ambulatory Rate" className="mt-4" />
            <MDBInput icon='dollar-sign' getValue={this.getWCValue} label="Wheelchair Rate" className="mt-4" />
            </div>
       </MDBModalBody>
       <MDBModalFooter>
         <MDBBtn rounded color="secondary" outline onClick={this.toggle}>Close</MDBBtn>
         <MDBBtn color="primary" rounded outline onClick={this.addBroker}>Add Broker</MDBBtn>
       </MDBModalFooter>
     </MDBModal>
     </MDBContainer>

  );
}
  }

export default Broker;