import React from "react";
import { API,  graphqlOperation } from "aws-amplify";
import * as mutations from '../../graphql/mutations';
import { listBrokers, listInvoices, listTrips } from '../../graphql/queries';
import { MDBContainer, MDBRow, MDBTimePicker, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDataTableV5,MDBIcon, MDBDatePicker, MDBSelect, MDBTable, MDBTableBody, MDBTableHead   } from "mdbreact";
import PlacesAutocomplete from 'react-places-autocomplete';
import {Helmet} from "react-helmet";








//const google = window.google


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
class EditTrips extends React.Component {

  constructor(props) {
    super(props)
this.state = {
  dataId:'',
  notes: '',
  broker:[],
  brokers:'',
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
  invoiceNumber: '',
  poId: '',

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
        label: 'Appointment Time',
        field: 'appointmentTime',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Appointment Date',
        field: 'appointmentDate',
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
      field: 'button'
    }


  ],
  rows:[]







}

}



this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount(){
    const apiData = await API.graphql(graphqlOperation( listTrips, { limit: 1000 }))
    this.state.queryData  = apiData.data.listTrips.items;

    var myCustomers = [];
    this.getBroker();
    this.state.queryData.sort(this.sortByDate).map((customer) => {

      //console.log(customer.address)
      if(customer.status == 'pending' || customer.status == 'new'){
      myCustomers.push({
 weekends:'',
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
        phone: customer.phoneNumber,
        broker: customer.broker,
        notes: customer.notes,
        invoiceNumber: customer.invoiceNumber,
        clickEvent: (data) => this.handleRowClick(data),
        button: <MDBBtn outline rounded>Select</MDBBtn>

      });
    }

  })
  this.setState({
    customers: {
      ...this.state.customers, // merge with the original `state.items`
      rows: this.state.customers.rows.concat(myCustomers)
    }
  });



    }


   sortByDate = (b, a)=> {
      if (a.appointmentDate < b.appointmentDate) {
          return 1;
      }
      if (a.appointmentDate > b.appointmentDate) {
          return -1;
      }
      return 0;
  }

    getBroker = () =>{

      var myThis = this;
      var myEmployee= [];

       API.graphql(graphqlOperation(listBrokers)).then(function(results)
        {


          results.data.listBrokers.items.map((customer) => {

            //console.log(customer.emailAddress)
            myEmployee.push({
            text: customer.name,
            value: customer.name,

            });


        })


        })
       this.setState({broker: myEmployee});
        }








  toggle = () => {
    this.calcDistance();


  }
 handleRowClick = (data) =>
 {
  this.state.dataId = data.id
   this.state.fname = data.fname;
   this.state.lname = data.lname;
   this.state.phone = data.phone;
   this.state.email = data.email;
   this.state.address = data.address;
   this.state.address2 = data.address2;
   this.state.wheelchair =  data.wheelchair
   this.state.roundTrip =  data.roundtrip
   this.state.driver =  data.driver
   this.state.appointmentDate =  new Date(data.appointmentDate)

   this.state.appointmentTime = data.appointmentTime
   this.state.status =  data.status
   this.state.phone = data.phone
   this.state.brokers = data.broker
   this.state.notes = data.notes
    this.state.distance = data.distance
    this.state.invoiceNumber = data.invoiceNumber

  //console.log(data)
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
    //console.log(value);
  };
  getFNValue = value => {
    //console.log(value);
    this.setState({fname: value});

  };

  getNotesValue = value =>{
    this.setState({notes: value});

  }
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

 getPoNumber = async () =>{
// Query with filters, limits, and pagination
let filter = {
  poNumber: {
      eq: this.state.invoiceNumber // filter priority = 1
  }
};
const poNumber = await API.graphql(graphqlOperation(listInvoices,
  { filter: filter,limit: 1000 }));


  console.log(poNumber.data.listInvoices.items[0].id)
  this.setState({poId: poNumber.data.listInvoices.items[0].id})
  this.generateInvoice()

 }


 generateInvoice = async () =>{



  const invoiceDetails = {
  id: this.state.poId,
  poNumber: this.state.invoiceNumber,
  name: this.state.fname + ' ' + this.state.lname,
  broker: this.state.brokers[0],
  date: this.state.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
  year: 'numeric'}),
  product: this.state.roundTrip + ' ' + this.state.wheelchair,
  cost: this.state.price,
  distance: this.state.distance,
  address: this.state.address,
  };

  const newInvoice = await API.graphql({ query: mutations.updateInvoice, variables: {input: invoiceDetails}}).then(( )=> {




   alert('New Trip Added! ')
   window.location.reload();



  })






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



