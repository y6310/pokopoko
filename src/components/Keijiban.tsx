import React, { useState } from "react";
import { IComment } from "../models";

const initialComments: IComment[] = [{
    content: "デモ投稿",
    createdAt: new Date(),
    id: "commentid"
}]

const Keijiban = () => {
    const [comments, setComments] = useState<IComment[]>(initialComments);
    const [newComment, setNewComment] = useState<string>("");

    const handleAddComment = () => {
        if(newComment.trim() !== ""){//空欄ではないときにボタンが押された場合
            const id = Math.random().toString();//ランダムなIDを生成
            const createdAt = new Date();//現在時刻を取得
            const comment: IComment = {
                content: newComment,
                createdAt,
                id
            };
            setNewComment("");//フォームのクリア
            setComments([...comments, comment])//コメントを追加
        }
    };

    return(
        <div>
            <div>もやもや掲示板</div>
            <ul>
                {comments.map(comment =>(
                    <div key = {comment.id}>
                        <p>{comment.content} {comment.createdAt.toLocaleString()}</p>
                    </div>
                ))}
            </ul>
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
            <button onClick={handleAddComment}>投稿</button>
        </div>
    );
}

export default Keijiban;