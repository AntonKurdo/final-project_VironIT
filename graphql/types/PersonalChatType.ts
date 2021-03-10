export {}
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const PersonalChatType = new GraphQLObjectType({
  name: 'PersonalChat',
  fields: () => ({
    _id: {type: GraphQLID},      
    chat_id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    avatar: {type: GraphQLString}
  })
});

module.exports = PersonalChatType;