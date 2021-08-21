import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesLanding from '../../components/RoutesLanding';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import logo from '../../assets/logo.png';
import sidenav from '../../assets/sidenav.jpg';
import Logged from '../../components/pages/login';
import './main.css';

import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, ToastContainer,  MDBIcon, MDBSideNavItem, MDBSideNavCat, MDBSideNavNav, MDBSideNav } from "mdbreact";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStateA: false,
      breakWidth: 1300,
      windowWidth: 0
    };


  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {


    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () =>
    this.setState({
      windowWidth: window.innerWidth
    });

  handleToggleClickA = () => {
    this.setState({
      toggleStateA: !this.state.toggleStateA
    });
  };

  goToLogin = () => {
    location.href='/login'
   }

  render() {
 const { match, location, history } = this.props;
    const navStyle = {
      paddingLeft:
        this.state.windowWidth > this.state.breakWidth ? "210px" : "16px"
    };

    const mainStyle = {
      margin: "0 6%",
      paddingTop: "5.5rem",
      paddingLeft:
        this.state.windowWidth > this.state.breakWidth ? "240px" : "0"
    };

    const specialCaseNavbarStyles = {
      WebkitBoxOrient: "horizontal",
      flexDirection: "row"
    };

    return (
      <div id='videobackground'>


      <Router>

        <div className="fixed-sn grey-skin">
        <MDBSideNav
            logo={logo}
            triggerOpening={this.state.toggleStateA}
            breakWidth={this.state.breakWidth}
            bg={sidenav}
            mask="strong"
            fixed
            className='side-nav'
            href='/'

          >
            <li>
              <ul className="social">
                <li>
                  <a href="#!">
                    <MDBIcon fab icon="facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <MDBIcon fab icon="pinterest" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <MDBIcon fab icon="google-plus-g" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <MDBIcon fab icon="twitter" />
                  </a>
                </li>
              </ul>
            </li>

            <MDBSideNavNav>

              <MDBSideNavItem href='#'>

                <MDBIcon  icon='tshirt' className='fa-fw me-3' />
                Shop </MDBSideNavItem>




                <ul id="logout_sidebar_button" >
                  <li> <hr/> </li>
          <li>&copy; {new Date().getFullYear()} Five G Services</li>
      </ul>


            </MDBSideNavNav>

          </MDBSideNav>
          <div className="grey-skin">
          <MDBNavbar style={navStyle} className="color-nav"   double expand="md" fixed="top" scrolling>



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
              <MDBNavItem className="d-none d-md-inline" style={{ paddingTop: 5 }}>

              </MDBNavItem>
            </MDBNavbarNav>

            <MDBNavbarNav right style={specialCaseNavbarStyles}>



              <MDBNavItem>
                <MDBNavLink to="/login" onClick={this.goToLogin} >
                   <MDBIcon icon="user" className="d-inline-inline" />{" "}
                   Login/Register
                </MDBNavLink>
              </MDBNavItem>


            </MDBNavbarNav>

          </MDBNavbar>




        </div>
        </div>
      </Router>


      </div>
    );
  }
}

export default withRouter(Main);