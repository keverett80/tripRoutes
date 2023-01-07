import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import AWS from 'aws-sdk';
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: 'AKIAXB7XE7DLOOBYLI5R',
  secretAccessKey: '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',
});

const REACT_APP_AWS_LAMBDA_INVOKE_ENDPOINT =
  'https://ct4utd523c.execute-api.us-east-2.amazonaws.com/default/createCustomer';

function Invoice() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      given_name: firstName,
      family_name: lastName,
      email_address: email,
      phone_number: phone,
      address: {
        address_line_1: address,
      },
    };
console.log(JSON.stringify(payload))
    fetch(REACT_APP_AWS_LAMBDA_INVOKE_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
   // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
  <Label for="address">Address</Label>
  <Input
    type="text"
    id="address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  />
</FormGroup>
<Button type="submit" color="primary">
  Submit
</Button>
{error && <p>{error}</p>}

   </Form>
  )
}
export default Invoice;

