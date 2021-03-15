import { gql } from '@apollo/client';

export const GET_ALL_USERS_QUERY = gql`
  query{
    friends {
      getAllUsers {
        _id
        first_name
        last_name
        avatar
        email      
      } 
    }
  }
`;