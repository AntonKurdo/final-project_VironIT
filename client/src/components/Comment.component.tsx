import React, {FC} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { iComment } from './Post.component';

interface CommentProps {
  comment: iComment,
  date: Date
};

export const CommentComponent: FC<CommentProps> = ({comment, date}) => {
  return (
    <View style={styles.commentWrapper} key={comment._id}>
    <View style={styles.commentHeader}>
        <Image
            source={{
            uri: comment.userAva
        }}
            style={styles.ava}/>
        <Text style={styles.commentAuthorName}>{comment.userName}</Text>
        <Text style={styles.commentDate}>{new Date(date).toDateString()}</Text>
    </View>
    <View style={styles.commentText}>
        <Text
            style={{
            color: '#fff'
        }}>{comment.text}</Text>
    </View>
</View>
  )
};

const styles = StyleSheet.create({
  commentWrapper: {
    width: '95%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginBottom: 10
  },
  commentHeader: {
    height: 40,
    width: '100%',
    marginBottom: -5,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1
  },
  ava: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 12.5
  },
  commentAuthorName: {
    marginRight: 20,
    fontSize: 15,
    color: '#fff'
  },
  commentDate: {
      position: 'absolute',
      right: 10,
      color: '#fff'
  },
  commentText: {
    padding: 10
  }
});