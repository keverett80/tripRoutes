import { useState, useEffect } from 'react';

import {squareConnect, ApiClient, InvoicesApi } from 'square-connect';



const invoicesApi = new InvoicesApi();

const useCreateAndSendInvoice = () => {
  const [invoiceId, setInvoiceId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createAndSendInvoice = async () => {
      try {
        // Set the access token

        const defaultClient = ApiClient.instance;
        defaultClient.defaultHeaders['User-Agent'] = '';
        defaultClient.basePath = 'https://connect.squareup.com';
        const oauth2 = defaultClient.authentications['oauth2'];
        oauth2.accessToken = 'EAAAEOFxr3s6BrRecWpxAF4F4DbL-Hyw3KtAAe0Ra6BBl6bPU88amfLX18-4m4oS';

        // Set the invoice details
        const invoice = {
          billing_info: [
            {
              email_address: 'kentwan@fivegtransportation.com',
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

        // Create the invoice
        const request = {
          body: invoice,
        };

        const response = invoicesApi.createInvoice(request);
        //setInvoiceId(response.invoice.id);
        console.log(response)
        // Send the invoice
        //await InvoicesApi.sendInvoice(response.invoice.id);
      } catch (error) {
        setError(error);
      }
    };

    createAndSendInvoice();
  }, []);

  return { invoiceId, error };
};

export default useCreateAndSendInvoice;
