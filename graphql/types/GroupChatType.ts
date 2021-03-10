export {}
const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const GroupChatType = new GraphQLObjectType({
  name: 'GroupChat',
  fields: () => ({
    _id: {type: GraphQLID},      
    usersId: {type: GraphQLList(GraphQLID)},
    usersLastNames: {type: GraphQLList(GraphQLString)},
    date: {type: GraphQLDate}
  })
});

module.exports = GroupChatType;