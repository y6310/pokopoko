import React from 'react'
import { ITag } from '../models';

interface ChoiceTagProps {
    choiceTag: ITag[]; // nitamoyasの型を指定
    handleDeleteTag:(tagid: string) =>void;

  }

const ChoiceTag:React.FC<ChoiceTagProps> = ({ choiceTag, handleDeleteTag }) => {
  return (
    <div>
        {choiceTag.map(tag => (
            <span key={tag.tagid}>
                <span>{tag.tagtext}</span>
                <button onClick={() => handleDeleteTag(tag.tagid)}>x</button>
            </span>
        ))}
    </div>
  )
}

export default ChoiceTag