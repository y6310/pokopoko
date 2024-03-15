import React, { useState } from "react";
import { IComment, ITag } from "../models";


const initialComments: IComment[] = [{
    content: "デモ投稿",
    createdAt: new Date(),
    id: "commentid",
    tag:[{ tagtext: "#ジェンダー", tagid: "tagid1" }]
}]

const Keijiban = () => {
    const [comments, setComments] = useState<IComment[]>(initialComments);
    const [newComment, setNewComment] = useState<string>("");
    const [choiceTag, setChoiceTag] = useState<ITag[]>([]);


    const createTagObject = (tagtext:string):ITag => {
        return {
          tagtext,
          tagid: Math.random().toString(), // ランダムなIDを生成して識別子として使用
        };
      };

    const handleTagButtonClick = (buttonText: string) => {
        const newTag = createTagObject(buttonText);
        setChoiceTag([...choiceTag, newTag]);
    };

    const handleDeleteTag = (tagid: string) =>{
        const updatedTags = choiceTag.filter(tag => tag.tagid !== tagid);
        setChoiceTag(updatedTags);
    };

    const handleAddComment = () => {
        if(newComment.trim() !== ""){//空欄ではないときにボタンが押された場合
            const id = Math.random().toString();//ランダムなIDを生成
            const createdAt = new Date();//現在時刻を取得
            const comment: IComment = {
                content: newComment,
                createdAt,
                id,
                tag: choiceTag.map(tag => ({ tagtext: tag.tagtext, tagid: tag.tagid }))
            };
    
            setNewComment("");//フォームのクリア
            setChoiceTag([]);//タグのクリア
            setComments([...comments, comment])//コメントを追加
        }
    };

    return(
        <div>
            <div>もやもや掲示板</div>
            
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
            {choiceTag.map(tag => (
                <div key={tag.tagid}>
                    <span>{tag.tagtext}</span>
                    <button onClick={() => handleDeleteTag(tag.tagid)}>x</button>
                </div>
                ))}
            
            <br></br>
            <button onClick={() => handleTagButtonClick("#ジェンダー")}>#ジェンダー</button>
            <button onClick={() => handleTagButtonClick("#健康")}>#健康</button>
            <button onClick={() => handleTagButtonClick("#親")}>#親</button>
            <button onClick={() => handleTagButtonClick("#兄弟")}>#兄弟</button>
            
            <br></br>
            <button onClick={handleAddComment}>投稿</button>

            <ul>
                {comments.slice().reverse().map(comment =>(//新しい投稿を上に表示させるために逆順
                    <div key = {comment.id}>
                        <p>{comment.content}</p>
                        {comment.tag && comment.tag.map(tag => (
                            <span key={tag.tagid}>{tag.tagtext}</span>
                        ))}
                        <p>{comment.createdAt.toLocaleString()}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Keijiban;