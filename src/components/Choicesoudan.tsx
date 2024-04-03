import React from 'react';
import { SoudanjohoType } from '../models';

interface ChoicesoudanProps {
  choicesoudans: SoudanjohoType[]; // choicesoudansの正しい型
}

const Choicesoudan: React.FC<ChoicesoudanProps> = ({ choicesoudans }) => {
    
  return (
    <div>
      <p className="text-4xl mb-3">役に立つかもしれない支援先</p>
      {choicesoudans.slice().reverse().map(choicesoudan => (
        <div key={choicesoudan.organization_id} className="bg-white pt-10 pb-10 pl-10 pr-10 mb-10 items-center justify-center rounded-lg">
          <p className="font-bold">{choicesoudan.organization_name}</p>
          <br></br>
          <p>{choicesoudan.organization_body}</p>
          <br></br>
          <p><a href={choicesoudan.link}>{choicesoudan.link}</a></p>
          <br></br>
          {choicesoudan.tag && choicesoudan.tag.map(tag => (
            <span key={tag.tag_id}>#{tag.tag_body}</span>
          ))}

        </div>
      ))}
    </div>
  );
};

export default Choicesoudan;