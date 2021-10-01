import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDataTableV5,MDBFormInline, MDBInput } from 'mdbreact';
import { API,  graphqlOperation } from "aws-amplify";
import { listCustomers, listTrips } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import PlacesAutocomplete from 'react-places-autocomplete';
import {Helmet} from "react-helmet";


class ViewTrips extends React.Component {
  constructor(props) {
    super(props)

  this.state = {
    queryData:'',
    modal: false,
    radio: '',
    fname: '',
    lname: '',
    email: '',
    phone:'',

    address: '',
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
        sort: 'asc',
        width: 100,


      },
      {
        label: 'Last Name',
        field: 'lname',
        width: 100,
      },
      {
        label: 'Address',
        field: 'address',
        width: 200,
      },
      {
        label: 'Phone Number',
        field: 'phone',
        width: 200,
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



    const apiData = await API.graphql(graphqlOperation(listCustomers));
    this.state.queryData = apiData.data.listCustomers.items;

    var myCustomers = [];
    //console.log(this.state.queryData)

    this.state.queryData.sort(this.sortByName).map((customer) => {


      myCustomers.push({
      id: customer.id,
      fname: customer.fname,
      lname: customer.lname,
      address: customer.address,
      email: customer.emailAddress,
      phone: this.formatPhoneNumber(customer.phoneNumber),
      clickEvent: (data) => this.toggle(data),
      button: <MDBBtn color='danger'  outline rounded>Update</MDBBtn>

      });

  })
  this.setState({
    data: {
      ...this.state.data, // merge with the original `state.items`
      rows: this.state.data.rows.concat(myCustomers)
    }
  });
  }


sortByName =(b, a) => {
  if (a.fname < b.fname) {
      return 1;
  }
  if (a.fname > b.fname) {
      return -1;
  }
  return 0;
}

  formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }


  handleRowClick  = () =>{

    var updateCustomer = {
      id: this.state.localData.id,
      fname: this.state.fname,
      lname: this.state.lname,
      phoneNumber: this.state.phone,
      emailAddress: this.state.email,
      address: this.state.address
    };


    API.graphql(graphqlOperation( mutations.updateCustomer,{input: updateCustomer})).then(( )=> {
      alert('Trip Updated. ')
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

    this.setState({
      modal: !this.state.modal
    });
    this.setState({ fname: data.fname });
    this.setState({ lname: data.lname });
    this.setState({ phone: data.phone });


    this.setState({ address:data.address });
    this.state.localData = data
    console.log(this.state.localData)
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
handleChange = address => {



  this.setState({ address });


};
calculateAutofocus = (a) => {
  if (this.state['formActivePanel' + a + 'Changed']) {
    return true
  }
}

  render() {
  return (
<MDBContainer>

<div className="application">
            <Helmet>
            <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAdnS_bTUUA8hlPRJkr0tDPBZ_vdA4hH9Y&libraries=places,distancematrix" type="text/javascript" />


            </Helmet>

        </div>
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
   sortRows={["fname"] }
/>

<MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>New Customer</MDBModalHeader>
        <MDBModalBody><div className="text-left">
        <MDBInput icon='user'  value={this.state.fname} getValue={this.getFNValue} label="First Name" className="mt-4 text-uppercase" autoFocus={this.calculateAutofocus(1)} />
            <MDBInput icon='user'  value={this.state.lname} getValue={this.getLNValue} label="Last Name" className="mt-4 text-uppercase" />
            <MDBInput icon='phone'  value={this.state.phone} getValue={this.getPhoneValue} label="Phone Number" className="mt-4" />
            <MDBInput icon='envelope-open'  value={this.state.email} getValue={this.getEmailValue} label="Email Address" className="mt-4" />
            <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}


      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <MDBInput icon='address-book'
              {...getInputProps({

                placeholder: 'Customer Address',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
            </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
          <MDBBtn color="primary" onClick= {this.handleRowClick}>Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>


     </MDBContainer>

  );
}
  }

export default ViewTrips;