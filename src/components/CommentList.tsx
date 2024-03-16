import React from 'react';
import { IComment} from '../models';

interface commentListProps {
    comments: IComment[]; // nitamoyasの型を指定

  }

const CommentList: React.FC<commentListProps> = ({comments}) => {
  return (
    <div>
        <ul>
            {comments.slice().reverse().map(comment =>(//新しい投稿を上に表示させるために逆順
                <div key = {comment.id}>
                  <p>{comment.username}</p>
                    <p>{comment.content}</p>
                    {comment.tag && comment.tag.map(tag => (
                        <span key={tag.tagid}>{tag.tagtext}</span>
                    ))}
                    <p>{comment.createdAt.toLocaleString()}</p>
                </div>
            ))}
        </ul>
    </div>
  )
}

export default CommentList