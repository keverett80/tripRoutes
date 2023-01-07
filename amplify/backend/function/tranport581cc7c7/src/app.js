const AWS = require('aws-sdk');
const squareConnect = require('square-connect');

exports.handler = async (event) => {
  // Load the Square API credentials from environment variables
  const clientId = process.env.SQUARE_CLIENT_ID;
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;

  // Set up the Square API client
  const defaultClient = squareConnect.ApiClient.instance;
  defaultClient.basePath = 'https://connect.squareupsandbox.com';
  defaultClient.authentications['oauth2'].accessToken = accessToken;

  const invoicesApi = new squareConnect.InvoicesApi();

  // Extract the customer and line item information from the event data
  const customerId = event.customer_id;
  const lineItems = event.line_items;

  // Create the invoice using the Square API
  try {
    const response = await invoicesApi.createInvoice({
      body: {
        customer_id: customerId,
        line_items: lineItems,
      },
    });
    const invoiceId = response.invoice.id;
    return {
      statusCode: 200,
      body: JSON.stringify({ invoice_id: invoiceId }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
