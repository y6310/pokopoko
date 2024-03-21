import React from 'react'

interface TagscomponentProps {
    handleTagButtonClick: (buttonText: string) => void;
  }


const Tagscomponent: React.FC<TagscomponentProps> = ({ handleTagButtonClick }) => {
  return (
    <div >
      <div>
            <button onClick={() => handleTagButtonClick("#暴言")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ">#暴言</button>
            <button onClick={() => handleTagButtonClick("#暴力")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2">#暴力</button>
            <button onClick={() => handleTagButtonClick("#セクシュアリティ")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2">#セクシュアリティ</button>
            <button onClick={() => handleTagButtonClick("#いじめ")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2 mt-2">#いじめ</button>
            <button onClick={() => handleTagButtonClick("#家族")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2 mt-2">#家族</button>
            <button onClick={() => handleTagButtonClick("#勉強")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2 mt-2">#勉強</button>
            <button onClick={() => handleTagButtonClick("#お金")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2 mt-2">#お金</button>            
            <button onClick={() => handleTagButtonClick("#健康")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2 mt-2">#健康</button>
            <button onClick={() => handleTagButtonClick("#仕事")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2 mt-2">#仕事</button>
            <button onClick={() => handleTagButtonClick("#学校")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2 mt-2">#学校</button>
            <button onClick={() => handleTagButtonClick("#人間関係")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2 mt-2">#人間関係</button>
            <button onClick={() => handleTagButtonClick("#しんどい")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2 mt-2">#しんどい</button>
            <button onClick={() => handleTagButtonClick("#疲れた")} className="button-color opacity-60 rounded-full text-white px-10 py-2 button-hover ml-2 mt-2">#疲れた</button>
      </div>
    </div>
  )
}

export default Tagscomponent