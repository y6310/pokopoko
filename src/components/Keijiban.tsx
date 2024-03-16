import React, { useState } from "react";
import { IComment, ITag } from "../models";


const initialComments: IComment[] = [{
    content: "デモ投稿",
    createdAt: new Date(),
    id: "commentid",
    tag:[{ tagtext: "#セクシュアリティ", tagid: "tagid1" }]
}]

const Keijiban = () => {
    const [comments, setComments] = useState<IComment[]>(initialComments);
    const [nitamoyas, setNitamoyas] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [choiceTag, setChoiceTag] = useState<ITag[]>([]);
    const [createTagText, setCreateTagText] = useState<string>("");

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

    const handleCreateTag = () => {
        if(createTagText.trim() !==""){
            const createNewTag = createTagObject("#"+createTagText);
            setChoiceTag([...choiceTag, createNewTag]);  
        };
        setCreateTagText("");//フォームのクリア       
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

            const nitamoyacomments = comments.filter(comment =>
                comment.tag &&  comment.tag.some(tag =>//2.一致しているタグが含まれている投稿を選ぶ
                  choiceTag.some(chTag => chTag.tagtext === tag.tagtext)//1.投稿時に選んだタグとすでに投稿してあるタグと一致するタグを選ぶ
                )
              );
            setNitamoyas(nitamoyacomments);
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
            <button onClick={() => handleTagButtonClick("#暴言")}>#暴言</button>
            <button onClick={() => handleTagButtonClick("#暴力")}>#暴力</button>
            <button onClick={() => handleTagButtonClick("#セクシュアリティ")}>#セクシュアリティ</button>
            <button onClick={() => handleTagButtonClick("#いじめ")}>#いじめ</button>
            <button onClick={() => handleTagButtonClick("#家族")}>#家族</button>
            <button onClick={() => handleTagButtonClick("#勉強")}>#勉強</button>
            <br></br>
            <button onClick={() => handleTagButtonClick("#お金")}>#お金</button>
            <button onClick={() => handleTagButtonClick("#健康")}>#健康</button>
            <button onClick={() => handleTagButtonClick("#仕事")}>#仕事</button>
            <button onClick={() => handleTagButtonClick("#学校")}>#学校</button>
            <button onClick={() => handleTagButtonClick("#人間関係")}>#人間関係</button>
            <button onClick={() => handleTagButtonClick("#しんどい")}>#しんどい</button>
            <button onClick={() => handleTagButtonClick("#疲れた")}>#疲れた</button>

            <br></br>
            <textarea value={ createTagText } onChange={(e) => setCreateTagText(e.target.value)}></textarea>
            <button onClick={handleCreateTag}>タグ作成</button>
            <br></br>
            <br></br>
            <button onClick={handleAddComment}>投稿</button>
            <div>
                あなたに似たもやもや
                {nitamoyas.slice().reverse().map(nitamoya =>(//新しい投稿を上に表示させるために逆順
                    <div key = {nitamoya.id}>
                        <p>{nitamoya.content}</p>
                        {nitamoya.tag && nitamoya.tag.map(tag => (
                            <span key={tag.tagid}>{tag.tagtext}</span>
                        ))}
                        <p>{nitamoya.createdAt.toLocaleString()}</p>
                    </div>
                ))}
            </div>

            <br></br>
            <br></br>
            <br></br>

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