/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      name
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
        name
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
export const getEmployees = /* GraphQL */ `
  query GetEmployees($id: ID!) {
    getEmployees(id: $id) {
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
export const listEmployeess = /* GraphQL */ `
  query ListEmployeess(
    $filter: ModelEmployeesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployeess(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getVehicles = /* GraphQL */ `
  query GetVehicles($id: ID!) {
    getVehicles(id: $id) {
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
export const listVehicless = /* GraphQL */ `
  query ListVehicless(
    $filter: ModelVehiclesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicless(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
