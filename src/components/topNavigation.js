import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MDBInput, MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBSideNavItem, MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink } from "mdbreact";
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.png";


class TopNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStateA: false
    };
  }

  handleToggleClickA = () => {
    this.setState({
      toggleStateA: !this.state.toggleStateA
    });
  };

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
                name="Trip Management"
                id="submit-blog-cat"
                icon="chevron-right"
              >

                <MDBSideNavItem href='/addTrips'>Add Trips</MDBSideNavItem>
                <MDBSideNavItem href='/viewTrips'>View Trips</MDBSideNavItem>
                <MDBSideNavItem>Modify Trips</MDBSideNavItem>
              </MDBSideNavCat>

              <MDBSideNavLink to="/drivers" topLevel>
                <MDBIcon icon="address-card" className="mr-2" />Divers</MDBSideNavLink>

                <MDBSideNavLink to="/vehicles" topLevel>
                <MDBIcon icon="truck" className="mr-2" />Vehicles</MDBSideNavLink>

              <MDBSideNavCat
                name="Contact me"
                id="contact-me-cat"
                icon="envelope"
              >
                <MDBSideNavItem>FAQ</MDBSideNavItem>
                <MDBSideNavItem>Write a message</MDBSideNavItem>
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
              <MDBNavItem active>
                <MDBNavLink to="#!">
                  <MDBIcon icon="envelope" className="d-inline-inline" />{" "}
                  <div className="d-none d-md-inline">Contact</div>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!">
                  <MDBIcon far icon="comments" className="d-inline-inline" />{" "}
                  <div className="d-none d-md-inline">Support</div>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!">
                  <MDBIcon icon="user" className="d-inline-inline" />{" "}
                  <div className="d-none d-md-inline">Account</div>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">Dropdown</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right>
                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
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