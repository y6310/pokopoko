import React, { useState, useEffect } from "react";
import { Posts, Tags, GetPostData} from "../models";
import Header from "./Header";
import axios from "axios";

import search from '../Images/search.svg'

interface CommentListProps {
  comments: Posts[]; 
}

const Moyakensaku = () => {
  const comments: Posts[] = [
    { post_id: 1, user_name: 'User1', post_body: 'Comment 1', tag: [{ tag_id: 1, tag_body: 'Tag1' }], created_at: new Date() },
    { post_id: 2, user_name: 'User2', post_body: 'Comment 2', tag: [{ tag_id: 2, tag_body: 'Tag2' }], created_at: new Date() },
    // 他のコメント
  ];

  const [searchcomments, setSearchComments] = useState<Posts[]>([]);//ダミーのときはcomments
  const [searchValue, setSearchValue] = useState<string>("");
  const [lastSearchValue, setLastSearchValue] = useState<string>("");
  const [jsonPostData, setJsonPostData] = useState<Posts[]>([]);//Jsonからとってくる値をいれる、最初にすべての値を取得したあと変更しない

  const convertGetToukouDataToPosts = (data: GetPostData[]): Posts[] => {
    return data.map((item) => ({
      post_id: item.Id, // post_idとしてIdを使用
      user_name: item.UserName,
      post_body: item.PostBody,
      created_at: new Date(item.CreatedAt), // CreatedAtをDateオブジェクトに変換
      tag: item.Tags.map((tag) => ({ tag_body: tag.TagBody, tag_id: tag.Id })), // Tagsを適切な形式に変換
    }));
  };
  
  useEffect(() => {
    const getToukouData = async () => {
        try {
            const response = await axios.get<GetPostData[]>("./latest-post-sample.json"); // レスポンスの型をGetPostData[]に変更
            const postsData: Posts[] = convertGetToukouDataToPosts(response.data);
            setJsonPostData(postsData);
            setSearchComments(postsData);
            console.log("Response:", response.data);
            // 成功時の処理をここに追加
          } catch (error) {
            console.error("Error:", error);
            // エラーハンドリングをここに追加
          }
    }

    getToukouData(); 
  }, []);

  const handleInputSearch = (value: string) => {
    setSearchValue(value);
    if (value === "") {
      setSearchComments(jsonPostData); // 検索文字列が空の場合は元のデータを表示する
      return;
    }
    
    const searchValueLower = value.toLowerCase(); // 検索文字列を小文字に変換する
    const searchedComments = searchcomments.filter((searchcomment) => {
      const isOrganizationMatch =
        searchcomment.user_name.toLowerCase().includes(searchValueLower) ||
        searchcomment.post_body.toLowerCase().includes(searchValueLower) ||
        searchcomment.created_at.toString().toLowerCase().includes(searchValueLower);
    
      const isTagMatch =
        searchcomment.tag &&
        searchcomment.tag.some((tag: Tags) =>
          tag.tag_body.toLowerCase().includes(searchValueLower)
        );
    
      return isOrganizationMatch || isTagMatch;
    });
    
    setSearchComments(searchedComments); // 検索結果に基づいて配列をセットする
    setLastSearchValue(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputSearch(searchValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value); // テキストボックスに値をセットする
    if (value === "" || lastSearchValue !== "") {
      setSearchComments(jsonPostData); // 検索文字列が空の場合かつ前回検索があった場合は元のデータを表示する
      setLastSearchValue("");
    }
  };


  return (
    <div className="bg-custom-background fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-gray-300 to-gray-200 bg-opacity-80 flex mx-auto w-100% h-screen overflow-y-scroll ">
      <div className="max-w-screen-lg w-full px-6 mx-auto">
        <Header/>
        <div className="flex items-center mb-10">
          <img src={search} alt="Icon" className="w-10 h-10 mr-2" />
          <p className="text-4xl ">モヤモヤ検索</p>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) =>  handleInputChange(e)}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 mb-3"
        />  
        <div>
          <ul>
            {searchcomments.slice().reverse().map(comment => (
              <div key={comment.post_id} className="bg-white pt-10 pb-10 pl-10 pr-10 mb-10 items-center justify-center rounded-lg">
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
      </div>          
    </div>
  );
}

export default Moyakensaku;