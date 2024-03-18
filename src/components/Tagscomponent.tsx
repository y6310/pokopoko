import React from 'react'

interface TagscomponentProps {
    handleTagButtonClick: (buttonText: string) => void;
  }


const Tagscomponent: React.FC<TagscomponentProps> = ({ handleTagButtonClick }) => {
  return (
    <div>
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
    </div>
  )
}

export default Tagscomponent