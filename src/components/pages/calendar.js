import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { API,  graphqlOperation } from "aws-amplify";
import * as mutations from '../../graphql/mutations';
import { listTrips } from '../../graphql/queries';
import { MDBInput, MDBBadge, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBTable, MDBTableBody, MDBTableHead, MDBModalDialog, MDBModalContent,MDBRadio  } from 'mdb-react-ui-kit';

import "./calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class Calendars extends Component {
  state = {
     modal: false,
      address: '',
      address2: '',
      customer: '',
     phoneNumber:'',
     pickupTime:'',
     distance: '',
     radio: '',
     status: '',
     notes: '',
     badge: '',
     localData:[],
     cost:'',
    events: [

    ]
  };
 sortByTime =(b, a) => {
    if (a.appointmentTime < b.appointmentTime) {
        return 1;
    }
    if (a.appointmentTime > b.appointmentTime) {
        return -1;
    }
    return 0;
  }


  async componentDidMount(){

    let today = new Date();
    let formattedToday = (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getDate().toString().padStart(2, '0') + '/' + today.getFullYear();



    const apiData = await API.graphql(graphqlOperation(listTrips, { limit: 2000 }));


    var myCustomers = [];
    //console.log(apiData)

    apiData.data.listTrips.items.sort(this.sortByTime).map((customer) => {
    // console.log(customer)
    let customerDate = new Date(customer.appointmentDate);
    today.setHours(0, 0, 0, 0);
customerDate.setHours(0, 0, 0, 0);


if(customer.status == 'pending' || customer.status == 'new'){


  if(customer.wheelchair == 'Wheelchair' && customerDate >= today && customer.appointmentTime === 'Will Call')


  {
    //console.log('Condition met for:', customer.fname);
    myCustomers.push({

      title: customer.fname + ' ' + customer.lname + ' ' +  customer.appointmentTime +  ' WC',

      start: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'})),
      end: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'})),

      allday: 'Will Call',
      name: customer
      });


  }


  if(customer.wheelchair == 'Wheelchair' && customerDate >= today && customer.appointmentTime !== 'Will Call')
      {

        myCustomers.push({

          title: customer.fname + ' ' + customer.lname + ' ' +  customer.appointmentTime +  ' WC',

          start: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
          year: 'numeric'})),
          end: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
          year: 'numeric'})),

          allday: 'yes',
          name: customer
          });


      }
    if(customer.status == 'new')
      {
        this.setState({ badge:<MDBBadge color="primary">New</MDBBadge>});
        myCustomers.push({

          title: 'New: ' + customer.appointmentTime + ' ' + customer.fname + ' ' + customer.lname,

          start: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
          year: 'numeric'})),
          end: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
          year: 'numeric'})),

          newRequest: 'yes',
          name: customer
          });


      }
 /*      else{
      myCustomers.push({

      title: customer.fname + ' ' + customer.lname + ' ' +  customer.appointmentTime,

      start: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'})),
      end: new Date(customer.appointmentDate.toLocaleString('en-US', {   month: '2-digit', day: '2-digit',
      year: 'numeric'})),
       name: customer


      });
    } */
  }

  })
  this.setState({


      events: this.state.events.concat(myCustomers)

  });
  }
toggle = (data) => {

  if(data){

  //console.log(data)
  this.setState({localData:data});
this.setState({ address: data.address});
this.setState({ address2: data.address2});
this.setState({ phoneNumber: data.phoneNumber});
this.setState({ customer: data.fname +  ' ' + data.lname});
this.setState({ distance: data.distance});
this.setState({ cost: data.cost});
this.setState({ notes: data.notes});
this.setState({ pickupTime: data.pickupTime});
  }

  this.setState({
    modal: !this.state.modal
  });

}

onClick = nr => () => {
  this.setState({
    radio: nr
  });
};

handleChange = () =>{

  this.setState({
    status: 'pending'
  });
}
handleChange1 = () =>{

  this.setState({
    status: 'complete'
  });
  }

  handleChange2 = () =>{

    this.setState({
      status: 'canceled'
    });
    }


    handleRowClick  = () =>{
      if(this.state.radio == "")
      {
      alert("Please make a selection. ")
      return;

      }

          var updateTrip = {
            id: this.state.localData.id,
            status: this.state.status
          };


          API.graphql(graphqlOperation( mutations.updateTrip,{input: updateTrip, limit: 2000 })).then(( )=> {
            //alert('Trip Updated. ')
             this.setState({modal: false})
          this.setState({data: this.state.data})

          alert('Updated');
          location.reload()

          })

        }



  render() {
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          popup={true}
          defaultDate={new Date()}
          defaultView="month"
            onSelectEvent={events => this.toggle(events.name)}
          events={this.state.events}
          style={{ height: "100vh" }}
          eventPropGetter={(event) => {
            let backgroundColor = ''; // initialize with an empty string or default color
            if (event.allday === 'Will Call') {
                backgroundColor = 'Grey';
            } else if (event.newRequest) {
                backgroundColor = 'red';
            } else if (event.allday) {
                backgroundColor = 'orange';
            }
            return { style: { backgroundColor } };
        }}
        />


      <MDBModal staticBackdrop show={this.state.modal}  tabIndex='-1'>
      <MDBModalDialog>
          <MDBModalContent>
        <MDBModalHeader>{this.state.customer}</MDBModalHeader>
        <MDBModalBody>
         <MDBTable>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Pickup Address</th>
          <th>Destination Address</th>
          <th>Phone Number</th>


        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>
          <td>{this.state.address}</td>
          <td>{this.state.address2}</td>
          <td>{this.state.phoneNumber}</td>

        </tr>

      </MDBTableBody>
    </MDBTable>

    <MDBTable>
      <MDBTableHead>
        <tr>
          <th>#</th>

          <th>Pickup Time</th>
          <th>Miles</th>
          <th>Notes</th>
          <th>Cost</th>

        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>

          <td>{this.state.pickupTime}</td>
          <td>{this.state.distance}</td>
          <td>{this.state.notes}</td>
          <td>{this.state.cost}</td>
        </tr>

      </MDBTableBody>
    </MDBTable>
    <form>
        <MDBRadio inline
          onClick={this.onClick(1)}
          checked={this.state.radio === 1 ? true : false}
          label='Pending'
          type='radio'
          id='radio1'
          className='mr-5'
          onChange={this.handleChange}
        />
        <MDBRadio inline
          onClick={this.onClick(2)}
          checked={this.state.radio === 2 ? true : false}
          label='Complete'
          type='radio'
          id='radio2'
          className='mr-5'
          onChange={this.handleChange1}
        />
        <MDBRadio inline
          onClick={this.onClick(3)}
          checked={this.state.radio === 3 ? true : false}
          label='Canceled'
          type='radio'
          id='radio3'
          className='mr-5'
          onChange={this.handleChange2}
        />
      </form>
        </MDBModalBody>
        <MDBModalFooter>
        <MDBBtn color="primary" rounded outline onClick={this.handleRowClick}>Update Status</MDBBtn>
          <MDBBtn color="primary" rounded onClick={this.toggle}>Close</MDBBtn>

        </MDBModalFooter>

          </MDBModalContent>
          </MDBModalDialog>
      </MDBModal>
      </div>
    );
  }
}

export default Calendars;