import React from "react";
import { API,  graphqlOperation } from "aws-amplify";

import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { listCustomers } from '../../graphql/queries';
import { MDBContainer, MDBRow, MDBTimePicker, MDBCol, MDBStepper, MDBStepperStep, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDatatable,MDBIcon, MDBDatePicker, MDBSelect, MDBTable, MDBTableBody, MDBTableHead, MDBSpinner  } from 'mdb-react-ui-kit';
import PlacesAutocomplete from 'react-places-autocomplete';
import {Helmet} from "react-helmet";
import DatePicker from "react-multi-date-picker"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";








//const google = window.google


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
class AddTrips extends React.Component {

  constructor(props) {
    super(props)
    this.createInvoice = this.createInvoice.bind(this);
this.state = {
  editModalOpen: false,
  invoiceNumber: '',
  weekends:'',
  notes: '',
  loading: false,
  formActivePanel1: 1,
  formActivePanel1Changed: false,
  fname: '',
  lname: '',
  email: '',
  phone:'',
  city: '',
  state: '',
  zip: '',
  address: '',
  address2: '',
  duration:'',
  distance: '',
  wheelchair: '',
  roundTrip: '',
  status:'pending',
  price: '',
  modal: false,
  queryData: '',
  appointmentTime:'',
  appointmentDate:'',
  appointmentDate1:{},
  REACT_APP_AWS_LAMBDA_INVOKE_ENDPOINT:
  'https://ct4utd523c.execute-api.us-east-2.amazonaws.com/default/createCustomer',
  customersID: '',
  orderId:'',
  counter:0,

  optionsTrip: [
      {
        text: "One way",
        value: "One way"
      },
      {
        text: "Roundtrip",
        value: "Roundtrip"
      },

    ],

      optionsPatient: [
      {
        text: "Wheelchair",
        value: "Wheelchair"
      },
      {
        text: "Ambulatory",
        value: "Ambulatory"
      },

    ],
  customers: {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'First Name',
        field: 'fname',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Last Name',
        field: 'lname',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Phone',
        field: 'phone',
        sort: 'asc',
        width: 150,
      },

    {
      label: 'Address',
      field: 'address',
      sort: 'asc',
      width: 150,
    },
    {

      label: 'Select',
      field: 'selectButton'
    },
    {

      label: 'Select',
      field: 'editButton'
    },
    {

      label: 'Select',
      field: 'deleteButton'
    }


  ],
  rows:[]







}

}

this.openEditModal = this.openEditModal.bind(this);
this.closeEditModal = this.closeEditModal.bind(this);

