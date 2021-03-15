import { gql } from '@apollo/client';

export const All_COMMENTS_BY_POST_ID_QUERY = gql`
  query ($postId: ID) {
      comments {
        getCommentsByPostId(postId: $postId) {
            _id
            postId
            userId
            userName
            userAva
            date
            text
        }
      } 
  }
`;