submitTrip = event =>{
  event.preventDefault();

  if(this.state.price === '' || this.state.price === null || this.state.price === 0)
  {
 alert('Please calculate total. ')

 return;


  }


  const newTrips = {
    id: this.state.dataId,
    fname: this.state.fname.toUpperCase(),
    lname: this.state.lname.toUpperCase(),
    address: this.state.address,
    address2: this.state.address2,
    wheelchair: this.state.wheelchair,
    roundtrip: this.state.roundTrip,
    appointmentTime: this.state.appointmentTime,
    appointmentDate: this.state.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
    year: 'numeric'}),
    status: this.state.status,
    phoneNumber: this.state.phone,
     cost: Math.round(this.state.price * 100)/100,
    driver: this.state.driver,
    broker: this.state.brokers,
    notes: this.state.notes,
    distance: (this.state.roundTrip === 'Roundtrip') ? this.state.distance * 2 : this.state.distance,


  };

  API.graphql({ query: mutations.updateTrip, variables: {input: newTrips , limit: 1000 }}).then(()=>{


    this.getPoNumber()


} );

}
handleAssign = value => {


  this.setState({ brokers: value[0]});


};





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
        <MDBStep far icon="address-card" stepName="Basic Information" onClick={this.swapFormActive(1)(1)}></MDBStep>
        <MDBStep  icon="map-marked" stepName="Personal Data" onClick={this.swapFormActive(1)(2)}></MDBStep>
        <MDBStep  icon="map-marked-alt" stepName="Terms and Conditions" onClick={this.swapFormActive(1)(3)}></MDBStep>
        <MDBStep icon="table" stepName="Trip" onClick={this.swapFormActive(1)(4)}></MDBStep>
        <MDBStep icon="check" stepName="Finish" onClick={this.swapFormActive(1)(5)}></MDBStep>
      </MDBStepper>



        <div className='text-left'>
        <MDBRow>
          {this.state.formActivePanel1 == 1 &&
          (<MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-4 text-center">
              <strong>Edit Trips</strong></h3>

              <MDBDataTableV5
      hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4}
      searchTop searchBottom={false}
      barReverse

      onClick={this.handleNextPrevClick(1)(2)}
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
          selected={this.state.roundTrip}
           value={this.state.roundTrip}
           getValue={this.getCheck2Value}
        />

          <MDBSelect
          options={this.state.optionsPatient}
          selected={this.state.wheelchair}
          value={this.state.wheelchair}
          getValue={this.getCheckValue}
        />

<div className='text-center red-text'>  <label htmlFor="formGroupExampleInput">Appointment Date</label>

<MDBDatePicker  id="datePicker" value={this.state.appointmentDate}  getValue={this.getPickerDateValue} />
</div>

            <MDBInput label='Appointment Time'  id="timePicker" value={this.state.appointmentTime}    getValue={this.getPickerValue} />

        <MDBSelect
          options={this.state.broker}
            value={this.state.broker}
            selected={this.state.brokers}


          getValue={this.handleAssign}
        />
        <MDBInput type="textarea"  value={this.state.notes} getValue={this.getNotesValue} label="Trip Notes" background />



            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(3)}>previous</MDBBtn>
            <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(5)}>Next</MDBBtn>
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


        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>

<MDBModalBody>
<h4 className="my-4">Details:<div className='red-text'> {this.state.address}</div></h4>
    <h4 className="my-4 ">Destination Address:<div className='red-text'> {this.state.address2}</div></h4>
    <h4 className="my-4">Est Time: <div className='red-text'>{this.state.duration}</div></h4>
    <h4 className="my-4">Est Miles: <div className='red-text'>{(this.state.roundTrip === 'Roundtrip') ? this.state.distance * 2 : this.state.distance}</div></h4>
    <h4 className="my-4">Est Cost: <div className='red-text'>${this.state.price}</div></h4>
</MDBModalBody>
<MDBModalFooter>
  <MDBBtn rounded color="primary" onClick={this.toggle}>Close</MDBBtn>

</MDBModalFooter>
</MDBModal>



    </MDBContainer>
    );
  };
}

export default EditTrips;