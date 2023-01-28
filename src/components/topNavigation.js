import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MDBInput, MDBNavbar, MDBNavbarNav, MDBSideNavItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBSideNavLink, MDBSideNavMenu, MDBSideNav} from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.png";
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from '@aws-amplify/auth';


class TopNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStateA: false,
      user:''
    };
    this.handleAuthStateChange = this.handleAuthStateChange.bind(this);
  }

  componentDidMount(){


      Auth.currentUserInfo().then((userInfo) => {
      //console.log(userInfo)
      this.setState({
        user: userInfo.attributes.email
      });


    }, [])

  }

  handleToggleClickA = () => {
    this.setState({
      toggleStateA: !this.state.toggleStateA
    });
  };

  handleAuthStateChange(state) {



    if(state === 'signedout')
    {

      localStorage.clear();
      window.location.href = "/";

    }
}

  render() {
    const mainStyle = {
      paddingTop: "5rem"
    };

    const specialCaseNavbarStyles = {
      WebkitBoxOrient: "horizontal",
      flexDirection: "row"
    };

    return (

        <div className="mdb-skin">
          <MDBSideNav
            logo={logo}
            triggerOpening={this.state.toggleStateA}

            mask="strong"
           fixed
          >

            <MDBSideNavMenu>

            <MDBSideNavLink
                name="Trips"
                id="contact-me-cat"
                icon="car"
              >
                <MDBSideNavItem href='/addTrips'>Add Trip</MDBSideNavItem>
                <MDBSideNavItem href='/driversAssign'>Assign Drivers</MDBSideNavItem>
                <MDBSideNavItem href='/tripReady'>Ready Pickup</MDBSideNavItem>
                <MDBSideNavItem href='/driverStatus'>Driver Status</MDBSideNavItem>
                <MDBSideNavItem href='/driverLocation'>Driver Location</MDBSideNavItem>
                <MDBSideNavItem href='/import'>Import Trips</MDBSideNavItem>
                <MDBSideNavItem href='/viewTrips'>Pending Trips</MDBSideNavItem>
                <MDBSideNavItem href='/archived'>Archived Trips</MDBSideNavItem>


              </MDBSideNavLink>

              <MDBSideNavLink
                name="Edits"
                id="contact-me-cat"
                icon="pen"
              >
                <MDBSideNavItem href='/editCustomer'>Edit Customers</MDBSideNavItem>
                <MDBSideNavItem href='/editTrips'>Edit Trips</MDBSideNavItem>


              </MDBSideNavLink>

              <MDBSideNavLink
                name="Invoices"
                id="contact-me-cat"
                icon="dollar-sign"
              >

                <MDBSideNavItem href='/invoice'>Invoices</MDBSideNavItem>



              </MDBSideNavLink>


              <MDBSideNavLink
                name="Five G Info"
                id="contact-me-cat"
                icon="building"
              >


                <MDBSideNavItem href='/drivers'>Add Drivers</MDBSideNavItem>
                <MDBSideNavItem href='/vehicles'>Add Vehicles</MDBSideNavItem>
                <MDBSideNavItem href='/brokers'>Add Brokers</MDBSideNavItem>
                <MDBSideNavItem href='/links'>Business Links</MDBSideNavItem>
                <MDBSideNavItem href='/dash'>Dashboards</MDBSideNavItem>
              </MDBSideNavLink>
            </MDBSideNavMenu>
          </MDBSideNav>
          <MDBNavbar double expand="md" fixed="top" scrolling>
            <MDBNavbarNav left>
              <MDBSideNavItem>
                <div
                  onClick={this.handleToggleClickA}
                  key="sideNavToggleA"
                  style={{
                    lineHeight: "32px",
                    marginRight: "1em",
                    verticalAlign: "middle"
                  }}
                >
                  <MDBIcon icon="bars" color="white" size="2x" />
                </div>
              </MDBSideNavItem>

            </MDBNavbarNav>
            <MDBNavbarNav right style={specialCaseNavbarStyles}>
            <MDBSideNavItem>
                <MDBSideNavLink to="/calendar">
                  <MDBIcon icon="calendar" className="d-inline-inline" />{" "}
                  <div className="d-none d-md-inline">Calendar</div>
                </MDBSideNavLink>
              </MDBSideNavItem>

              <MDBSideNavItem>
                <MDBSideNavLink to="#!">
                  <MDBIcon icon="user" className="d-inline-inline" />{" "}
                  <div className="d-none d-md-inline">{this.state.user}</div>
                </MDBSideNavLink>
              </MDBSideNavItem>
              <MDBSideNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">Sign Out</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right>
                    <MDBDropdownItem href="#!"><Authenticator handleAuthStateChange={this.handleAuthStateChange} /></MDBDropdownItem>

                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBSideNavItem>
            </MDBNavbarNav>
          </MDBNavbar>

        </div>

    );
  }
}

export default TopNavigation;