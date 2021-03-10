export{}
const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql;

// MODELS
const User = require('../../models/user.model');

// TYPES
const UserType = require('./UserType');

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    _id: {type: GraphQLID},
    title: {type: GraphQLString},
    text: {type: GraphQLString},
    picture: {type: GraphQLString},
    video: {type: GraphQLString},
    date: {type: GraphQLDate}, 
    likes: {type: GraphQLList(GraphQLString)},
    owner: {type: GraphQLID},
    ownerInfo: {
      type: UserType,      
      resolve(parent: any, args: any) {
        return User.findById(parent.owner)
      }
    }
  })
});

module.exports = PostType;