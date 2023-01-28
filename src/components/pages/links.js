import React, { Component } from 'react';
import {
  MDBContainer, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem

} from 'mdb-react-ui-kit';


class Links extends Component {
  render() {
    return (
      <MDBContainer header='Animated'>

<MDBDropdown>
      <MDBDropdownToggle tag='a' className='btn btn-primary'>
        Dropdown link
      </MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem link href='https://fivegtransportation-com.awsapps.com/auth/?client_id=6b9615ec01be1c8d&redirect_uri=https%3A%2F%2Fwebmail.mail.us-east-1.awsapps.com%2Fworkmail%2F'>Company Support Email</MDBDropdownItem>
        <MDBDropdownItem link href='https://www.fivegtransportation.com/'>Company Website</MDBDropdownItem>
        <MDBDropdownItem link href='https://www.vetbiz.va.gov/advancedsearch/searchresults/businessdetails/?acctid=528fa24c-223b-eb11-a813-001dd801ad19'> Business Profiles</MDBDropdownItem>
        <MDBDropdownItem link href='https://web.sba.gov/pro-net/search/dsp_profile.cfm?RequestTimeout=60&DUNS=117773698'> Veteran Business Profile</MDBDropdownItem>
        <MDBDropdownItem link href='http://search.sunbiz.org/Inquiry/corporationsearch/SearchResultDetail?inquirytype=EntityName&directionType=PreviousList&searchNameOrder=FIVEGSERVICES%20L200003490930&aggregateId=flal-l20000349093-ba1012e9-bb70-45ef-9483-99b47c00814f&searchTerm=THE%20FIVE%20FOUNDATION%2C%20INC.&listNameOrder=FIVEGRIVERVIEW%20L050001062573'> Sunbiz Profile</MDBDropdownItem>
        <MDBDropdownItem link href='ttps://dashboard.checkr.com/candidates?page=1&per_page=25&order_by=created_at&sort=desc'> Sunbiz Profile</MDBDropdownItem>
        <MDBDropdownItem link href='#home'> Employee Background Checks</MDBDropdownItem>

      </MDBDropdownMenu>
    </MDBDropdown>

      </MDBContainer>
    );
  }
}

export default Links;