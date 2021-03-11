export {};
const graphql = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');
const { GraphQLObjectType,  GraphQLID } = graphql;

// MODELS
const User = require('../../models/user.model');

const FriendsMutation = new GraphQLObjectType({
  name: 'FriendsMutation',
  fields: () => ({
    addFriend: {
      type: GraphQLJSON,
      args: {
        newFriendId: {type: GraphQLID},
        userId: {type: GraphQLID}        
      },
      async resolve(parent: any, args: any) {              
        try {
          const {userId, newFriendId} = args;
          const user = await User.findOne({_id: userId}); 
          const alreadyFriend = user.friends.indexOf(newFriendId);   
          if(alreadyFriend === -1) {
            await User.updateOne({_id: userId}, {friends: [...user.friends, newFriendId]});   
            return {
              status: 'ok',
              message: 'New friend was added...'
            }        
          } else {    
            return {
              status: 'error',
              message: 'You are already friends...'
            };            
          }     
        } catch(e) {
          console.log(e)
        }
      }
    },
    removeFriend: {
      type: GraphQLJSON,
      args: {
        friendId: {type: GraphQLID},
        userId: {type: GraphQLID}        
      },
      async resolve(parent: any, args: any) {              
        try {
          const {friendId, userId} = args;
          const user = await User.findById(userId);
          const removingFriend = await User.findById(friendId);
          await User.updateOne({_id: userId}, {friends: user.friends.filter((friend: string) => friend != friendId)})
          return {
            status: 'ok',
            message: `${removingFriend.first_name} ${removingFriend.last_name} has been removed from Your friends...`
          };
        } catch(e) {
          console.log(e)
        }
      }
    },
  })
});

module.exports = FriendsMutation;