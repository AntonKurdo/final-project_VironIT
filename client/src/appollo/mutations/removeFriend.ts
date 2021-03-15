import { gql } from '@apollo/client';

export const REMOVE_FRIEND_MUTATION = gql`
 mutation ($userId: ID, $friendId: ID) {
	friends {
    removeFriend(userId: $userId, friendId: $friendId)
  }
}
`;