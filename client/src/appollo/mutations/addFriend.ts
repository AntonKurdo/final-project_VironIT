import { gql } from '@apollo/client';

export const ADD_FRIEND_MUTATION = gql`
  mutation ($userId: ID, $newFriendId: ID) {
    friends {
      addFriend(userId: $userId, newFriendId: $newFriendId)
    }
  }
`;