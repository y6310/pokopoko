import React from 'react';
import { Posts } from '../models';

interface commentListProps {
    comments: Posts[]; // nitamoyasの型を指定

  }

const CommentList: React.FC<commentListProps> = ({comments}) => {
  return (
    <div>
        <ul>
            {comments.slice().reverse().map(comment =>(//新しい投稿を上に表示させるために逆順
                <div key = {comment.post_id}>
                  <p>{comment.user_name}</p>
                    <p>{comment.post_body}</p>
                    {comment.tag && comment.tag.map(tag => (
                        <span key={tag.tag_id}>{tag.tag_body}</span>
                    ))}
                    <p>{comment.created_at.toLocaleString()}</p>
                </div>
            ))}
        </ul>
    </div>
  )
}

export default CommentList