this.handleChange = this.handleChange.bind(this)
  }

  openEditModal() {
    console.log(this.state.fname + 'test')
    this.setState({editModalOpen: true});
  }

  closeEditModal() {
    this.setState({editModalOpen: false});
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.fname !== prevState.fname) {
      // Do something with the updated fname state
      //location.reload()
    }
  }
  async componentDidMount() {
    this.setState({invoiceNumber: (new Date().getTime()).toString(36)});
    const apiData = await API.graphql(graphqlOperation(listCustomers, { limit: 1000 }));

    var myCustomers = [];

    apiData.data.listCustomers.items.sort(this.sortByTime).map((customer) => {
      myCustomers.push({
        id: customer.id,
        fname: customer.fname,
        lname: customer.lname,
        phone: customer.phoneNumber,
        email: customer.emailAddress,
        address: customer.address,
        selectButton: <MDBBtn outline rounded  color="success" onClick={() => this.handleRowClick(customer)}>Select</MDBBtn>,
        editButton: <MDBBtn outline rounded  color="warning" onClick={() => this.editCustomer(customer.id)}>Edit</MDBBtn>,
        deleteButton: <MDBBtn outline rounded  color="danger" onClick={() => this.deleteCustomer(customer.id)}>Delete</MDBBtn>
      });
    });
    this.setState({
      customers: {
        ...this.state.customers,
        rows: this.state.customers.rows.concat(myCustomers)
      }
    }, () => {
      this.setState({
        fname: myCustomers[0].fname,
        lname: myCustomers[0].lname,
        phone: myCustomers[0].phone,
        email: myCustomers[0].email,
        address: myCustomers[0].address
      });
    });
  }


    sortByTime =(b, a) => {
      if (a.createdAt > b.createdAt) {
          return 1;
      }
      if (a.createdAt < b.createdAt) {
          return -1;
      }
      return 0;
    }









  toggle = () => {
    this.calcDistance();


  }
  handleRowClick = (data) => {

    this.setState({
      fname: data.fname,
      lname: data.lname,
      phone: data.phoneNumber,
      email: data.email,
      address: data.address
    }, this.handleNextPrevClick(1)(2));
 }


  getCheckValue = value => {

    this.setState({ wheelchair: value[0] });
this.setState({
  price: 0
});


  };
  getCheck2Value = value => {


      this.setState({ roundTrip: value[0] });
      this.setState({
  price: 0
});




  };

    getCheck3Value = value => {

this.setState({ weekends: value });
this.setState({
  price: 0
});




  };


  getPickerValue = value => {
    this.setState({ appointmentTime: value });
    //console.log(value);
  };
  getPickerDateValue = value => {
    this.setState({ appointmentDate: value });
   // console.log(this.state.appointmentDate1[0].month.number + '/' + this.state.appointmentDate1[0].day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '/' + this.state.appointmentDate1[0].year);

  //  console.log(this.state.appointmentDate1[0].hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ':' + this.state.appointmentDate1[0].minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) );
    //console.log(value);
  };

  getPickerDateValue1 = value => {


    this.setState({ appointmentDate1: value });
    //og(value.length);
  };
  getFNValue = value => {
    //console.log(value);
    this.setState({fname: value.toUpperCase()});

  };

  getNotesValue = value =>{
    this.setState({notes: value});

  }
  getLNValue = value => {
    //console.log(value);
    this.setState({lname: value.toUpperCase()});

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
handleChange2 = address2 => {


  this.setState({ address2 });

};
toggle1 = () => {
  this.setState({
    modal1: !this.state.modal1
  });
}
calcPrice = ()=>{

  if(this.state.wheelchair == 'Wheelchair' && this.state.roundTrip == 'Roundtrip')
{

this.state.price = (this.state.distance * 2) * 2 + 80
this.setState({
  modal: !this.state.modal
});
}
else if(this.state.wheelchair == 'Ambulatory' && this.state.roundTrip == 'One way'){

this.state.price = (this.state.distance * 2) + 40
this.setState({
  modal: !this.state.modal
});


}
else if(this.state.wheelchair == 'Wheelchair' && this.state.roundTrip == 'One way'){

this.state.price = (this.state.distance * 2) + 40
this.setState({
  modal: !this.state.modal
});
}
else if(this.state.wheelchair == 'Ambulatory' && this.state.roundTrip == 'Roundtrip'){
this.state.price = (this.state.distance * 2) * 2 + 80
this.setState({
  modal: !this.state.modal
});

}

 }


 calcPrice2 = ()=>{

  if(this.state.wheelchair == 'Wheelchair' && this.state.roundTrip == 'Roundtrip')
{

this.state.price = (this.state.distance * 3) * 2 + 120
this.setState({
  modal: !this.state.modal
});
}
else if(this.state.wheelchair == 'Ambulatory' && this.state.roundTrip == 'One way'){

this.state.price = (this.state.distance * 3) + 60
this.setState({
  modal: !this.state.modal
});


}
else if(this.state.wheelchair == 'Wheelchair' && this.state.roundTrip == 'One way'){

this.state.price = (this.state.distance * 3) + 60
this.setState({
  modal: !this.state.modal
});
}
else if(this.state.wheelchair == 'Ambulatory' && this.state.roundTrip == 'Roundtrip'){
this.state.price = (this.state.distance * 3) * 2 + 120
this.setState({
  modal: !this.state.modal
});

}

 }




   calcDistance =()=> {
     if(this.state.address == '' || this.state.address2 == '' || this.state.address == null || this.state.address2 == null)
     {
       alert('Please add a to and from destination. ')
       return;
     }


   let service = new google.maps.DistanceMatrixService();
   var mythis = this;
   service.getDistanceMatrix({
       origins: [this.state.address],
       destinations: [this.state.address2],
       travelMode: google.maps.TravelMode.DRIVING,
       unitSystem: google.maps.UnitSystem.METRIC,
       avoidHighways: false,
       avoidTolls: false
   }, function (response, status) {
     //console.log(Math.round(parseInt(response.rows[0].elements[0].distance.text)/1.609 * 100)/100)

     if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
      mythis.state.distance = Math.round(parseInt(response.rows[0].elements[0].distance.text)/1.609 * 100)/100;
      mythis.state.duration = response.rows[0].elements[0].duration.text;
      if(mythis.state.weekends == true)
      {
      mythis.calcPrice2();
      }else{

         mythis.calcPrice();
      }

        } else {
                    alert("Unable to find the distance via road.");
                }
   })




  }




