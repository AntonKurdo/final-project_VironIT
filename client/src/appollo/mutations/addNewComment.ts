import { gql } from '@apollo/client';

export const ADD_NEW_COMMENT_MUTATION = gql`
  mutation ($postId: ID, $userId: ID, $userName: String, $userAva: String, $text: String) {
    comments {
      addNewComment(postId: $postId, userId: $userId, userName: $userName, userAva: $userAva, text: $text)
    }
  }
`;