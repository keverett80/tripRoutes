/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      fname
      lname
      address
      phoneNumber
      emailAddress
      createdAt
      updatedAt
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fname
        lname
        address
        phoneNumber
        emailAddress
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
      createdAt
      updatedAt
    }
  }
`;
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        phoneNumber
        emailAddress
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVehicle = /* GraphQL */ `
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
      id
      make
      model
      color
      tagNumber
      createdAt
      updatedAt
    }
  }
`;
export const listVehicles = /* GraphQL */ `
  query ListVehicles(
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        make
        model
        color
        tagNumber
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTrip = /* GraphQL */ `
  query GetTrip($id: ID!) {
    getTrip(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;
export const listTrips = /* GraphQL */ `
  query ListTrips(
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBroker = /* GraphQL */ `
  query GetBroker($id: ID!) {
    getBroker(id: $id) {
      id
      name
      phone
      email
      wcRate
      ambRate
      createdAt
      updatedAt
    }
  }
`;
export const listBrokers = /* GraphQL */ `
  query ListBrokers(
    $filter: ModelBrokerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBrokers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
        email
        wcRate
        ambRate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
