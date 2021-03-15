import { gql } from '@apollo/client';

export const ADD_PERSONAL_CHAT_MUTATION = gql`
 mutation ($userId: ID, $secondUserId: ID) {
  chats {
    addNewPersonalChatToUser(userId: $userId, secondUserId: $secondUserId)
  }
 }
`;