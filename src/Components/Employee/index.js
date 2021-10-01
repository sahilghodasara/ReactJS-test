import { gql } from 'apollo-boost';

export const EMPLOYEE_QUERY = gql`
  query {
    employeesList {
      items {
        id
        createdAt
        name
        email
        mobile
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`   
  mutation EmployeeCreate($name: String!, $email: String!, $mobile: String!) {
    employeeCreate(
        data:{
            name: $name
            email: $email
            mobile: $mobile
        }
    ){
        id
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation EmployeeUpdate($id: ID!, $name: String!, $email: String!, $mobile: String!) {
    employeeUpdate(
      data: {
        id: $id
        name: $name
        email: $email
        mobile: $mobile
      }
    ) {
      id
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation EmployeeDelete($id: ID!){
    employeeDelete(
      data:{
        id: $id
      }
    ){
      success
    }
  }
`;