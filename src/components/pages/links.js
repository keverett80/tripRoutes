import React from "react";
import { MDBDatatable, MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const Links = () => {
  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
      },
      {
        label: "Action",
        field: "action",
      },
    ],
    rows: [
      {
        name: "Company Support Email",
        link: "https://fivegtransportation-com.awsapps.com/auth/?client_id=6b9615ec01be1c8d&redirect_uri=https%3A%2F%2Fwebmail.mail.us-east-1.awsapps.com%2Fworkmail%2F",
      },
      {
        name: "Company Website",
        link: "https://www.fivegtransportation.com/",
      },
      {
        name: "Business Profiles",
        link: "https://www.vetbiz.va.gov/advancedsearch/searchresults/businessdetails/?acctid=528fa24c-223b-eb11-a813-001dd801ad19",
      },
      {
        name: "Veteran Business Profile",
        link: "https://web.sba.gov/pro-net/search/dsp_profile.cfm?RequestTimeout=60&DUNS=117773698",
      },
      {
        name: "Sunbiz Profile",
        link: "http://search.sunbiz.org/Inquiry/corporationsearch/SearchResultDetail?inquirytype=EntityName&directionType=PreviousList&searchNameOrder=FIVEGSERVICES%20L200003490930&aggregateId=flal-l20000349093-ba1012e9-bb70-45ef-9483-99b47c00814f&searchTerm=THE%20FIVE%20FOUNDATION%2C%20INC.&listNameOrder=FIVEGRIVERVIEW%20L050001062573",
      },
      {
        name: "Employee Background Checks",
        link: "https://dashboard.checkr.com/candidates?page=1&per_page=25&order_by=created_at&sort=desc",
      },
    ],
  };

  const handleRowClick = (link) => {
    window.open(link, "_blank");
  };

  data.rows = data.rows.map((row) => {
    return {
      ...row,
      action: (
        <MDBBtn   onClick={() => handleRowClick(row.link)}
        outline
        color='dark'
        size='lg'
        floating
        className='message-btn ms-2'>
         <MDBIcon fas icon="link" />

        </MDBBtn>
      ),
    };
  });

  return <MDBDatatable striped bordered hover data={data} />;
};

export default Links;
