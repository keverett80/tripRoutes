import React from "react";
import { MDBContainer, MDBRow, MDBTimePicker, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDataTable  } from "mdbreact";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {Helmet} from "react-helmet";


const columns = ["Person Name", "Age", "Company Name", "Country", "City"];

const data = {
  columns: [
    {
      label: 'First Name',
      clickEvent: () => this.handleRowClick(alert('hello')),
      field: 'fname',
      sort: 'asc',
      width: 150,

    },
    {
      label: 'Last Name',
      field: 'lname',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Phone Number',
      field: 'phone',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Email Address',
      field: 'email',
      sort: 'asc',
      width: 100
    },

    {
      label: 'Updated',
      field: 'updated',
      sort: 'asc'
    },

  ],
  rows: [
    {
      fname: 'Tiger',
      lname: 'Nixon',
      phone: '555-555-5555',
      email: 'tnixon@mail.com',
      updated: <MDBBtn color="secondary"  >Close</MDBBtn>


    },
    {
      fname: 'Tiger',
      lname: 'Nixon',
      phone: '555-555-5555',
      email: 'tnixon@mail.com',
      updated: <MDBBtn color="secondary" >Close</MDBBtn>
    },
    {

    }
  ]
}





class AddTrips extends React.Component {
  constructor(props) {
    super(props)
this.state = {
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
  price: '',
  modal: false

}


this.handleChange = this.handleChange.bind(this)
  }

  toggle = () => {
    this.calcDistance();


  }

  getCheckValue = value => {
    this.setState({ wheelchair: value });
  };
  getCheck2Value = value => {

    this.setState({ roundTrip: value });
  };

  getPickerValue = value => {
    console.log(value);

  };
  getPicker2Value = value => {
    console.log(value);
  };
  getFNValue = value => {
    console.log(value);
    this.setState({fname: value});

  };
  getLNValue = value => {
    console.log(value);
    this.setState({lname: value});

  };
  getPhoneValue = value => {
    console.log(value);
    this.setState({phone: value});

  };
  getEmailValue = value => {
    console.log(value);
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


  if(this.state.wheelchair == true && this.state.roundTrip == true)
{

this.state.price = (this.state.distance * 2) * 2 + 60
this.setState({
  modal: !this.state.modal
});
}
else if(this.state.wheelchair == false && this.state.roundTrip == false){

this.state.price = (this.state.distance * 2) + 15
this.setState({
  modal: !this.state.modal
});


}
else if(this.state.wheelchair == true && this.state.roundTrip == false){

this.state.price = (this.state.distance * 2) + 30
this.setState({
  modal: !this.state.modal
});
}
else if(this.state.wheelchair == false && this.state.roundTrip == true){
this.state.price = (this.state.distance * 2) * 2 + 30
this.setState({
  modal: !this.state.modal
});

}

 }




   calcDistance =()=> {
     if(this.state.address == '' || this.state.address2 == '' || this.state.address == null || this.state.address2 == null)
     {
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
     console.log(Math.round(parseInt(response.rows[0].elements[0].distance.text)/1.609 * 100)/100)

     if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
      mythis.state.distance = Math.round(parseInt(response.rows[0].elements[0].distance.text)/1.609 * 100)/100;
      mythis.state.duration = response.rows[0].elements[0].duration.text;
      mythis.calcPrice();

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
        <MDBStep icon="check" stepName="Finish" onClick={this.swapFormActive(1)(4)}></MDBStep>
      </MDBStepper>

      <form role="form" action="" method="post">
        <div className='text-left'>
        <MDBRow>
          {this.state.formActivePanel1 == 1 &&
          (<MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-4 text-center">
              <strong>Customer Information</strong></h3>
             <div className="text-center"> <MDBBtn onClick={this.toggle1}>Add Customer</MDBBtn></div>
              <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
       <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(2)}>next</MDBBtn>
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
            <div className='text-center red-text'> <MDBInput  label="Wheelchair"  type="checkbox" id="checkbox23" getValue={this.getCheckValue} /></div>
     <div className='text-center red-text'> <MDBInput  label="Round Trip"  type="checkbox" id="checkbox24" getValue={this.getCheck2Value} /></div>

            <MDBTimePicker id="timePicker" label="Appointment Time" getValue={this.getPickerValue} />
            <MDBTimePicker id="timePicker" label="Pickup Time" getValue={this.getPicker2Value} />

            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(3)}>previous</MDBBtn>
            <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(5)}>Next</MDBBtn>
          </MDBCol>)}

          {this.state.formActivePanel1 == 5 &&
          (<MDBCol md="12">

            <h2 className="text-center font-weight-bold my-4">Trip Summary</h2>
            <div className="text-center"><MDBBtn color="primary" rounded  onClick={this.toggle}><MDBIcon icon="info" /> Trip Details</MDBBtn></div>
            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(4)}>previous</MDBBtn>
            <MDBBtn color="success" rounded className="float-right" onClick={this.calcDistance}>submit</MDBBtn>
          </MDBCol>)}
        </MDBRow>
        </div>
      </form>

      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>

        <MDBModalBody>
        <h4 className="my-4">Details:<div className='red-text'> {this.state.address}</div></h4>
            <h4 className="my-4 ">Destination Address:<div className='red-text'> {this.state.address2}</div></h4>
            <h4 className="my-4">Est Time: <div className='red-text'>{this.state.duration}</div></h4>
            <h4 className="my-4">Est Miles: <div className='red-text'>{this.state.distance}</div></h4>
            <h4 className="my-4">Est Cost: <div className='red-text'>${this.state.price}</div></h4>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn rounded color="primary" onClick={this.toggle}>Close</MDBBtn>

        </MDBModalFooter>
      </MDBModal>

      <MDBModal isOpen={this.state.modal1} toggle={this.toggle1}>
        <MDBModalHeader toggle={this.toggle1}>New Customer</MDBModalHeader>
        <MDBModalBody><div className="text-left">
        <MDBInput icon='user' getValue={this.getFNValue} label="First Name" className="mt-4" autoFocus={this.calculateAutofocus(1)} />
            <MDBInput icon='user' getValue={this.getLNValue} label="Last Name" className="mt-4" />
            <MDBInput icon='phone' getValue={this.getPhoneValue} label="Phone Number" className="mt-4" />
            <MDBInput icon='envelope-open' getValue={this.getEmailValue} label="Email Address" className="mt-4" />
            </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle1}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  };
}

export default AddTrips;