import { gql } from '@apollo/client';

export const CHANGE_AVATAR_MUTATION = gql`
  mutation($userId: ID, $newAva: String) {
    changeAvatar(userId: $userId, newAva: $newAva)
  }
`;