export {};
const User = require('../models/user.model');

class FriendsService {
  
  getAllUsers = async () => {
    try {
      const users = await User.find({});      
      return users.map((user: any) => {
        return {
          id: user._id,
          firstName: user.first_name,
          lastName: user.last_name,
          avatar: user.avatar          
        }
      })  
    } catch(e) {      
      console.log(e)
    }
  }
  getAllFriendsByUserId = async (id: string) => {
    try {
      const user = await User.findOne({_id: id});    
      if(user.friends.length !== 0) {
        const friends = await User.find({_id: [
          ...user.friends
        ]})  
        return friends.map((friend: any) => {
          return  {
            id: friend._id,
            firstName: friend.first_name,
            lastName: friend.last_name,
            avatar: friend.avatar            
          }
        })
      } 
      return [];
    } catch(e) {      
      console.log(e)
    }
  }

  addFriend = async ({userId, newFriendId}: {userId: string, newFriendId: string}) => {
    try {
      const user = await User.findOne({_id: userId}); 
      const alreadyFriend = user.friends.indexOf(newFriendId);   
      if(alreadyFriend === -1) {
        await User.updateOne({_id: userId}, {friends: [...user.friends, newFriendId]});       
        return {message: 'New friend was added...'}
      } else {            
        return {message: 'You are already friends...'}
      }     
    } catch(e) {
      console.log(e)
    }
  }

  removeFriend = async ({userId, friendId}: {userId: string, friendId: string}) => {
    try {
      const user = await User.findById(userId);
      const removingFriend = await User.findById(friendId);
      await User.updateOne({_id: userId}, {friends: user.friends.filter((friend: string) => friend != friendId)})
      return {
        status: 'ok',
        message: `${removingFriend.first_name} ${removingFriend.last_name} has been removed from Your friends...`
      }
    } catch(e) {
      console.log(e)
    }
  }
 
};

module.exports = FriendsService;