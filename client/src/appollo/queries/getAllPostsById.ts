import { gql } from '@apollo/client';

export const GET_All_POSTS_BY_ID_QUERY= gql`
  query ($userId: ID) {
    posts {
      getUserPostsById(userId: $userId) {
        _id
        date
        likes
        title
        text
        picture
        video
        owner
      }
    }
  }
`;