import React, { useState, useEffect } from "react";
import { Posts, Tags, SoudanjohoType, GetPostData, GetSoudanData} from "../models";
import Tagscomponent from "./Tagscomponent";
import Nitamoyamoya from "./Nitamoyamoya";
import Choicesoudan from "./Choicesoudan";
import ChoiceTag from "./ChoiceTag";
import Header from "./Header";
import axios from "axios";
import Data from "./latest-post-sample.json";
import send from '../Images/send.svg'
import swal from 'sweetalert2';

const initialComments: Posts[] = [{
    post_id: Math.random(),
    user_name:"ああああ",
    post_body: "デモ投稿",
    created_at: new Date(), 
    tag:[{ tag_body: "#セクシュアリティ", tag_id: Math.random()}]
}]

const Toukou = () => {
    const [comments, setComments] = useState<Posts[]>([]);
    const [nitamoyas, setNitamoyas] = useState<Posts[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [newUserName, setNewUserName] = useState<string>("ユーザー名");
    const [choiceTag, setChoiceTag] = useState<Tags[]>([]);
    const [choiceSoudan, setChoiceSoudan] = useState<SoudanjohoType[]>([]);
    const [createTagText, setCreateTagText] = useState<string>("");
    const [soudanjohos, setSoudamjohos] = useState<SoudanjohoType[]>([]);
    // const [jsonPostData, setJsonPostData] = useState<GetPostData[]>([]);
    // const [jsonSoudanData, setJsonSoudanData] = useState<GetSoudanData[]>([]);


    const mockData: SoudanjohoType[] = [
      { organization_id: 1, organization_name: "おはよう", organization_body: 'This is a mock organization 1', link: 'http://mocklink1.com' ,
      tag: [{
        tag_id: 11,
        tag_body: "#"+"セクシュアリティ"
    }]},
      { organization_id: 2, organization_name: 'Mock Organization 2', organization_body: 'This is a mock organization 2', link: 'http://mocklink2.com' },
      // 他のモックデータも必要に応じて追加
    ];
  
    

    const convertGetToukouTDataToPosts = (data: GetPostData[]): Posts[] => {
      return data.map((item) => ({
        post_id: item.Id, // post_idとしてIdを使用
        user_name: item.UserName,
        post_body: item.PostBody,
        created_at: new Date(item.CreatedAt), // CreatedAtをDateオブジェクトに変換
        tag: item.Tags.map((tag) => ({ tag_body: tag.TagBody, tag_id: tag.Id })), // Tagsを適切な形式に変換
      }));
    };

    const convertGetSoudanDataToSoudan = (data: GetSoudanData[]): SoudanjohoType[] => {
      return data.map((item) => ({
        organization_id:item.Id,
        organization_name: item.OrganizationName,
        organization_body: item.OrganizationBody,
        link:item.Link,
        tag: item.Tags.map((tag) => ({ tag_body: tag.TagBody, tag_id:tag.Id })),
      }));
    };


    useEffect(() => {

      const getPostData = async () => {
        try {
          const responsePost = await axios.get<GetPostData[]>(process.env.REACT_APP_ENDPOINT_URL + "/latest"); // レスポンスの型をGetData[]に変更
          const postsData: Posts[] = convertGetToukouTDataToPosts(responsePost.data);
          setComments(postsData);          
          console.log("Response:", responsePost.data);
          // 成功時の処理をここに追加
        } catch (error) {
          console.error("Error:", error);
          // エラーハンドリングをここに追加
        }
      };

      //相談情報のデータもらったら書き換える
      const getSoudanjohoData = async () => {
        try {
          const responseSoudan = await axios.get<GetSoudanData[]>(process.env.REACT_APP_ENDPOINT_URL + "/organizations");
          const SoudanjohosData: SoudanjohoType[] = convertGetSoudanDataToSoudan(responseSoudan.data);
          setSoudamjohos(SoudanjohosData); // postsDataをセットする必要があります
          console.log("Response:", responseSoudan.data);
          // 成功時の処理をここに追加
        } catch (error) {
          console.error("Error:", error);
          // エラーハンドリングをここに追加
        }
      };
    
      getSoudanjohoData();
      getPostData();
      
    }, []);


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
            Username: newUserName,
            PostBody: newComment,
            Tags: choiceTag.map(TagBody=> TagBody.tag_body),
        };    

        try {
          const response = await axios.post(process.env.REACT_APP_ENDPOINT_URL + "/post-and-search", postData);
          console.log("Response:", response.data);
          // 成功時の処理をここに追加
        } catch (error) {
          console.error("Error:", error);
          // エラーハンドリングをここに追加
        }
      };
      
      // const convertTagsToSoudanjoho = (tags: Tags[]): SoudanjohoType[] => {
      //   return tags.map(tag => ({
      //     organization_id: tag.tag_id,
      //     organization_name: tag.tag_body,
      //     organization_body: "", // 必要に応じてorganization_bodyの適切な値を追加
      //     link: '' // 必要に応じてlinkの適切な値を追加
      //   }));
      // };
    
    // const choicesoudans = convertTagsToSoudanjoho(choiceSoudan);
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

              const choicesoudans = soudanjohos.filter(soudanjoho =>
                soudanjoho.tag && soudanjoho.tag.some(tag =>
                  choiceTag.some(chTag => chTag.tag_body === tag.tag_body)
                )
              );

              swal.fire({
                title: '投稿しますか？',
                text: '「モヤモヤ検索」にあなたの投稿が表示されます',

                confirmButtonText: 'はい',
                cancelButtonText: 'いいえ',
                showCancelButton:true,
              }).then((result) => {
                if (result.isConfirmed) {
                  // ユーザーが「はい」をクリックした場合の処理
                  setNitamoyas(nitamoyacomments);
                  setChoiceSoudan(choicesoudans);
                  postFunction();
                } else {
                  // ユーザーが「いいえ」をクリックした場合の処理
                }
              });

        }

    };

    return(

        <div className="bg-custom-background fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-gray-300 to-gray-200 bg-opacity-80 flex mx-auto w-100% overflow-y-scroll">
            <div className="max-w-screen-lg w-full px-6 mx-auto">
              <Header/>
              <div className="flex items-center">
                  <img src={send} alt="Icon" className="w-10 h-10 mr-2" />
                  <p className="text-4xl">モヤモヤ投稿</p>
              </div>
              <br></br>
              <textarea value={newUserName} onChange={(e) => setNewUserName(e.target.value)} className="w-96 h-10 border-gray-300 rounded-lg"></textarea>          
              <br></br>
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className="w-96 h-48 border-gray-300 rounded-lg" placeholder="コメント"></textarea>
              <br></br>
              <br></br>
              <div  className="bg-white pt-10 pb-10 pl-10 pr-10 items-center justify-center rounded-lg">
              <p>タグ選択</p>
              <div>
              <ChoiceTag  choiceTag={choiceTag} handleDeleteTag={handleDeleteTag}/>
              <Tagscomponent handleTagButtonClick={handleTagButtonClick} />
            </div>
            <br></br>
            <div  className="flex items-center">           
            <textarea value={ createTagText } onChange={(e) => setCreateTagText(e.target.value)} className = " border border-black-500 rounded-lg"  placeholder="作成したいタグを入力"></textarea>
            <button onClick={handleCreateTag} className="flex items-center bg-gray-500 opacity-60 rounded-full text-white px-7 py-3 button-hover w-13 ">タグ作成</button>
            </div> 
            </div>
            <br></br>
            <br></br>
            <div className = "flex justify-end">
              <div className="flex items-center bg-gray-500 opacity-60 rounded-full text-white px-7 py-3 button-hover w-32 ">
              <img src={send} alt="Icon" className="w-5 h-5 mr-2"/>
              <button onClick={handleAddComment}>投稿</button>
              </div>
            </div>
            <div>
            <Nitamoyamoya nitamoyas={nitamoyas}/>
            </div>
            <br></br>
            <Choicesoudan  choicesoudans ={ choiceSoudan }/>
            </div>
        </div>
    );
}

export default Toukou;