import React, { useState } from 'react';

const CompanyInfoForm = ({ onSubmit }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  // Add more state variables for other company information fields

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the company information object
    const companyInfo = {
      companyName,
      companyAddress,
      // Add more fields as needed
    };

    // Call the onSubmit prop and pass the company information
    onSubmit(companyInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="companyName" className="form-label">Company Name</label>
        <input
          type="text"
          className="form-control"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="companyAddress" className="form-label">Company Address</label>
        <input
          type="text"
          className="form-control"
          id="companyAddress"
          value={companyAddress}
          onChange={(e) => setCompanyAddress(e.target.value)}
          required
        />
      </div>

      {/* Add more form fields for other company information */}


    </form>
  );
};

export default CompanyInfoForm;
