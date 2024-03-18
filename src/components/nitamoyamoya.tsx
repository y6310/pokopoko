import React from 'react';
import { Posts} from '../models';

interface NitamoyamoyaProps {
  nitamoyas: Posts[]; // nitamoyasの型を指定
}

const Nitamoyamoya: React.FC<NitamoyamoyaProps> = ({nitamoyas}) => {
 
  return (
    <div>
      あなたに似たもやもや
      {nitamoyas.slice().reverse().map(nitamoya =>(//新しい投稿を上に表示させるために逆順
          <div key = {nitamoya.post_id}>
              <p>{nitamoya.post_body}</p>
              {nitamoya.tag && nitamoya.tag.map(tag => (
                  <span key={tag.tag_id}>{tag.tag_body}</span>
              ))}
              <p>{nitamoya.created_at.toLocaleString()}</p>
          </div>
      ))}

    </div>
  )
}

export default Nitamoyamoya