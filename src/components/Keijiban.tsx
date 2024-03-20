import React, { useState } from "react";
import { Posts, Tags } from "../models";
import Tagscomponent from "./Tagscomponent";
import Nitamoyamoya from "./Nitamoyamoya";
import CommentList from "./CommentList";
import ChoiceTag from "./ChoiceTag";
import Header from "./Header";
import axios from "axios";

const initialComments: Posts[] = [{
    post_id: Math.random(),
    user_name:"ああああ",
    post_body: "デモ投稿",
    created_at: new Date(), 
    tag:[{ tag_body: "#セクシュアリティ", tag_id: Math.random()}]
}]

const Keijiban = () => {
    const [comments, setComments] = useState<Posts[]>(initialComments);
    const [nitamoyas, setNitamoyas] = useState<Posts[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [newUserName, setNewUserName] = useState<string>("ユーザー名");
    const [choiceTag, setChoiceTag] = useState<Tags[]>([]);
    const [createTagText, setCreateTagText] = useState<string>("");

    const createTagObject = (tag_body:string):Tags => {
        return {
            tag_body,
            tag_id: Math.random(), // ランダムなIDを生成して識別子として使用
        };
      };

    const handleTagButtonClick = (buttonText: string) => {
        const newTag = createTagObject(buttonText);
        setChoiceTag([...choiceTag, newTag]);
    };

    const handleDeleteTag = (tag_id: number) =>{
        const updatedTags = choiceTag.filter(tag => tag.tag_id !== tag_id);
        setChoiceTag(updatedTags);
    };

    const handleCreateTag = () => {
        if(createTagText.trim() !==""){
            const createNewTag = createTagObject("#"+createTagText);
            setChoiceTag([...choiceTag, createNewTag]);  
        };
        setCreateTagText("");//フォームのクリア       
    };

    const postFunction = async () => {
    
        const postData = {
            user_name: newUserName,
            post_body: newComment,
            tags: choiceTag.map(tag => tag.tag_body),
        };    

        try {
          const response = await axios.post("APIエンドポイントのURL", postData);
          console.log("Response:", response.data);
          // 成功時の処理をここに追加
        } catch (error) {
          console.error("Error:", error);
          // エラーハンドリングをここに追加
        }
      };
      
      

    const handleAddComment = () => {
        if(newComment.trim() !== ""){//空欄ではないときにボタンが押された場合
            const post_id = Math.random();//ランダムなIDを生成 
            const created_at = new Date();//現在時刻を取得
            const user_name = newUserName
            const comment: Posts = {
                post_body: newComment,
                created_at,
                post_id,
                user_name,
                tag: choiceTag.map(tag => ({ tag_body: tag.tag_body, tag_id: tag.tag_id }))
            };
            setNewUserName("ユーザー名");
            setNewComment("");//フォームのクリア
            setChoiceTag([]);//タグのクリア
            setComments([...comments, comment])//コメントを追加

            const nitamoyacomments = comments.filter(comment =>
                comment.tag &&  comment.tag.some(tag =>//2.一致しているタグが含まれている投稿を選ぶ
                  choiceTag.some(chTag => chTag.tag_body === tag.tag_body)//1.投稿時に選んだタグとすでに投稿してあるタグと一致するタグを選ぶ
                )
              );
            setNitamoyas(nitamoyacomments);

            postFunction();
        }

    };

    return(
        <div>
            <Header/>
            <div>もやもや掲示板</div>           
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="コメント"></textarea>
            <textarea value={newUserName} onChange={(e) => setNewUserName(e.target.value)} ></textarea>
            <br></br>
            <br></br>
            <ChoiceTag  choiceTag={choiceTag} handleDeleteTag={handleDeleteTag}/>
            <Tagscomponent handleTagButtonClick={handleTagButtonClick} />
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