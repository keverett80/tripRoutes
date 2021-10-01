
import React from "react";
import { API } from "aws-amplify";
import * as mutations from '../../graphql/mutations';

import { MDBContainer, MDBRow, MDBCol, MDBSpinner   } from "mdbreact";


import { CSVReader } from 'react-papaparse'


const buttonRef = React.createRef()







class ImportTrips extends React.Component {

 constructor(props) {
    super(props);
    this.state = {

      spinner: ''

      };
  }


 handleOnDrop = async (data) => {



this.setState({ spinner:<MDBSpinner crazy />});




    for (let i = 1; i < data.length; i++) {
      if(data[i].data[0])
      {
      let name = data[i].data[1];
      let parts = name.split(' ')
      let firstName = parts.shift();
      let lastName = parts.join(' ');
    let wheelchair;
    console.log(data[i].data[11])
      if (data[i].data[12].toUpperCase() == 'FALSE')
      {

      wheelchair = 'Ambulatory';
      }
      else{
       wheelchair = 'Wheelchair';
      }



      const tripData = {
        id:  data[i].data[0],
        fname: firstName,
        lname: lastName,
        address: data[i].data[2] + ' ' + data[i].data[3] ,
        address2:  data[i].data[5] + ' ' + data[i].data[6] ,

        wheelchair: wheelchair ,
        roundtrip: '',
        appointmentTime: data[i].data[8],
        appointmentDate: data[i].data[7],
        status: 'pending',
        phoneNumber: data[i].data[4] ? data[i].data[4] : '',
        cost: '',
        driver: '',
        distance: data[i].data[10],
        broker: 'Access2Care',
        notes:data[i].data[11] ? data[i].data[11]: '',
        pickupTime: data[i].data[9],
      };
      try {
      await API.graphql({ query: mutations.createTrip, variables: {input: tripData, limit: 1000 }})

    } catch (error) {
      console.error('Failed Adding Data: ' + [i], error);

    }

    }

    if(data.length - 1 === i) {
      this.state.spinner = ''
      alert('Data Uploaded');
      location.reload();
  }
  }








}


handleOnError = (err, file, inputElem, reason) => {
  console.log(err)
  location.reload();
}

handleOnRemoveFile = (data) => {
  console.log('---------------------------')
  console.log(data)
  console.log('---------------------------')
}



render() {
  return (
    <MDBContainer >




<MDBRow>



              <MDBCol md="12">


              <h3 className="text-center">
              <strong>Import Trips</strong></h3>
<h4 className="text-center">{this.state.spinner}</h4>
              <CSVReader
        onDrop={this.handleOnDrop}
        onError={this.handleOnError}
        addRemoveButton
        removeButtonColor='#659cef'
        onRemoveFile={this.handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      </MDBCol>

      </MDBRow>

    </MDBContainer>
    );
  };
}

export default ImportTrips;