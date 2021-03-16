import { gql } from '@apollo/client';

export const GET_GROUP_CHATS_QUERY= gql`
  query ($userId: ID) {
    chats {
      getGroupChatsById(userId: $userId) {
        _id
        usersLastNames
      }
    }
  }
`;