import React, { useState } from "react";
import { IComment, ITag } from "../models";
import Tags from "./Tags";
import Nitamoyamoya from "./Nitamoyamoya";
import CommentList from "./CommentList";
import ChoiceTag from "./ChoiceTag";

const initialComments: IComment[] = [{
    content: "デモ投稿",
    createdAt: new Date(),
    id: "commentid",
    username:"ああああ",
    tag:[{ tagtext: "#セクシュアリティ", tagid: "tagid1" }]
}]

const Keijiban = () => {
    const [comments, setComments] = useState<IComment[]>(initialComments);
    const [nitamoyas, setNitamoyas] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [newUserName, setNewUserName] = useState<string>("ユーザー名");
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
            const username = newUserName
            const comment: IComment = {
                content: newComment,
                createdAt,
                id,
                username,
                tag: choiceTag.map(tag => ({ tagtext: tag.tagtext, tagid: tag.tagid }))
            };
            setNewUserName("ユーザー名");
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
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="コメント"></textarea>
            <textarea value={newUserName} onChange={(e) => setNewUserName(e.target.value)} ></textarea>
            <br></br>
            <br></br>
            <ChoiceTag  choiceTag={choiceTag} handleDeleteTag={handleDeleteTag}/>
            <Tags handleTagButtonClick={handleTagButtonClick} />
            <br></br>            
            <textarea value={ createTagText } onChange={(e) => setCreateTagText(e.target.value)}></textarea>
            <button onClick={handleCreateTag}>タグ作成</button>
            <br></br>
            <br></br>
            <button onClick={handleAddComment}>投稿</button>
            <div>
            <Nitamoyamoya nitamoyas={nitamoyas}/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <CommentList comments={comments}/>
        </div>
    );
}

export default Keijiban;