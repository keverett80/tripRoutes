import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MDBInput, MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBSideNavItem, MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink } from "mdbreact";
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.png";
import { AmplifySignOut } from '@aws-amplify/ui-react';
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

            <MDBSideNavNav>

            <MDBSideNavCat
                name="Trips"
                id="contact-me-cat"
                icon="car"
              >
                <MDBSideNavItem href='/addTrips'>Add Trips</MDBSideNavItem>
                <MDBSideNavItem href='/driversAssign'>Assign Drivers</MDBSideNavItem>
                <MDBSideNavItem href='/tripReady'>Ready Pickup</MDBSideNavItem>
                <MDBSideNavItem href='/driverStatus'>Driver Status</MDBSideNavItem>
                <MDBSideNavItem href='/driverLocation'>Driver Location</MDBSideNavItem>
                <MDBSideNavItem href='/import'>Import Trips</MDBSideNavItem>
                <MDBSideNavItem href='/viewTrips'>Pending Trips</MDBSideNavItem>
                <MDBSideNavItem href='/archived'>Archived Trips</MDBSideNavItem>


              </MDBSideNavCat>

              <MDBSideNavCat
                name="Edits"
                id="contact-me-cat"
                icon="pen"
              >
                <MDBSideNavItem href='/editCustomer'>Edit Customers</MDBSideNavItem>
                <MDBSideNavItem href='/editTrips'>Edit Trips</MDBSideNavItem>


              </MDBSideNavCat>

              <MDBSideNavCat
                name="Invoices"
                id="contact-me-cat"
                icon="dollar-sign"
              >

                <MDBSideNavItem href='/invoice'>Manage Invoices</MDBSideNavItem>
                <MDBSideNavItem href='/allInvoices'>Paid Invoices</MDBSideNavItem>


              </MDBSideNavCat>


              <MDBSideNavCat
                name="Five G Info"
                id="contact-me-cat"
                icon="building"
              >


                <MDBSideNavItem href='/drivers'>Add Drivers</MDBSideNavItem>
                <MDBSideNavItem href='/vehicles'>Add Vehicles</MDBSideNavItem>
                <MDBSideNavItem href='/brokers'>Add Brokers</MDBSideNavItem>
                <MDBSideNavItem href='/links'>Business Links</MDBSideNavItem>
                <MDBSideNavItem href='/dash'>Dashboards</MDBSideNavItem>
              </MDBSideNavCat>
            </MDBSideNavNav>
          </MDBSideNav>
          <MDBNavbar double expand="md" fixed="top" scrolling>
            <MDBNavbarNav left>
              <MDBNavItem>
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
              </MDBNavItem>

            </MDBNavbarNav>
            <MDBNavbarNav right style={specialCaseNavbarStyles}>
            <MDBNavItem>
                <MDBNavLink to="/calendar">
                  <MDBIcon icon="calendar" className="d-inline-inline" />{" "}
                  <div className="d-none d-md-inline">Calendar</div>
                </MDBNavLink>
              </MDBNavItem>

              <MDBNavItem>
                <MDBNavLink to="#!">
                  <MDBIcon icon="user" className="d-inline-inline" />{" "}
                  <div className="d-none d-md-inline">{this.state.user}</div>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">Sign Out</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right>
                    <MDBDropdownItem href="#!"><AmplifySignOut handleAuthStateChange={this.handleAuthStateChange} /></MDBDropdownItem>

                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBNavbar>

        </div>

    );
  }
}

export default TopNavigation;