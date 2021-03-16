import { gql } from '@apollo/client';

export const GET_ALL_ARCHIVED_CHATS_QUERY = gql`
 query ($userId: ID) {
    chats {
      getArchivedChatsById(userId: $userId) {
        _id
        chat_id
        firstName
        lastName
        avatar
      }
    }
  }
`;