swapFormActive = (a) => (param) => (e) => {
  this.setState({
    ['formActivePanel' + a]: param,
    ['formActivePanel' + a + 'Changed']: true
  });
}

handleNextPrevClick = (a) => (param) => (e) => {
  this.setState({
    ['formActivePanel' + a]: param,
    ['formActivePanel' + a + 'Changed']: true
  });
}

handleSubmission = () => {
  alert('Form submitted!');
}

calculateAutofocus = (a) => {
  if (this.state['formActivePanel' + a + 'Changed']) {
    return true
  }
}
submitHandler = event => {
  event.preventDefault();
  event.target.className += ' was-validated';
};

changeHandler = event => {
  this.setState({ [event.target.name]: event.target.value });
};
formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}



newCustomer = event =>{
  event.preventDefault();

  const newCustomer = {
    fname: this.state.fname,
    lname: this.state.lname,
    phoneNumber: this.formatPhoneNumber(this.state.phone),
    emailAddress: this.state.email,
    address: this.state.address

  };

  const payload = {

    given_name: this.state.fname,
    family_name: this.state.lname,
    phone_number: this.formatPhoneNumber(this.state.phone),
    email_address: this.state.email,
    address: {
      address_line_1: this.state.address,
    },

  };
console.log(JSON.stringify(payload))
  fetch(this.state.REACT_APP_AWS_LAMBDA_INVOKE_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors', // no-cors, *cors, same-origin
 // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error.message);
    });



   API.graphql({ query: mutations.createCustomer, variables: {input: newCustomer}}).then(()=>{

    this.setState({ address:'' });
   alert('Customer Added! ')

   window.location.reload();
  } );

  this.setState({ address:'' });

}

editCustomer = (customerId, updatedInfo) => {
  API.graphql({
    query: queries.getCustomer,
    variables: { id: customerId }
  }).then(({ data }) => {

    const currentCustomer = data.getCustomer;

    // Open the modal and populate the fields
    //console.log(currentCustomer.fname)
    this.setState({
        editModalOpen: true,
        fname: currentCustomer.fname,
        lname: currentCustomer.lname,
        phone: this.formatPhoneNumber(currentCustomer.phoneNumber),
        email: currentCustomer.emailAddress,
        address: currentCustomer.address
    });

    // save changes when the user clicks the Save Changes button
    this.saveChanges = () => {
      const updatedCustomer = {
        fname: this.state.fname,
        lname: this.state.lname,
        phoneNumber: this.formatPhoneNumber(this.state.phone),
        emailAddress: this.state.email,
        address: this.state.address,
        oldPhone: currentCustomer.phoneNumber
      }

      const updatedCustomerData = {
        fname: this.state.fname,
        lname: this.state.lname,
        phoneNumber: this.formatPhoneNumber(this.state.phone),
        emailAddress: this.state.email,
        address: this.state.address,

      }

      console.log(this.state.address)




      fetch('https://ct4utd523c.execute-api.us-east-2.amazonaws.com/default/EditCustomer', {
        method: 'POST',
        mode: 'no-cors', // no-cors, *cors, same-origin
     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomer),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          console.log(error.message);
        });




      API.graphql({
        query: mutations.updateCustomer,
        variables: { input: { id: customerId, ...updatedCustomerData } }
      }).then(() => {
        this.setState({editModalOpen: false });
        location.reload()
      });


    }
  });
}



deleteCustomer = (customerId) => {
  API.graphql({
    query: mutations.deleteCustomer,
    variables: { input: { id: customerId } }
  }).then(() => {

    location.reload()
  });
}

