import React from 'react';
import useCreateAndSendInvoice from './squareInvoice';

const Invoice = () => {
  const { invoiceId, error } = useCreateAndSendInvoice();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return invoiceId ? <p>Invoice sent! Invoice ID: {invoiceId}</p> : <p>Loading...</p>;
};

export default Invoice;
