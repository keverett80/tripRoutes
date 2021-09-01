import React, { useState } from 'react';
import { MDBDatatable, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

export default function TableAction() {

  const [actionData, setActionData] = useState({
    columns: [
      { label: 'Name', field: 'name' },
      { label: 'Position', field: 'position' },
      { label: 'Office', field: 'office' },
      { label: 'Contact', field: 'contact', sort: false },
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        phone: '+48000000000',
        email: 'tiger.nixon@gmail.com',
      },
      {
        name: 'Sonya Frost',
        position: 'Software Engineer',
        office: 'Edinburgh',
        phone: '+53456123456',
        email: 'sfrost@gmail.com',
      },
      {
        name: 'Tatyana Fitzpatrick',
        position: 'Regional Director',
        office: 'London',
        phone: '+42123432456',
        email: 'tfitz@gmail.com',
      },
    ].map((row) => {
      return {
        ...row,
        contact: (
          <>
            <MDBBtn outline size='sm' floating className='call-btn' onClick={() => //console.log(`call ${row.phone}`)}>
              <MDBIcon icon='phone' />
            </MDBBtn>
            <MDBBtn
              size='sm'
              floating
              className='message-btn ms-2'
              onClick={() => //console.log(`send a message to ${row.email}`)}
            >
              <MDBIcon icon='envelope' />
            </MDBBtn>
          </>
        ),
      };
    }),
  });

  return (
    <MDBDatatable hover data={actionData} advancedData />
  );
}