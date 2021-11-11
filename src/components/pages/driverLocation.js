import React from 'react';
import { MDBContainer, MDBSelect,  MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { API,  graphqlOperation } from "aws-amplify";
import { listTrips, listEmployees} from '../../graphql/queries';
import ReactTooltip from 'react-tooltip';

import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2ZXJldHQiLCJhIjoiY2toNjVlbmJqMDB0bTJybjIyZm4yd3JsMSJ9.DgDX0g0uFuARMIytMYqMNg';


class DriverLocation extends React.Component {
  constructor(props) {
    super(props)

  this.state = {

    driverCount: 0,
    lng: '',
    lat:'',
    zoom: 15,
    activeItemJustified: "1",
    employeeToken: '',
    pickupTime: '',
    driver:'',
    queryData:'',
    queryEmployee:'',
    modal: false,
    radio: '',
    employee:[{text: 'No Driver', value: ''}],
    options: [

    ]





}
this.mapContainer = React.createRef();

  }





  async componentDidMount(){
    window.dispatchEvent(new Event('resize'));
    this.setState({driverCount: 0})
var myThis = this;
    var myEmployee= [{

    }
    ];
     await API.graphql({ query: listEmployees }).then(function(results)
     {


    results.data.listEmployees.items.map((customer, index) => {
    console.log(index)
      myEmployee.push({
      text: customer.firstName + ' ' + customer.lastName ,
      value: index.toString(),

      });

    })
    myThis.setState({
      options: myEmployee

        });
  })


     }
findEmployee = async() =>{


  const locations = await API.graphql({ query: listEmployees });
  if(locations.data.listEmployees.items[this.state.driverCount].location){

    const myObj = JSON.parse(locations.data.listEmployees.items[this.state.driverCount].location)
    this.setState({lng: myObj.coords.longitude});
    this.setState({lat: myObj.coords.latitude});
        this.getLocation();

  }




}

  getLocation = async() =>{

    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
    container: this.mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });
    const marker = new mapboxgl.Marker() // initialize a new marker
  .setLngLat([ lng, lat]) // Marker [lng, lat] coordinates
  .addTo(map); // Add the marker to the map
  map.resize()
  }



  toggleJustified = tab => e => {
    if (this.state.activeItemJustified !== tab) {
      this.setState({
        activeItemJustified: tab
      });
    }
  };






  handleAssign = value => {


    this.setState({ driverCount: Number(value)});
    this.findEmployee();

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

sortByDate =(b, a) => {
  if (a.appointmentDate < b.appointmentDate) {
      return 1;
  }
  if (a.appointmentDate > b.appointmentDate) {
      return -1;
  }
  return 0;
}



  render() {
  return (


<MDBContainer>

<MDBNav tabs className="nav-justified" color='red'>

          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItemJustified === "1"} onClick={this.toggleJustified("1")} role="tab" >
              <MDBIcon icon="map" /> Driver Location
            </MDBNavLink>
          </MDBNavItem>

        </MDBNav>

        <MDBTabContent
          className="card"
          activeItem={this.state.activeItemJustified}
        >

          <MDBTabPane tabId="1" role="tabpanel">
          <div>
          <div ref={this.mapContainer} className="map-container" />
</div>
          </MDBTabPane>
          </MDBTabContent>
          <div>
        <MDBSelect
          search
          options={this.state.options}
          getValue={this.handleAssign}
          selected="Select Employee"

        />
      </div>
     </MDBContainer>

  );
}
  }

export default DriverLocation;