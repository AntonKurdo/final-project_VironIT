import { gql } from '@apollo/client';

export const LIKE_POST_MUTATION = gql`
 mutation ($postId: ID, $userId: ID) {
  posts {
    likePostById(postId: $postId, userId: $userId)
  }
}
`;