/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
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
export const createEmployees = /* GraphQL */ `
  mutation CreateEmployees(
    $input: CreateEmployeesInput!
    $condition: ModelEmployeesConditionInput
  ) {
    createEmployees(input: $input, condition: $condition) {
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
export const updateEmployees = /* GraphQL */ `
  mutation UpdateEmployees(
    $input: UpdateEmployeesInput!
    $condition: ModelEmployeesConditionInput
  ) {
    updateEmployees(input: $input, condition: $condition) {
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
export const deleteEmployees = /* GraphQL */ `
  mutation DeleteEmployees(
    $input: DeleteEmployeesInput!
    $condition: ModelEmployeesConditionInput
  ) {
    deleteEmployees(input: $input, condition: $condition) {
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
export const createVehicles = /* GraphQL */ `
  mutation CreateVehicles(
    $input: CreateVehiclesInput!
    $condition: ModelVehiclesConditionInput
  ) {
    createVehicles(input: $input, condition: $condition) {
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
export const updateVehicles = /* GraphQL */ `
  mutation UpdateVehicles(
    $input: UpdateVehiclesInput!
    $condition: ModelVehiclesConditionInput
  ) {
    updateVehicles(input: $input, condition: $condition) {
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
export const deleteVehicles = /* GraphQL */ `
  mutation DeleteVehicles(
    $input: DeleteVehiclesInput!
    $condition: ModelVehiclesConditionInput
  ) {
    deleteVehicles(input: $input, condition: $condition) {
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
