import React, { useState } from 'react';

function Invoice() {
  const [invoiceId, setInvoiceId] = useState(null);

  const handleClick = () => {
    const invoice = {
      billing_info: [
        {
          email_address: 'customer@example.com',
        },
      ],
      due_date: '2022-01-01',
      line_items: [
        {
          name: 'Item 1',
          quantity: '1',
          base_price_money: {
            amount: 100, // $1.00
            currency: 'USD',
          },
        },
      ],
    };

    fetch('https://metmei56l0.execute-api.us-east-2.amazonaws.com/dev/invoice/create-invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    })
      .then((response) => response.text())
      .then((id) => {
        setInvoiceId(id);
      });
  };

  return (
    <button onClick={handleClick}>
      Create Invoice
    </button>
  );
}

export default Invoice;
