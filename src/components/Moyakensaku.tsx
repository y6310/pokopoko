import React, { useState, useEffect } from "react";
import { Posts, Tags, GetPostData } from "../models";
import Header from "./Header";
import axios from "axios";
import ChoiceTag from "./ChoiceTag";
import Tagscomponent from "./Tagscomponent";
import search from '../Images/search.svg';

interface CommentListProps {
  comments: Posts[];
}

const Moyakensaku = () => {
  const [searchcomments, setSearchComments] = useState<Posts[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [jsonPostData, setJsonPostData] = useState<Posts[]>([]);
  const [choiceTag, setChoiceTag] = useState<Tags[]>([]);
  const [createTagText, setCreateTagText] = useState<string>("");

  const convertGetToukouDataToPosts = (data: GetPostData[]): Posts[] => {
    return data.map((item) => ({
      post_id: item.Id,
      user_name: item.UserName,
      post_body: item.PostBody,
      created_at: new Date(item.CreatedAt),
      tag: item.Tags.map((tag) => ({ tag_body: tag.TagBody, tag_id: tag.Id })),
    }));
  };

  useEffect(() => {
    const getToukouData = async () => {
      try {
        const response = await axios.get<GetPostData[]>(process.env.REACT_APP_ENDPOINT_URL + "/latest");
        const beforepostsData: Posts[] = convertGetToukouDataToPosts(response.data);
        const postsData = addHashtagToTags(beforepostsData);
        setJsonPostData(postsData);
        setSearchComments(postsData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getToukouData();
  }, []);

  const handleInputSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const createTagObject = (tag_body: string): Tags => {
    return {
      tag_body,
      tag_id: Math.random(),
    };
  };

  const handleTagButtonClick = (buttonText: string) => {
    const newTag = createTagObject(buttonText);
    setChoiceTag([...choiceTag, newTag]);
  };

  const handleDeleteTag = (tag_id: number) => {
    const updatedTags = choiceTag.filter(tag => tag.tag_id !== tag_id);
    setChoiceTag(updatedTags);
  };

  const addHashtagToTags = (postsArray: Posts[]): Posts[] => {
    return postsArray.map(post => {
      if (post.tag && post.tag.length > 0) {
        post.tag.forEach(tag => {
          if (tag.tag_body && !tag.tag_body.startsWith("#")) {
            tag.tag_body = `#${tag.tag_body}`;
          }
        });
      }
      return post;
    });
  };

  const handleCreateTag = () => {
    if (createTagText.trim() !== "") {
      const createNewTag = createTagObject("#" + createTagText);
      setChoiceTag([...choiceTag, createNewTag]);
    }
    setCreateTagText("");
  };

  const TagSearch = async () => {
    if (choiceTag.length >= 1) {
      const convertTagsArray = (choiceTag: Tags[]): { TagBody: string }[] => {
        return choiceTag.map(({ tag_body }) => ({ TagBody: tag_body.substring(1) }));
      };
      const postData = convertTagsArray(choiceTag);
      try {
        const responsePost = await axios.post(process.env.REACT_APP_ENDPOINT_URL + "/postsearch", postData, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        });
        const beforePostData: Posts[] = convertGetToukouDataToPosts(responsePost.data);
        const PostData = addHashtagToTags(beforePostData);
        return PostData;
      } catch (error) {
        console.error("Error:", error);
        return [];
      }
    } else {
      try {
        const response = await axios.get<GetPostData[]>(process.env.REACT_APP_ENDPOINT_URL + "/latest");
        const beforepostsData: Posts[] = convertGetToukouDataToPosts(response.data);
        const postsData = addHashtagToTags(beforepostsData);
        return postsData;
      } catch (error) {
        console.error("Error:", error);
        return [];
      }
    }
  };

  const applyFilters = async () => {
    const tagFilteredPosts = await TagSearch();
    const searchValueLower = searchValue.toLowerCase();
    const filteredPosts = tagFilteredPosts.filter((post) => {
      const isOrganizationMatch =
        post.user_name.toLowerCase().includes(searchValueLower) ||
        post.post_body.toLowerCase().includes(searchValueLower) ||
        post.created_at.toString().toLowerCase().includes(searchValueLower);

      const isTagMatch =
        post.tag &&
        post.tag.some((tag: Tags) =>
          tag.tag_body.toLowerCase().includes(searchValueLower)
        );

      return isOrganizationMatch || isTagMatch;
    });

    setSearchComments(filteredPosts);
  };

  useEffect(() => {
    applyFilters();
  }, [searchValue, choiceTag]);

  return (
    <div className="bg-custom-background fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-gray-300 to-gray-200 bg-opacity-80 flex mx-auto w-100% h-screen overflow-y-scroll">
      <div className="max-w-screen-lg w-full px-6 mx-auto">
        <Header />
        <div className="flex items-center mb-10">
          <img src={search} alt="Icon" className="w-10 h-10 mr-2" />
          <p className="text-4xl">モヤモヤ検索</p>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 mb-3"
        />
        <div className="bg-white pt-10 pb-10 pl-10 pr-10 items-center justify-center rounded-lg mb-10">
          <p>タグで検索：タグ選択</p>
          <div>
            <ChoiceTag choiceTag={choiceTag} handleDeleteTag={handleDeleteTag} />
            <Tagscomponent handleTagButtonClick={handleTagButtonClick} />
          </div>
          <br />
          <div className="flex items-center">
            <textarea
              value={createTagText}
              onChange={(e) => setCreateTagText(e.target.value)}
              className="border border-black-500 rounded-lg"
              placeholder="作成したいタグを入力"
            ></textarea>
            <button
              onClick={handleCreateTag}
              className="flex items-center bg-gray-500 opacity-60 rounded-full text-white px-7 py-3 button-hover w-13"
            >
              タグ作成
            </button>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center bg-gray-500 opacity-60 rounded-full text-white px-7 py-3 button-hover w-32">
              <img src={search} alt="Icon" className="w-5 h-5 mr-2" />
              <button onClick={applyFilters}>検索</button>
            </div>
          </div>
        </div>
        <div className="pb-5">
          <ul>
            {searchcomments.slice().map((comment) => (
              <div
                key={comment.post_id}
                className="bg-white pt-10 pb-10 pl-10 pr-10 mb-10 items-center justify-center rounded-lg"
              >
                <p className="font-bold">{comment.user_name}</p>
                <br />
                <p>{comment.post_body}</p>
                <br />
                {comment.tag &&
                  comment.tag.map((tag) => (
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
};

export default Moyakensaku;
