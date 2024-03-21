import React from 'react'
import { Tags } from '../models';

interface ChoiceTagProps {
    choiceTag: Tags[]; // nitamoyasの型を指定
    handleDeleteTag:(tag_id: number) =>void;

  }

const ChoiceTag:React.FC<ChoiceTagProps> = ({ choiceTag, handleDeleteTag }) => {
  return (
    <div>
        {choiceTag.map(tag => (
            <span key={tag.tag_id}  className = "px-2 py-2">
                <span>{tag.tag_body}</span>
                <button onClick={() => handleDeleteTag(tag.tag_id)}>×</button>
            </span>
        ))}
    </div>
  )
}

export default ChoiceTag