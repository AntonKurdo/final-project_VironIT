export{}
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql;

// TYPES
const GroupChatType = require('./GroupChatType');

// MODELS
const GroupChat = require('../../models/groupChat.model');


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {type: GraphQLID},
    first_name: {type:  GraphQLString}, 
    last_name: {type: GraphQLString}, 
    avatar: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
    friends: {type: GraphQLList(GraphQLString)},
    personal_chats: {type: GraphQLList(GraphQLString)},
    groupChats: {type: GraphQLList(GraphQLString)},
    archived_chats: {type: GraphQLList(GraphQLString)}, 
    getGroupChats: {
      type: GraphQLList(GroupChatType),
      resolve(parent: any) {
        return GroupChat.find({_id: parent.groupChats})
      }
    }   
  })
});

module.exports = UserType;