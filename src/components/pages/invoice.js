import React from 'react';
import axios from 'axios';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from 'mdb-react-ui-kit';
import { Container } from 'react-bootstrap';


  class Invoice extends React.Component {
    constructor(props) {
      super(props)
  this.state = {
    invoices: [],
    search: '',
    filteredInvoices: [],
    sortedInvoices: [],
    isSorted: false,
    isFiltered: false,
    sortBy: 'Date',
  };
    }
  fetchInvoices = async () => {
    try {
      const result = await axios.get('https://pb9bo5u0cf.execute-api.us-east-2.amazonaws.com/default/viewInvoice');
      console.log(result.data.invoices)
      this.setState({ invoices: result.data.invoices });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.fetchInvoices();
  }

  sortInvoices = (invoice1, invoice2) => {
    if (invoice1.status !== invoice2.status) {
      return invoice1.status < invoice2.status ? -1 : 1;
    } else {
      return new Date(invoice1.payment_requests[0].due_date) - new Date(invoice2.payment_requests[0].due_date);
    }
  };

  handleSearch = (e) => {
    this.setState({search: e.target.value});
    this.setState({filteredInvoices: this.state.invoices.filter(invoice => (invoice.primary_recipient && invoice.primary_recipient.given_name && invoice.primary_recipient.given_name.toLowerCase().includes(e.target.value.toLowerCase()))
    || (invoice.primary_recipient && invoice.primary_recipient.family_name && invoice.primary_recipient.family_name.toLowerCase().includes(e.target.value.toLowerCase()))
    || (invoice.status && invoice.status.toLowerCase().includes(e.target.value.toLowerCase())))});
    this.setState({isFiltered: true});
    this.setState({isSorted: false});
  }

  componentDidMount() {
    axios.get('https://pb9bo5u0cf.execute-api.us-east-2.amazonaws.com/default/viewInvoice')
      .then(result => this.setState({ invoices: result.data.invoices }) )
      .catch(error => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortBy !== this.state.sortBy) {
      this.setState({sortedInvoices: [...(this.state.isFiltered ? this.state.filteredInvoices : this.state.invoices)].sort(this.sortInvoices)});
      this.setState({isSorted: true});
    }
  }


  render() {
    return (
      <Container>
        <MDBInput placeholder="Search"  onChange={this.handleSearch} value={this.state.search} />
        <MDBTable align='middle' striped>
          <MDBTableHead>
            <tr>

              <th scope='col'>Name</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Status</th>
              <th scope='col'>Date</th>
              <th scope='col'>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
          {(this.state.isSorted ? this.state.sortedInvoices : (this.state.isFiltered ? this.state.filteredInvoices : this.state.invoices)).map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.primary_recipient.given_name} {invoice.primary_recipient.family_name}</td>
              <td>${(invoice.payment_requests[0].computed_amount_money.amount/100).toFixed(2)}</td>
              <td>
                <MDBBadge
                  color={
                    invoice.status === 'PAID'
                      ? 'success'
                      : invoice.status === 'CANCELED'
                      ? 'danger'
                      : invoice.status === 'UNPAID'
                      ? 'warning'
                      : 'primary'
                  }
                >
                  {invoice.status}
                </MDBBadge>
              </td>
              <td>{new Date(invoice.payment_requests[0].due_date).toDateString()}</td>
              <td>

                <MDBBtn color='link' rounded size='sm' onClick={() => window.open('http://square.com/','_blank')}>
                <i className='fas fa-edit'></i> Update
            </MDBBtn>

              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </Container>
  );
}
  }

export default Invoice;
