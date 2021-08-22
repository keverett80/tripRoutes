import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFormInline,
  MDBAnimation
} from 'mdbreact';
import './main.css';
import Logged from '../../components/pages/login';
import RoutesLanding from '../../components/RoutesLanding';
import { withRouter } from "react-router";
import Login from "../auth/pageLogin"

class Main extends React.Component {
  state = {
    collapseID: ''
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  componentDidMount() {
    document.querySelector('nav').style.height = '65px';
  }

  componentWillUnmount() {
    document.querySelector('nav').style.height = 'auto';
  }

  render() {
    const { collapseID } = this.state;
    const overlay = (
      <div
        id='sidenav-overlay'
        style={{ backgroundColor: 'transparent' }}
        onClick={this.toggleCollapse('navbarCollapse')}
      />
    );
    return (
      <div id='classicformpage'>
        <Router>
          <div>
            <MDBNavbar
              dark
              expand='md'
              scrolling
              fixed='top'
              style={{ marginTop: '0px' }}
            >
              <MDBContainer>
                <MDBNavbarBrand>
                  <strong className='white-text'>Trips and Routes</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler
                  onClick={this.toggleCollapse('navbarCollapse')}
                />
                <MDBCollapse id='navbarCollapse' isOpen={collapseID} navbar>

                  <MDBNavbarNav right>
                  <MDBNavItem>

              </MDBNavItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
            {collapseID && overlay}
          </div>
        </Router>

        <MDBView>
          <MDBMask className='d-flex justify-content-center align-items-center gradient' />
          <MDBContainer
            style={{ height: '100%', width: '100%', paddingTop: '10rem' }}
            className='mt-5  d-flex justify-content-center align-items-center'
          >
            <MDBRow>
              <MDBAnimation
                type='fadeInLeft'
                delay='.3s'
                className='white-text text-center text-md-left col-md-6 mt-xl-5 mb-5'
              >
                <h1 className='h1-responsive font-weight-bold'>
                  Management Portal
                </h1>
                <hr className='hr-light' />
                <h6 className='mb-4'>
                The worlds best in class Transportation portal for trips and routes, for all types of businesses that use transportation.
                </h6>

              </MDBAnimation>

             <MDBCol md='6' xl='5' className='mb-4'>
                <MDBAnimation type='fadeInRight' delay='.3s'>
                  <MDBCard id='classic-card'>
                    <MDBCardBody className='white-text'>
                      <h3 className='text-center'>
                        <MDBIcon icon='user' /> Login:
                      </h3>
                      <hr className='hr-light' />
                    <Login/>

                    </MDBCardBody>
                  </MDBCard>
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBView>

        <MDBContainer>
          <MDBRow className='py-5'>
            <MDBCol md='12' className='text-center'>
            <div className="pt-4 footer">
            <MDBIcon fab icon="facebook" className="mr-3"/>
                <MDBIcon fab icon="twitter" className="mr-3"/>
                <MDBIcon fab icon="youtube" className="mr-3"/>
                <MDBIcon fab icon="google-plus" className="mr-3"/>
                <MDBIcon fab icon="dribbble" className="mr-3"/>
                <MDBIcon fab icon="pinterest" className="mr-3"/>

                <p className="footer-copyright mb-0 py-3 text-center">
                &copy; {new Date().getFullYear()} Copyright: <a href="#"> Five G Services</a>
            </p>


            </div>


            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default withRouter(Main);