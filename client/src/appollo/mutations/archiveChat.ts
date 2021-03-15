import { gql } from '@apollo/client';

export const ARCHIVE_CHAT_MUTATION = gql`
  mutation($userId: ID, $chatId: String) {
    chats {
      archiveChat(userId: $userId, chatId: $chatId) 
    }
  }
`;