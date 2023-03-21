import React, { useState, useCallback, useEffect } from 'react';
import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBSideNavLink,
  MDBSideNavCollapse,
  MDBIcon,
  MDBContainer,
  MDBNavbar,
  MDBInput,
  MDBInputGroup,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBBadge,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import "./pages/nav.css"

export default function App() {
  const [collapseOpened, setCollapseOpened] = useState('accordionCollapse1');
  const [basicOpen, setBasicOpen] = useState(true);
  const [mode, setMode] = useState('side');
  const [showBasic, setShowBasic] = useState(false);

  const toggleAccordion = (value) => {
    value !== collapseOpened ? setCollapseOpened(value) : setCollapseOpened('');
  };

  const handleResize = useCallback(() => {
    if (!window.matchMedia('screen and (min-width: 1400px)').matches) {
      setMode('side');
      return setBasicOpen(false);
    }

    setMode('push');
    return setBasicOpen(true);
  }, []);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <header>
      <MDBSideNav backdrop={false} mode={mode} isOpen={basicOpen} getOpenState={setBasicOpen}>
        <div className='d-flex justify-content-center py-4'>
          <img
            id='MDB-logo'
            src='https://mdbootstrap.com/wp-content/uploads/2018/06/logo-mdb-jquery-small.webp'
            alt='MDB Logo'
            draggable='false'
          />
        </div>
        <MDBSideNavMenu>
          <MDBSideNavItem>
            <MDBSideNavLink>
              <MDBIcon icon='chart-area' className='fa-fw me-3' />
              Website traffic
            </MDBSideNavLink>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink
              icon='angle-down'
              shouldBeExpanded={collapseOpened === 'accordionCollapse1'}
              onClick={() => toggleAccordion('accordionCollapse1')}
            >
              <MDBIcon icon='cogs' className='fa-fw me-3' />
              Settings
            </MDBSideNavLink>
            <MDBSideNavCollapse id='accordionCollapse1' show={collapseOpened === 'accordionCollapse1'}>
              <MDBSideNavLink>Profile</MDBSideNavLink>
              <MDBSideNavLink>Account</MDBSideNavLink>
            </MDBSideNavCollapse>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink
              icon='angle-down'
              shouldBeExpanded={collapseOpened === 'accordionCollapse2'}
              onClick={() => toggleAccordion('accordionCollapse2')}
            >
              <MDBIcon icon='lock' className='fa-fw me-3' />
              Password
            </MDBSideNavLink>
            <MDBSideNavCollapse id='accordionCollapse2' show={collapseOpened === 'accordionCollapse2'}>
              <MDBSideNavLink>Request password</MDBSideNavLink>
              <MDBSideNavLink>Reset password</MDBSideNavLink>
            </MDBSideNavCollapse>
          </MDBSideNavItem>
        </MDBSideNavMenu>
      </MDBSideNav>

      <MDBNavbar fixed='top' expand='lg' id='main-navbar'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

          <MDBInputGroup className='d-none d-md-flex my-auto'>
            <MDBInput label='Search (ctrl + "/" to focus)' />
            <MDBIcon className='my-auto ms-2' icon='search' />
          </MDBInputGroup>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>

            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
}