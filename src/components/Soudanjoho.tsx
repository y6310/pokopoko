import {useState, useEffect} from 'react'
import axios from 'axios';
import { SoudanjohoType } from '../models';

const Soudanjoho = () => {
  // const mockData: SoudanjohoType[] = [
  //   { organization_id: 1, organization_name: 'Mock Organization 1', organization_body: 'This is a mock organization 1', link: 'http://mocklink1.com' },
  //   { organization_id: 2, organization_name: 'Mock Organization 2', organization_body: 'This is a mock organization 2', link: 'http://mocklink2.com' },
  //   // 他のモックデータも必要に応じて追加
  // ];
  const [soudanjohos, setSoudamjohos] = useState<SoudanjohoType[]>([]);
  
  useEffect (() => {
    const getSoudanjohoData = async () => {
      try {
        const response = await axios.post("APIエンドポイントのURL");
        setSoudamjohos(response.data);
        console.log("Response:", response.data);
        // 成功時の処理をここに追加
      } catch (error) {
        console.error("Error:", error);
        // エラーハンドリングをここに追加
      }
    }

    getSoudanjohoData(); 
  },[])

  return (
    <div>
      <p>相談機関情報</p>
      {soudanjohos.map((soudanjoho) => (
        <div key = {soudanjoho.organization_id}>
          <h2>{soudanjoho.organization_name}</h2>
          <p>{soudanjoho.organization_body}</p>
            {soudanjoho.tag && soudanjoho.tag.map(tag => (
                    <span key={tag.tag_id}>{tag.tag_body}</span>
                ))}
          <a href ={soudanjoho.link} >{soudanjoho.link}</a>
        </div>
      ))}
    </div>
  )
}

export default Soudanjoho