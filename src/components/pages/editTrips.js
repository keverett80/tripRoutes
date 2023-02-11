import React from "react";
import { API,  graphqlOperation } from "aws-amplify";
import * as mutations from '../../graphql/mutations';
import {   listTrips } from '../../graphql/queries';
import { MDBContainer, MDBRow, MDBModalDialog, MDBCol, MDBStepper, MDBStepperStep, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDatatable,MDBIcon, MDBCheckbox, MDBSelect, MDBTable, MDBTableBody, MDBTableHead, MDBSpinner, MDBTextArea, MDBModalContent  } from 'mdb-react-ui-kit';
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
class EditTrips extends React.Component {

  constructor(props) {
    super(props)
this.state = {
  weekends: false,
  dataId:'',
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

    this.state.queryData.sort(this.sortByDate).map((customer) => {


      if(customer.status == 'pending' || customer.status == 'new'){
//console.log(customer)
      myCustomers.push({

        afterHours:this.state.weekends,
        id: customer.id,
        fname: customer.fname || '',
        lname: customer.lname|| '',
        address: customer.address|| '',
        address2: customer.address2|| '',
        wheelchair: customer.wheelchair|| '',
        roundtrip: customer.roundtrip|| '',
        driver: customer.driver|| '',
        appointmentDate: customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
        year: 'numeric'})|| '',
        appointmentTime: customer.appointmentTime|| '',
        status:customer.status|| '',
        phone: customer.phoneNumber|| '',

        notes: customer.notes|| '',
        invoiceNumber: customer.invoiceNumber|| '',
        button: <MDBBtn outline rounded  color="success" onClick={() => this.handleRowClick(customer)}>Select</MDBBtn>,

      });
    }

  })
  this.setState({
    customers: {
       ...this.state.customers,
      rows: this.state.customers.rows.concat(myCustomers)
    },
    fname: myCustomers[0].fname,
    lname: myCustomers[0].lname,
    phone: myCustomers[0].phone,

    address: myCustomers[0].address,
  });
} catch (error) {
  //console.error(error);

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










  toggle = () => {
    this.calcDistance();


  }
 handleRowClick = (data) =>
 {
  //console.log(data)
  this.setState({dataId: data.id,
 fname: data.fname,
   lname: data.lname,
   phone: data.phone,
   email: data.email,
   address: data.address,
   address2: data.address2,
   wheelchair:  data.wheelchair,
   roundTrip:  data.roundtrip,
   driver:  data.driver,
   appointmentDate: data.appointmentDate,
  weekends: data.afterHours,
   appointmentTime: data.appointmentTime,
   status:  data.status,
   phone: data.phone,

   notes: data.notes,
    distance: data.distance,
    invoiceNumber: data.invoiceNumber,


  //console.log(data)
 }, this.handleNextPrevClick(1)(2))
}




  getPickerDateValue = value => {
    this.setState({ appointmentDate: value });
    //console.log(value);
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
calcPrice = () => {
  const isRoundTrip = this.state.roundTrip === 'Roundtrip';
  const appointmentDate = new Date(this.state.appointmentDate);
  const appointmentTime = new Date(appointmentDate.toISOString());
  const isEarlyOrLate = appointmentTime.getHours() < 6 || appointmentTime.getHours() >= 19;
  const isWeekend = [0, 6].includes(appointmentDate.getDay()) || (appointmentTime.getHours() >= 19 || appointmentTime.getHours() < 6);
  const exceeds30Miles = this.state.distance > 30;
  const basePrice = this.state.distance * (exceeds30Miles || isWeekend || isEarlyOrLate ? 3 : 2);
  const price = isRoundTrip ? basePrice * 2 + (isWeekend ? 120 : 80) : basePrice + (isWeekend ? 60 : 40);

  this.setState({
    price,
    modal: !this.state.modal
  });
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

  getCheckBoxValue = () => {
    if (this.state.weekends === true) {
     this.setState({weekends: false})
    } else {
      this.setState({weekends: true})
    }
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


  const updateTrips = {
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
    afterHours:this.state.weekends,
    notes: this.state.notes,
    distance: (this.state.roundTrip === 'Roundtrip') ? this.state.distance * 2 : this.state.distance,


  };

  API.graphql({ query: mutations.updateTrip, variables: {input: updateTrips , limit: 1000 }}).then(()=>{

    this.setState({ loading: false });
    alert('The trip has been updated. ')
    window.location.reload();


} );

}






render() {
  return (
    <MDBContainer >


        <div className="application">
            <Helmet>



            </Helmet>

        </div>

        <MDBStepper >
        <MDBStepperStep icon="address-card" headText="Basic Information" onClick={this.swapFormActive(1)(1)}></MDBStepperStep>
        <MDBStepperStep  icon="map-marked" headText="Personal Data" onClick={this.swapFormActive(1)(2)}></MDBStepperStep>
        <MDBStepperStep  icon="map-marked-alt" headText="Terms and Conditions" onClick={this.swapFormActive(1)(3)}></MDBStepperStep>
        <MDBStepperStep icon="table" headText="Trip" onClick={this.swapFormActive(1)(4)}></MDBStepperStep>
        <MDBStepperStep icon="check" headText="Finish" onClick={this.swapFormActive(1)(5)}></MDBStepperStep>
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
             <div className="text-center p-md-3"> <MDBBtn className='p-md-3' onClick={this.toggle1}>Add Customer</MDBBtn></div>
             <MDBDatatable
             search={true}
  data={this.state.customers}

/>


          </MDBCol>)}

          {this.state.formActivePanel1 == 2 &&
          (<MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-4 text-center"><strong>Pickup Address</strong></h3>
            <PlacesAutocomplete
        value={this.state.address }
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
      <div className="d-grid gap-2 d-md-block text-center">
            <MDBBtn color="mdb-color" rounded className='m-3' onClick={this.handleNextPrevClick(1)(1)}>previous</MDBBtn>
            <MDBBtn color="mdb-color" rounded className='m-3' onClick={this.handleNextPrevClick(1)(3)}>next</MDBBtn>
            </div>
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
      <div className="d-grid gap-2 d-md-block text-center">
            <MDBBtn color="mdb-color" rounded className='m-3' onClick={this.handleNextPrevClick(1)(2)}>previous</MDBBtn>
            <MDBBtn color="mdb-color" rounded className='m-3'  onClick={this.handleNextPrevClick(1)(4)}>next</MDBBtn></div>
          </MDBCol>)}


          {this.state.formActivePanel1 == 4 &&

          (<><MDBRow start>
            <MDBCol md="12" className='p-md-3'>
            <h2 className="text-center font-weight-bold my-4">Trip Details</h2>
            </MDBCol >
            </MDBRow>
            <MDBRow start>
<MDBCol md="6" className='p-md-3'>

        <MDBSelect
  data={this.state.optionsTrip}
  selected="Choose patient type"
  label="Trip Type"
  value={this.state.roundTrip}
  onValueChange={selected => this.setState({ roundTrip: selected.value }, this.updateSelectTripType(selected.value))}

/>
</MDBCol><MDBCol md="6" className='p-md-3'>
<MDBSelect
  data={this.state.optionsPatient}
  selected="Choose patient type"
  label="Patient Type"
  onValueChange={selected => this.setState({ wheelchair: selected.value },this.updateSelectPatientType(selected.value))}
  value={this.state.wheelchair}

/>
</MDBCol>
</MDBRow>
<MDBRow start>
<MDBCol md="3" className='p-md-3'></MDBCol>
  <MDBCol md="6" className='p-md-3'>
 <label >Appointment Date: </label>
 <DatePicker

      value={this.state.appointmentDate }
      onChange={this.getPickerDateValue }
      format="MM/DD/YYYY HH:mm"
      plugins={[
        <TimePicker position="top" />,
        <DatePanel markFocused />
      ]}
    />
</MDBCol>
<MDBCol md="3" className='p-md-3'></MDBCol>
</MDBRow>


<MDBRow start className='p-md-3'>
  <MDBCol md="12">       <MDBTextArea value={this.state.notes} onChange={event => this.setState({notes: event.target.value})} label="Trip Notes"  rows={4} /></MDBCol>

</MDBRow>


<div className="d-grid gap-2 d-md-block text-center"> <MDBBtn color="mdb-color" className='m-3' rounded onClick={this.handleNextPrevClick(1)(3)}>previous</MDBBtn>

 <MDBBtn color="mdb-color" className='m-3' rounded   onClick={this.handleNextPrevClick(1)(5)} >Next</MDBBtn></div>
          </>)}

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
    <div className="d-grid gap-2 d-md-block text-center">
            <MDBBtn color="mdb-color" rounded className='m-5' onClick={this.handleNextPrevClick(1)(4)}>previous</MDBBtn>
            <MDBBtn color="success" rounded className='m-5' onClick={this.submitTrip}>submit</MDBBtn></div>
          </MDBCol>)}
        </MDBRow>
        </div>
)}

        <MDBModal staticBackdrop show={this.state.modal}>
      <MDBModalDialog>
          <MDBModalContent>

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

          </MDBModalContent>
          </MDBModalDialog>
      </MDBModal>



    </MDBContainer>
    );
  };
}

export default EditTrips;