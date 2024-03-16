import React from 'react';
import { IComment} from '../models';

interface NitamoyamoyaProps {
  nitamoyas: IComment[]; // nitamoyasの型を指定
}

const Nitamoyamoya: React.FC<NitamoyamoyaProps> = ({nitamoyas}) => {
 
  return (
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
  )
}

export default Nitamoyamoya