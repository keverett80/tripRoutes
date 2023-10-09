import React, { useState } from 'react';

const ContactInfoForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // Add more state variables for other contact information fields

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the contact information object
    const contactInfo = {
      firstName,
      lastName,
      email,
      // Add more fields as needed
    };

    // Call the onSubmit prop and pass the contact information
    onSubmit(contactInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Add more form fields for other contact information */}


    </form>
  );
};

export default ContactInfoForm;
