export{}
const graphql = require('graphql');
const RootMutation = require('./mutations');
const RootQuery = require('./queries');
const { GraphQLSchema} = graphql;

module.exports = new GraphQLSchema({
  query: RootQuery,  
  mutation: RootMutation  
});