import { gql } from '@apollo/client';

export const UNARCHIVE_CHAT_MUTATION = gql`
  mutation($userId: ID, $chatId: String) {
    chats {
      unarchiveChat(userId: $userId, chatId: $chatId) 
    }
  }
`;