//*Important!* Use below import statement when using in React
import React, { Component } from "react";
import easyinvoice from 'easyinvoice';
import { API,  graphqlOperation } from "aws-amplify";
import {Helmet} from "react-helmet";
import * as mutations from '../../graphql/mutations';
import { listBrokers, listCustomers, listTrips, listInvoices } from '../../graphql/queries';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn,  MDBTable, MDBTableBody, MDBTableHead , MDBDataTableV5,MDBIcon, MDBDatePicker, MDBSelect, MDBCard, MDBCardBody  } from "mdbreact";
import myLogo from '../../assets/logo.png'
import './invoice.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Invoice extends React.Component {
  constructor(props) {
    super(props)
    /* this.invoiceBase64 = "Hello world!"     */
    this.state = {
      id:'',
      formActivePanel1Changed: false,
    	 invoiceBase64: '',
       formActivePanel3: 1,
       formActivePanel1Changed: false,
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
             label: 'Name',
             field: 'name',
             sort: 'asc',
             width: 150,
           },
           {
             label: 'Cost',
             field: 'cost',
             sort: 'asc',
             width: 150,
           },
           {
             label: 'Appointment Date',
             field: 'date',
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
          label: 'PO Number',
          field: 'poNumber',
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
}

  async componentDidMount(){
    const apiData = await API.graphql(graphqlOperation( listInvoices , { limit: 1000 }))
    this.state.queryData  = apiData.data.listInvoices.items;

    var myCustomers = [];

    this.state.queryData.sort(this.sortByDate).map((customer) => {

      //console.log(customer.address)


        if(customer.status !== 'paid'){
      myCustomers.push({
        id: customer.id,

     poNumber: customer.poNumber,
name: customer.name,
broker: customer.broker,
date: customer.date,
product: customer.product,
cost: customer.cost,
distance: customer.distance,
address: customer.address,
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
      if (a.date < b.date) {
          return 1;
      }
      if (a.date > b.date) {
          return -1;
      }
      return 0;
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
  async createInvoice() {
    //See documentation for all data properties
    const data = this.generateInvoice();
    const result = await easyinvoice.createInvoice(data);
  	this.setState({
			invoiceBase64: result.pdf
    });
  }
  async downloadInvoice() {
    //See documentation for all data properties
    const data = this.generateInvoice();
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(this.state.name, result.pdf);
    //	you can download like this as well:
    //	easyinvoice.download();
    //	easyinvoice.download('myInvoice.pdf');
  }
  async renderInvoice(){
     //See documentation for all data properties
     document.getElementById("pdf").innerHTML = "Loading...";
     const data = this.generateInvoice();
     const result = await easyinvoice.createInvoice(data);
     easyinvoice.render('pdf', result.pdf);
  }

  handleRowClick = (data) =>
  {
    this.state.id = data.id
 this.state.poNumber = data.poNumber
this.state.name= data.name
this.state.broker = data.broker
this.state.date = data.date
this.state.product = data.product
this.state.cost = data.cost
this.state.distance = data.distance
this.state.address = data.address

   //console.log(data)
  }


  submit = () => {

    confirmAlert({
      title: 'Pay Invoice',
      message: 'Are you sure you want to mark invoice as paid? ',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>  this.invoiceStatus()

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




  invoiceStatus  = () =>{


      var myInvoice = {
          id: this.state.id,
          status: 'paid'
        };


        API.graphql(graphqlOperation( mutations.updateInvoice,{input: myInvoice, limit: 1000 })).then(( )=> {
          //alert('Trip Updated. ')




        alert('Invoice Updated');
        location.reload()

        })

      }

  render() {
    return (






        <MDBContainer>
          <div className="application">
            <Helmet>
            <script src="https://unpkg.com/pdfjs-dist/build/pdf.min.js"></script>
<script src="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js"></script>


            </Helmet>

        </div>
      <MDBCard>
        <MDBCardBody>
          <MDBRow className="pt-5 justify-content-center">
            <MDBCol md="12" className="pl-5 pl-md-0 pb-5">
            <MDBStepper form>
            <MDBStep form>
                  <a href="#formstep1" onClick={this.swapFormActive(1)(1)}>
                    <MDBBtn color={ this.state.formActivePanel1===1 ? "indigo" : "success" } circle>
                      1
                    </MDBBtn>
                  </a>
                  <p>Select Trip</p>
                </MDBStep>
                <MDBStep form>
                  <a href="#formstep2" onClick={this.swapFormActive(1)(2)}>
                    <MDBBtn color={ this.state.formActivePanel1===2 ? "indigo" : "success" } circle>
                      2
                    </MDBBtn>
                  </a>
                  <p>Preview Invoice</p>
                </MDBStep>
                <MDBStep form>
                  <a href="#formstep3" onClick={this.swapFormActive(1)(3)}>
                    <MDBBtn color={ this.state.formActivePanel1===3 ? "indigo" : "success" } circle>
                      3
                    </MDBBtn>
                  </a>
                  <p>Download Invoice</p>
                </MDBStep>

      </MDBStepper>

            </MDBCol>
            </MDBRow>
            <MDBRow>

            <MDBCol md="12">
              {this.state.formActivePanel1 === 1 && (
              <MDBCol md="12" className='text-center'>
                <h3 className="font-weight-bold pl-0 my-4">
                  <strong>Create Invoice</strong>
                </h3>
                <MDBDataTableV5
      hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4}
      searchTop searchBottom={false}
      barReverse

      onClick={this.handleNextPrevClick(1)(2)}
   data={this.state.customers}


    />

              </MDBCol>
              )}
              {this.state.formActivePanel1 === 2 && (
              <MDBCol md="12" className='text-center'>
                <h3 className="font-weight-bold pl-0 my-4">
                  <strong>Preview</strong>
                </h3>

        <MDBBtn   rounded outline color="warning" onClick={()=>this.renderInvoice()}>Preview Invoice</MDBBtn>
        <br/>
        <br/>

        <div id="pdf"></div>
                <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(1)}>
                  previous
                </MDBBtn>
                <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(3)}>
                  next
                </MDBBtn>
              </MDBCol>
              )}
              {this.state.formActivePanel1 === 3 && (
              <MDBCol md="12">
<MDBTable>
      <MDBTableHead color="blue-gradient" textWhite>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>PO #</th>
          <th>Amount</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>
          <td>{this.state.name}</td>
          <td>{this.state.poNumber}</td>
          <td>{this.state.cost}</td>
        </tr>

      </MDBTableBody>
    </MDBTable>

<div className='text-center'>

        <MDBBtn tag="a" size="lg" floating gradient="blue" onClick={()=>this.downloadInvoice()}>
        <MDBIcon icon="download" />
      </MDBBtn>
      </div>

                <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(2)}>
                  previous
                </MDBBtn>

                <MDBBtn color="dark-green" rounded className="float-right" onClick={this.submit}>
                <MDBIcon icon="dollar-sign" className="mr-1" />    Paid
                </MDBBtn>

              </MDBCol>
              )}


            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>







    )
  }

  generateInvoice() {

    var address = this.state.address;
    var locationArr = address.split(',');

    var streetAddress = locationArr[0]; // New York City
    var city = locationArr[1];
    var zip = locationArr[2]; // 10024
    var state = locationArr[3];
    var date = new Date(this.state.date); // Now
    date.setDate(date.getDate() + 30); // Set now + 30 days as the new date
    var options = {

      year: "numeric",
      month: "2-digit",
      day: "numeric"
  };

  return {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE

    //"locale": "de-DE",
    //Defaults to en-US. List of locales: https://datahub.io/core/language-codes/r/3.html

    "currency": "USD",
    //Defaults to no currency. List of currency codes: https://www.iban.com/currency-codes

    "taxNotation": "vat", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "images": {

      "background": "",

    "logo": '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', //or base64
		"background": '', //or base64
  },
    "sender": {
      "company": 'Five G Transportation',
      "address": "1125 Kingsley Ave",
      "country": "Suite C",
      "zip": "32073",
      "city": "Orange Park",

      "custom1": "904-503-1963",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    "client": {
      "company": this.state.name,
      "address": streetAddress,
      "city": city,
      "zip": zip,
      "country": state,
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    "information": {
      "number": this.state.poNumber,
      "date": this.state.date,
      "due-date": date.toLocaleString("en", options)
    },

    "products": [
        {
            "quantity": '1',
            "description": this.state.product + ' ' + this.state.distance + 'mi',

            "tax-rate": 0,
            "price": this.state.cost
        }
    ],
    "bottom-notice": "Five G Services LLC",
    //Used for translating the headers to your preferred language
    //Defaults to English. Below example is translated to Dutch
    // "translate": {
    //     "invoiceNumber": "Factuurnummer",
    //     "invoiceDate": "Factuurdatum",
    //     "products": "Producten",
    //     "quantity": "Aantal",
    //     "price": "Prijs",
    //     "subtotal": "Subtotaal",
    //     "total": "Totaal"
    // }
  };
}
}

export default Invoice;