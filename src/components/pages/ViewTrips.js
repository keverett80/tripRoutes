import React from 'react';
import { MDBDataTable,  MDBTableEditable } from 'mdbreact';

const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Pickup Address',
        field: 'address',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Destination Address',
        field: 'address2',
        sort: 'asc',
        width: 270
      },

      {
        label: 'Appointment Time',
        field: 'apptTime',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Phone Number',
        field: 'phone',
        sort: 'asc',
        width: 100
      },


    ],
    rows: [
      {
        name: 'Kentwan Everett',
        address: '2900 Plum Orchard Dr',
        address2: '2974 Shelby Dr',
        phone: '954-934-5447',
        apptTime: '10:00'

      },
      {
        name: 'Kentwan Everett',
        address: '2900 Plum Orchard Dr',
        address2: '2974 Shelby Dr',
        phone: '954-934-5447',
        apptTime: '10:05'
      },

    ]
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
}

export default DatatablePage;