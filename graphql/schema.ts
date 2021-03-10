export{}
const graphql = require('graphql');
const Mutation = require('./mutations');
const Query = require('./queries');
const { GraphQLSchema} = graphql;

module.exports = new GraphQLSchema({
  query: Query, 
  mutation: Mutation  
});