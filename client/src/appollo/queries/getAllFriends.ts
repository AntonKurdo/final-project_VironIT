import { gql } from '@apollo/client';

export const GET_ALL_FRIENDS_QUERY = gql`
  query ($userId: ID) {
    friends {
      getAllFriendsByUserId(userId: $userId) {
        _id
        first_name
        last_name
        avatar
      }
    }
  }
`;