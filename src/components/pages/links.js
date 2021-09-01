import React, { Component } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBTreeview,
  MDBTreeviewList,
  MDBTreeviewItem
} from 'mdbreact';

class Links extends Component {
  render() {
    return (
      <MDBContainer header='Animated'>
        <MDBCol md='4'>
          <MDBTreeview header='Business Helpful Links' className='w-20'>
            <MDBTreeviewList icon='envelope-open' title='Mail' far opened >
              <a href='https://fivegtransportation-com.awsapps.com/auth/?client_id=6b9615ec01be1c8d&redirect_uri=https%3A%2F%2Fwebmail.mail.us-east-1.awsapps.com%2Fworkmail%2F' target='_blank'><MDBTreeviewItem icon='address-book' title='Company Support Email' far /></a>
              <a href='https://www.fivegtransportation.com/' target='_blank'><MDBTreeviewItem icon='link' title='Company Website'  /></a>

            </MDBTreeviewList>
            <MDBTreeviewList icon='user' title='Business Profiles' far opened >
              <a href='https://www.vetbiz.va.gov/advancedsearch/searchresults/businessdetails/?acctid=528fa24c-223b-eb11-a813-001dd801ad19' target='_blank'><MDBTreeviewItem title='Veteran Business Profile' far /></a>
              <a href='https://web.sba.gov/pro-net/search/dsp_profile.cfm?RequestTimeout=60&DUNS=117773698' target='_blank'><MDBTreeviewItem title='SBA Business Profile' far /></a>
              <a href='http://search.sunbiz.org/Inquiry/corporationsearch/SearchResultDetail?inquirytype=EntityName&directionType=PreviousList&searchNameOrder=FIVEGSERVICES%20L200003490930&aggregateId=flal-l20000349093-ba1012e9-bb70-45ef-9483-99b47c00814f&searchTerm=THE%20FIVE%20FOUNDATION%2C%20INC.&listNameOrder=FIVEGRIVERVIEW%20L050001062573' target='_blank'><MDBTreeviewItem title='Sunbiz Profile' far /></a>
              <a href='https://apps.ahca.myflorida.com/SingleSignOnPortal/Login.aspx?ReturnUrl=%2fSingleSignOnPortal%2f' target='_blank'><MDBTreeviewItem title='Medicaid Profile' far /></a>

            </MDBTreeviewList>
            <MDBTreeviewList icon='users' title='Brokers'opened >
              <a href='https://a2ctp.emsc.net/Login.aspx?ReturnUrl=%2fAcceptedTrips.aspx' target='_blank'><MDBTreeviewItem icon='circle' title='Access2Care' /></a>
              <a href='https://providers.veyo.com/account/login' target='_blank'><MDBTreeviewItem icon='circle' title='Veyo' /></a>
              <a href='https://tntproviders.onecallcm.com/VendorConfirm/VendorConfirm.aspx' target='_blank'><MDBTreeviewItem icon='circle' title='One Call Care' /></a>

            </MDBTreeviewList>
           <a href=' https://dashboard.checkr.com/candidates?page=1&per_page=25&order_by=created_at&sort=desc' target='_blank'> <MDBTreeviewItem icon='id-card' title='Employee Background Checks' far /></a>
           <a href='https://ads.google.com/home/#!/' target='_blank'><MDBTreeviewItem fab icon='goodreads' title='Business Ad Management' /></a>

          </MDBTreeview>
        </MDBCol>
      </MDBContainer>
    );
  }
}

export default Links;