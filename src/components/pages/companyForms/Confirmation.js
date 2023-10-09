import React from 'react';

const Confirmation = ({ companyInfo, contactInfo }) => {
  return (
    <div>
      <h2>Confirmation</h2>
      <h3>Company Information</h3>
      <p>Company Name: {companyInfo?.companyName}</p>
<p>Company Address: {companyInfo?.companyAddress}</p>
      {/* Add more fields for other company information */}

      <h3>Contact Information</h3>
      <p>First Name: {contactInfo?.firstName}</p>
<p>Last Name: {contactInfo?.lastName}</p>
<p>Email: {contactInfo?.email}</p>
      {/* Add more fields for other contact information */}
    </div>
  );
};

export default Confirmation;
