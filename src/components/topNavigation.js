import React, { useState, useEffect } from 'react';
import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBSideNavLink,
  MDBSideNavCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,

  MDBCollapse,

} from 'mdb-react-ui-kit';


import { Auth } from '@aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';

  function TopNavigation({ signOut }) {
  const [darkOpen, setDarkOpen] = useState(true);
  const [darkCollapse1, setDarkCollapse1] = useState(false);
  const [darkCollapse2, setDarkCollapse2] = useState(false);
  const [darkCollapse3, setDarkCollapse3] = useState(false);
  const [darkCollapse4, setDarkCollapse4] = useState(false);
  const [user, setUser] = useState('');
  const [showNavRight, setShowNavRight] = useState(false);



  useEffect(() => {
    // Update the document title using the browser API
    Auth.currentUserInfo().then((userInfo) => {
      console.log(userInfo)

    }, [])
  });
  useEffect(() => {
    const handleSignOutWrapper = () => {
      setTimeout(() => {
        handleSignOut();
      }, 200);
    };

    const handleSignOut = () => {
      // Perform some action when the sign out button is clicked
      window.location.reload();
    };
    const button = document.querySelector('#sign-out-button');
    button.addEventListener('click', handleSignOutWrapper);

    return () => {
      button.removeEventListener('click', handleSignOutWrapper);
    };
  }, []);



  return (
    <div className="mdb-skin">
      <MDBNavbar  dark bgColor='dark' double='true' expand="xl" fixed="top" scrolling>
      <MDBContainer fluid>


        <MDBCollapse navbar show={showNavRight}>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            <MDBNavbarItem>
            <MDBNavbarLink href="/calendar">
                  <MDBIcon icon="calendar" className="d-inline-inline" />{" "}
                  <div className="d-none d-md-inline ">Calendar</div>
                </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <MDBNavbarLink id="sign-out-button" onClick={signOut}>Sign Out</MDBNavbarLink>

            </MDBNavbarItem>


          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
      <MDBSideNav

        isOpen={darkOpen}
        color='light'
        bgColor='dark'
        backdrop={false}
        mode='side'
        getOpenState={(e) => setDarkOpen(e)}
      >
          <div className='text-center'>
          <h3 className='py-4'>Five G Trips</h3>
          <hr className='m-0' />
        </div>
        <MDBSideNavMenu>

          <MDBSideNavItem>
            <MDBSideNavLink icon='angle-down' shouldBeExpanded={darkCollapse1} onClick={() => setDarkCollapse1(!darkCollapse1)}>
              <MDBIcon fas icon='car' className='fa-fw me-3' />
              Trips
            </MDBSideNavLink>
            <MDBSideNavCollapse show={darkCollapse1}>

            <MDBSideNavLink href='/addTrips'>Add Trip</MDBSideNavLink>
            <MDBSideNavLink href='/editTrips'>Edit Trips</MDBSideNavLink>
            <MDBSideNavLink href='/viewTrips'>View All Trips</MDBSideNavLink>
            <MDBSideNavLink href='/archived'>Archived Trips</MDBSideNavLink>
                <MDBSideNavLink href='/driversAssign'>Assign Drivers</MDBSideNavLink>
                <MDBSideNavLink href='/driverStatus'>Driver Status</MDBSideNavLink>




            </MDBSideNavCollapse>
          </MDBSideNavItem>

          <MDBSideNavItem>
            <MDBSideNavLink icon='angle-down' shouldBeExpanded={darkCollapse4} onClick={() => setDarkCollapse4(!darkCollapse4)}>
              <MDBIcon fas icon='building' className='fa-fw me-3' />
              Five G Info
            </MDBSideNavLink>
            <MDBSideNavCollapse show={darkCollapse4}>
            <MDBSideNavLink href='/tripCharts'>Daily Trips</MDBSideNavLink>
            <MDBSideNavLink href='/invoice'>Invoices</MDBSideNavLink>
            <MDBSideNavLink href='/drivers'>Add Drivers</MDBSideNavLink>
                <MDBSideNavLink href='/vehicles'>Add Vehicles</MDBSideNavLink>
                <MDBSideNavLink href='/links'>Business Links</MDBSideNavLink>

            </MDBSideNavCollapse>
          </MDBSideNavItem>
        </MDBSideNavMenu>
      </MDBSideNav>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end p-md-5">
      <MDBBtn className='m-1' style={{ backgroundColor: '#333333' }} floating onClick={() => setDarkOpen(!darkOpen)}>
          <MDBIcon fas icon='bars' />
        </MDBBtn>
      </div>
    </div>
  );
}
export default withAuthenticator(TopNavigation);