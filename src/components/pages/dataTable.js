import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export default function Basic() {


  function myRows(){


    console.log(rows)
  }
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 100,

      },



      {
        label: 'Broker Name',
        field: 'name',
        sort: 'asc',
        width: 100,

      },

      {
        label: 'Email Address',
        field: 'email',
        width: 100,
      },
      {
        label: 'Phone Number',
        field: 'phone',

        width: 100,
      },
      {
        label: 'Ambulatory Rates',
        field: 'ambRate',

        width: 100,
      },
      {
        label: 'Wheelchair Rates',
        field: 'wcRate',

        width: 100,
      },
      {
        label: 'Button ',
        field: 'myButton',

        width: 100,
      },

    ],
    rows: [

    ],
  });

  return <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />;
}