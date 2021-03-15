import { gql } from '@apollo/client';

export const ADD_NEW_POST_MUTATION = gql`
  mutation($title: String, $text: String, $picture: String, $video: String, $owner: ID) {
    posts {
      addNewPost(title: $title, text: $text, picture: $picture, video: $video, owner: $owner)
    }
  }
`;