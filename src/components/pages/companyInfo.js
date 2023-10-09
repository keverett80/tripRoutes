import React, { useState, useEffect, useRef } from 'react';
import {
  MDBStepper,
  MDBStepperStep,
  MDBStepperForm,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBValidationItem,
  MDBTextArea
} from 'mdb-react-ui-kit';

export default function App() {
  const wizardNextRef = useRef(null);
  const wizardPrevRef = useRef(null);




  return (
    <>
<MDBStepper externalNext={wizardNextRef} externalPrev={wizardPrevRef} linear>
        <MDBStepperForm>
          <MDBStepperStep headIcon={1} headText='step 1' itemId={1}>
            <MDBValidationItem invalid feedback='invalid'>
              <MDBInput
                wrapperClass='mb-4'
                label={
                  <>
                    First name <small className='text-muted'>(required)</small>
                  </>
                }
                required
              />
            </MDBValidationItem>
            <MDBValidationItem invalid feedback='invalid'>
              <MDBInput
                wrapperClass='mb-4'
                label={
                  <>
                    Last name <small className='text-muted'>(required)</small>
                  </>
                }
                required
              />
            </MDBValidationItem>
            <MDBValidationItem invalid feedback='invalid'>
              <MDBInput
                wrapperClass='mb-4'
                label={
                  <>
                    Nickname <small className='text-muted'>(required)</small>
                  </>
                }
                required
              />
            </MDBValidationItem>
          </MDBStepperStep>

          <MDBStepperStep headIcon={2} headText='step 2' itemId={2}>
            <MDBValidationItem invalid feedback='invalid'>
              <MDBInput
                wrapperClass='mb-4'
                label={
                  <>
                    Company name <small className='text-muted'>(required)</small>
                  </>
                }
                required
              />
            </MDBValidationItem>
            <MDBValidationItem invalid feedback='invalid'>
              <MDBInput
                wrapperClass='mb-4'
                label={
                  <>
                    Address <small className='text-muted'>(required)</small>
                  </>
                }
                required
              />
            </MDBValidationItem>
            <MDBValidationItem invalid feedback='invalid'>
              <MDBInput
                wrapperClass='mb-4'
                type='email'
                label={
                  <>
                    Email <small className='text-muted'>(required)</small>
                  </>
                }
                required
              />
            </MDBValidationItem>
            <MDBValidationItem invalid feedback='invalid'>
              <MDBInput
                wrapperClass='mb-4'
                type='number'
                label={
                  <>
                    Phone <small className='text-muted'>(optional)</small>
                  </>
                }
              />
            </MDBValidationItem>
          </MDBStepperStep>

          <MDBStepperStep headIcon={3} headText='step 3' itemId={3}>
            <MDBValidationItem invalid feedback='invalid'>
              <MDBTextArea rows={4} wrapperClass='mb-4' label='Additional information' required />
            </MDBValidationItem>

            <MDBValidationItem feedback=''>
              <MDBCheckbox
                wrapperClass='d-flex justify-content-center mb-4'
                label='Create an account?'
                required
              />
            </MDBValidationItem>

            <MDBBtn type='submit' block color='success' className='mb-4'>
              Place order
            </MDBBtn>
          </MDBStepperStep>
        </MDBStepperForm>
        </MDBStepper>
      <MDBBtn className='w-20' ref={wizardPrevRef}>
        previous step
      </MDBBtn>
      <MDBBtn className='w-20' ref={wizardNextRef}>
        next step
      </MDBBtn>
    </>
  );
}