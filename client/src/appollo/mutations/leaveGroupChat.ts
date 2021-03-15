import { gql } from '@apollo/client';

export const LEAVE_GROUP_CHAT_MUTATION = gql`
 mutation($chatId: String, $userId: ID, $userLastName: String) {
  chats {
    leaveGroupChat(chatId: $chatId, userId: $userId, userLastName: $userLastName)
  }
 } 
`;