submitTrip = () =>{

  this.setState({ loading: true });
  if(this.state.price === '' || this.state.price === null || this.state.price === 0)
  {
 alert('Please calculate total. ')
 this.setState({ loading: false });
 return;


  }

  if(this.state.appointmentDate1 === '' || this.state.appointmentDate1 === null )
  {
 alert('Please select your date. ')
 this.setState({ loading: false });
 return;


  }

  const newTrips = {
    fname: this.state.fname,
    lname: this.state.lname,
    address: this.state.address,
    address2: this.state.address2,
    wheelchair: this.state.wheelchair,
    roundtrip: this.state.roundTrip,
    appointmentTime: this.state.appointmentDate1[this.state.counter].hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ':' + this.state.appointmentDate1[this.state.counter].minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
    appointmentDate: this.state.appointmentDate1[this.state.counter].month.number + '/' + this.state.appointmentDate1[this.state.counter].day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '/' + this.state.appointmentDate1[this.state.counter].year,
    status: this.state.status,
    phoneNumber: this.state.phone,
    cost: Math.round(this.state.price * 100)/100,
    driver: '',
    notes: this.state.notes,
    distance: (this.state.roundTrip === 'Roundtrip') ? this.state.distance * 2 : this.state.distance,
    trip: '1',
    invoiceNumber: this.state.invoiceNumber,


  };

  API.graphql({ query: mutations.createTrip, variables: {input: newTrips}}).then(()=>{



    if(this.state.roundTrip =='Roundtrip')
    {
 this.submitTripRound();

    }else{

      this.createOrder();
    }


} );

}

createInvoice = (orderId) => {
console.log(orderId)
  const payload = {
  phoneNumber: this.state.phone,
  orderId: orderId,
  appointmentDate: this.state.appointmentDate1[this.state.counter].month.number + '/' + this.state.appointmentDate1[this.state.counter].day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '/' + this.state.appointmentDate1[this.state.counter].year,
  }
console.log(JSON.stringify(payload));
console.log(this.state.phone);


  fetch('https://j17q5uhse6.execute-api.us-east-2.amazonaws.com/default/createInvoice', {
    method: 'POST',
   mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(response => {
    //console.log(response)
    if (response.ok) {
      return response;
    }
   // throw new Error(response.statusText);
  }).then(response => {
    // Do something with the response


      this.sendText();


      if((this.state.appointmentDate1.length-1) !== this.state.counter){
        this.state.counter++

        this.submitTrip();


      }else {
      alert('New Trip Added! ')
      this.setState({ loading: false });
      window.location.reload();
      }




  }).catch(response => {
    // Handle the error
    console.log(response)
  });






};

createIdempotencyKey = () => {
  // Generate a unique string using the current timestamp
  const key = `idempotency_key_${Date.now()}`;
  return key;
}

createOrder = () => {
  // Set up your Square Connect API credentials
  //let number = parseInt(Math.round(this.state.price * 100)/100);
  const price = this.state.price;

  const formattedPrice = Math.round(price * 100);
  const integerPrice = parseInt(formattedPrice);


console.log(integerPrice)
  const creds = {
    accessToken: 'EAAAEZZ7JGXz14aktzcwX5LxUnrYDHoC6LvsTkyu2TAT7AHpB0CF1QKaIP4YMNKm',
    locationId: 'LB25KA4492SBQ'
  };

  const orderData = {

    location_id: 'LB25KA4492SBQ',
    line_items: [

      {
        name: 'Wheelchair Transport',
        quantity: '1',
        base_price_money: {
          amount:   integerPrice,
          currency: 'USD'
        }
      }
    ]

  };

  // Send the order data to the Lambda function
  fetch('https://9mvh05lmg5.execute-api.us-east-2.amazonaws.com/default/createOrder', {
    method: 'POST',
    //credentials: 'include',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idempotency_key: this.createIdempotencyKey(),
      order: orderData,
      credentials: creds
    })
  }).then(response => {
    //console.log(response)
    if (response.ok) {
      return response.json();
    }
   // throw new Error(response.statusText);
  }).then(response => {
    // Do something with the response
    const orderId = response.orderId;
    if (orderId) {
      console.log(orderId);
      this.createInvoice(orderId);
    }



  }).catch(response => {
    // Handle the error
    console.log(response)
  });
}



submitTripRound = () =>{


  const newTrips = {
    fname: this.state.fname,
    lname: this.state.lname,
    address: this.state.address2,
    address2: this.state.address,
    wheelchair: this.state.wheelchair,
    roundtrip: this.state.roundTrip,
    appointmentTime: 'Will Call' ,
    appointmentDate: this.state.appointmentDate1[this.state.counter].month.number + '/' + this.state.appointmentDate1[this.state.counter].day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '/' + this.state.appointmentDate1[this.state.counter].year ,
    status: this.state.status,
    phoneNumber: this.state.phone,
    cost: Math.round(this.state.price * 100)/100,
    driver: '',
    notes: this.state.notes,
    distance: (this.state.roundTrip === 'Roundtrip') ? this.state.distance * 2 : this.state.distance,
    trip: '2',
    invoiceNumber: this.state.invoiceNumber,


  };

  API.graphql({ query: mutations.createTrip, variables: {input: newTrips}}).then(()=>{

    this.createOrder();



} );


}

