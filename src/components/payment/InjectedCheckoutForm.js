import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, useStripe, useElements} from '@stripe/react-stripe-js';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

// replace this with your stripe public key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      // get priceId from your state, hard-coded here for example
      const priceId = 'priceId';
      const email = 'customer@example.com'; // replace with customer's email
      const response = await fetch('https://lambda-url.amazonaws.com/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          paymentMethodId: paymentMethod.id,
          priceId
        })
      });

      const subscriptionResponse = await response.json();

      console.log('[PaymentMethod]', subscriptionResponse);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody>
              <CardElement options={{ hidePostalCode: true }} />
            </MDBCardBody>
          </MDBCard>
          <div className="text-end mt-3">
            <MDBBtn>Subscribe</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </form>
  );
};

const InjectedCheckoutForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default InjectedCheckoutForm;
