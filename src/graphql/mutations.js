/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      fname
      lname
      address
      phoneNumber
      emailAddress
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      fname
      lname
      address
      phoneNumber
      emailAddress
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
      id
      fname
      lname
      address
      phoneNumber
      emailAddress
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
      token
      location
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
      token
      location
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
      token
      location
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createVehicle = /* GraphQL */ `
  mutation CreateVehicle(
    $input: CreateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    createVehicle(input: $input, condition: $condition) {
      id
      make
      model
      color
      tagNumber
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateVehicle = /* GraphQL */ `
  mutation UpdateVehicle(
    $input: UpdateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    updateVehicle(input: $input, condition: $condition) {
      id
      make
      model
      color
      tagNumber
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteVehicle = /* GraphQL */ `
  mutation DeleteVehicle(
    $input: DeleteVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    deleteVehicle(input: $input, condition: $condition) {
      id
      make
      model
      color
      tagNumber
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTrip = /* GraphQL */ `
  mutation CreateTrip(
    $input: CreateTripInput!
    $condition: ModelTripConditionInput
  ) {
    createTrip(input: $input, condition: $condition) {
      id
      fname
      lname
      address
      address2
      phoneNumber
      wheelchair
      roundtrip
      appointmentTime
      appointmentDate
      status
      cost
      driver
      broker
      notes
      distance
      trip
      afterHours
      pickupTime
      pickupStatus
      pickupStatusTime
      arrivedTime
      invoiceNumber
      employeePay
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTrip = /* GraphQL */ `
  mutation UpdateTrip(
    $input: UpdateTripInput!
    $condition: ModelTripConditionInput
  ) {
    updateTrip(input: $input, condition: $condition) {
      id
      fname
      lname
      address
      address2
      phoneNumber
      wheelchair
      roundtrip
      appointmentTime
      appointmentDate
      status
      cost
      driver
      broker
      notes
      distance
      trip
      afterHours
      pickupTime
      pickupStatus
      pickupStatusTime
      arrivedTime
      invoiceNumber
      employeePay
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTrip = /* GraphQL */ `
  mutation DeleteTrip(
    $input: DeleteTripInput!
    $condition: ModelTripConditionInput
  ) {
    deleteTrip(input: $input, condition: $condition) {
      id
      fname
      lname
      address
      address2
      phoneNumber
      wheelchair
      roundtrip
      appointmentTime
      appointmentDate
      status
      cost
      driver
      broker
      notes
      distance
      trip
      afterHours
      pickupTime
      pickupStatus
      pickupStatusTime
      arrivedTime
      invoiceNumber
      employeePay
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBroker = /* GraphQL */ `
  mutation CreateBroker(
    $input: CreateBrokerInput!
    $condition: ModelBrokerConditionInput
  ) {
    createBroker(input: $input, condition: $condition) {
      id
      name
      phone
      email
      wcRate
      ambRate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBroker = /* GraphQL */ `
  mutation UpdateBroker(
    $input: UpdateBrokerInput!
    $condition: ModelBrokerConditionInput
  ) {
    updateBroker(input: $input, condition: $condition) {
      id
      name
      phone
      email
      wcRate
      ambRate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBroker = /* GraphQL */ `
  mutation DeleteBroker(
    $input: DeleteBrokerInput!
    $condition: ModelBrokerConditionInput
  ) {
    deleteBroker(input: $input, condition: $condition) {
      id
      name
      phone
      email
      wcRate
      ambRate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createVehicleCheck = /* GraphQL */ `
  mutation CreateVehicleCheck(
    $input: CreateVehicleCheckInput!
    $condition: ModelVehicleCheckConditionInput
  ) {
    createVehicleCheck(input: $input, condition: $condition) {
      id
      myVehicle
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateVehicleCheck = /* GraphQL */ `
  mutation UpdateVehicleCheck(
    $input: UpdateVehicleCheckInput!
    $condition: ModelVehicleCheckConditionInput
  ) {
    updateVehicleCheck(input: $input, condition: $condition) {
      id
      myVehicle
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteVehicleCheck = /* GraphQL */ `
  mutation DeleteVehicleCheck(
    $input: DeleteVehicleCheckInput!
    $condition: ModelVehicleCheckConditionInput
  ) {
    deleteVehicleCheck(input: $input, condition: $condition) {
      id
      myVehicle
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createInvoice = /* GraphQL */ `
  mutation CreateInvoice(
    $input: CreateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    createInvoice(input: $input, condition: $condition) {
      id
      poNumber
      name
      broker
      date
      product
      cost
      distance
      address
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateInvoice = /* GraphQL */ `
  mutation UpdateInvoice(
    $input: UpdateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    updateInvoice(input: $input, condition: $condition) {
      id
      poNumber
      name
      broker
      date
      product
      cost
      distance
      address
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteInvoice = /* GraphQL */ `
  mutation DeleteInvoice(
    $input: DeleteInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    deleteInvoice(input: $input, condition: $condition) {
      id
      poNumber
      name
      broker
      date
      product
      cost
      distance
      address
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