sendText = _ => {

  fetch(`https://vsji3ei487.execute-api.us-east-2.amazonaws.com/dev/items?recipient=${this.state.phone}&textmessage=Transportation has been scheduled with Five G Transportation. Date: ${this.state.appointmentDate1[this.state.counter].month.number + '/' + this.state.appointmentDate1[this.state.counter].day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '/' + this.state.appointmentDate1[this.state.counter].year} Time: ${this.state.appointmentDate1[this.state.counter].hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ':' + this.state.appointmentDate1[this.state.counter].minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`)
  .catch(err => console.error(err))
}


render() {
  return (
    <MDBContainer >


        <div className="application">

            <Helmet>
            <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAdnS_bTUUA8hlPRJkr0tDPBZ_vdA4hH9Y&libraries=places,distancematrix" type="text/javascript" />


            </Helmet>

        </div>

      <MDBStepper icon>
        <MDBStepperStep far icon="address-card" stepName="Basic Information" onClick={this.swapFormActive(1)(1)}></MDBStepperStep>
        <MDBStepperStep  icon="map-marked" stepName="Personal Data" onClick={this.swapFormActive(1)(2)}></MDBStepperStep>
        <MDBStepperStep  icon="map-marked-alt" stepName="Terms and Conditions" onClick={this.swapFormActive(1)(3)}></MDBStepperStep>
        <MDBStepperStep icon="table" stepName="Trip" onClick={this.swapFormActive(1)(4)}></MDBStepperStep>
        <MDBStepperStep icon="check" stepName="Finish" onClick={this.swapFormActive(1)(5)}></MDBStepperStep>
      </MDBStepper>
{this.state.loading ? (
     <div className='d-flex justify-content-center'>
    <MDBSpinner color="primary" />
    </div>
  ) : (

        <div className='text-left'>
        <MDBRow>
          {this.state.formActivePanel1 == 1 &&
          (<MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-4 text-center">
              <strong>Customer Information</strong></h3>
             <div className="text-center"> <MDBBtn onClick={this.toggle1}>Add Customer</MDBBtn></div>
              <MDBDatatable
      hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4}
      searchTop searchBottom={false}
      barReverse

      //onClick={this.handleNextPrevClick(1)(2)}
   data={this.state.customers}


    />

          </MDBCol>)}

          {this.state.formActivePanel1 == 2 &&
          (<MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-4 text-center"><strong>Pickup Address</strong></h3>
            <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}



      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <MDBInput
              {...getInputProps({
                placeholder: 'Search Places ...',
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

            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(1)}>previous</MDBBtn>
            <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(3)}>next</MDBBtn>
          </MDBCol>)}

          {this.state.formActivePanel1 == 3 &&
          (<MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-4 text-center"><strong>Destination Address</strong></h3>
            <PlacesAutocomplete
        value={this.state.address2}
        onChange={this.handleChange2}


      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <MDBInput
              {...getInputProps({
                placeholder: 'Search Places ...',
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
            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(2)}>previous</MDBBtn>
            <MDBBtn color="mdb-color" rounded className="float-right"  onClick={this.handleNextPrevClick(1)(4)}>next</MDBBtn>
          </MDBCol>)}


          {this.state.formActivePanel1 == 4 &&
          (<MDBCol md="12">

            <h2 className="text-center font-weight-bold my-4">Trip Details</h2>
< MDBInput label="Weekend/After Hours"  type="checkbox" id="checkbox2" checked={this.state.weekends} getValue={this.getCheck3Value} />
      <MDBSelect
          options={this.state.optionsTrip}
          selected="Choose trip type"
          label="Trip type "
           value={this.state.roundTrip} getValue={this.getCheck2Value}
        />

          <MDBSelect
          options={this.state.optionsPatient}
          selected="Choose patient type"
          label="Patient Type "
          value={this.state.wheelchair} getValue={this.getCheckValue}
        />


<div className='text-center red-text'>  <label htmlFor="formGroupExampleInput">Appointment Date: </label>


<DatePicker
      multiple
      value={this.state.appointmentDate1}
      onChange={this.getPickerDateValue1}
      format="MM/DD/YYYY HH:mm"
      plugins={[
        <TimePicker position="bottom" />,
        <DatePanel markFocused />
      ]}
    />

</div>




        <MDBInput type="textarea" getValue={this.getNotesValue} label="Trip Notes" background />



            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(3)}>previous</MDBBtn>
            <MDBBtn color="mdb-color" rounded className="float-right"  onClick={this.handleNextPrevClick(1)(5)} >Next</MDBBtn>
          </MDBCol>)}

          {this.state.formActivePanel1 == 5 &&
          (<MDBCol md="12">

            <h2 className="text-center font-weight-bold my-4">Trip Summary</h2>
            <div className="text-center"><MDBBtn color="primary" rounded  onClick={this.toggle}><MDBIcon icon="info" /> Calculate</MDBBtn></div>
                <MDBTable>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Address</th>
          <th>Destination Address</th>

          <th>Est Total Miles</th>
          <th>Est Total Cost</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>
          <td>{this.state.address}</td>
          <td>{this.state.address2}</td>
          <td>{(this.state.roundTrip === 'Roundtrip') ? this.state.distance * 2 : this.state.distance}</td>
          <td>{ Math.round(this.state.price * 100)/100}</td>
        </tr>

      </MDBTableBody>
    </MDBTable>
            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(4)}>previous</MDBBtn>
            <MDBBtn color="success" rounded className="float-right" onClick={this.submitTrip}>submit</MDBBtn>
          </MDBCol>)}
        </MDBRow>
        </div>
 )}

      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>

        <MDBModalBody>
        <h4 className="my-4">Details:<div className='red-text'> {this.state.address}</div></h4>
            <h4 className="my-4 ">Destination Address:<div className='red-text'> {this.state.address2}</div></h4>
            <h4 className="my-4">Est Time: <div className='red-text'>{this.state.duration}</div></h4>
            <h4 className="my-4">Est Miles: <div className='red-text'>{(this.state.roundTrip === 'Roundtrip') ? this.state.distance * 2 : this.state.distance}</div></h4>
            <h4 className="my-4">Est Cost: <div className='red-text'>${ Math.round(this.state.price * 100)/100}</div></h4>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn rounded color="primary" onClick={this.toggle}>Close</MDBBtn>

        </MDBModalFooter>
      </MDBModal>

      <MDBModal isOpen={this.state.modal1} toggle={this.toggle1}>
        <MDBModalHeader toggle={this.toggle1}>New Customer</MDBModalHeader>
        <MDBModalBody><div className="text-left">
        <MDBInput icon='user' getValue={this.getFNValue} label="First Name" className="mt-4 text-uppercase" autoFocus={this.calculateAutofocus(1)} />
            <MDBInput icon='user' getValue={this.getLNValue} label="Last Name" className="mt-4 text-uppercase" />
            <MDBInput icon='phone' getValue={this.getPhoneValue} label="Phone Number" className="mt-4" />
            <MDBInput icon='envelope-open' getValue={this.getEmailValue} label="Email Address" className="mt-4" />
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
                //inline style for demonstration purpose
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
          <MDBBtn color="secondary" onClick={this.toggle1}>Close</MDBBtn>
          <MDBBtn color="primary" onClick= {this.newCustomer}>Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

      <MDBModal isOpen={this.state.editModalOpen} toggle={this.closeEditModal}>
  <MDBModalHeader toggle={this.closeEditModal}>Edit Customer</MDBModalHeader>
  <MDBModalBody>
    <div className="text-left">
    <MDBInput icon='user' value={this.state.fname} onChange={event => this.setState({fname: event.target.value})} label="First Name" className="mt-4 text-uppercase" autoFocus={this.calculateAutofocus(1)} />
            <MDBInput icon='user' value={this.state.lname} onChange={event => this.setState({lname: event.target.value})} label="Last Name" className="mt-4 text-uppercase" />
            <MDBInput icon='phone' value={this.state.phone} onChange={event => this.setState({phone: event.target.value})} label="Phone Number" className="mt-4" />
            <MDBInput icon='envelope-open' value={this.state.email} onChange={event => this.setState({email: event.target.value})} label="Email" className="mt-4" />

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
                //inline style for demonstration purpose
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
    <MDBBtn color="secondary" onClick={this.closeEditModal}>Close</MDBBtn>
    <MDBBtn color="primary" onClick={this.saveChanges}>Save Changes</MDBBtn>
  </MDBModalFooter>
</MDBModal>

    </MDBContainer>
    );
  };
}

export default AddTrips;