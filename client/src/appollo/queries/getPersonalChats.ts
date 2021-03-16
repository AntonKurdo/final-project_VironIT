import { gql } from '@apollo/client';

export const GET_PERSONAL_CHATS_QUERY= gql`
  query ($userId: ID) {
    chats {
      getAllPersonalChatsByUserId(userId: $userId) {
        _id
        chat_id
        firstName
        lastName
        avatar
      }
    }
  }
`;