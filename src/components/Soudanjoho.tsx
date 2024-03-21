import { useState, useEffect } from 'react';
import axios from 'axios';
import { SoudanjohoType } from '../models';
import Header from "./Header";
import soudan from '../Images/soudan.svg';

const Soudanjoho = () => {
  const mockData: SoudanjohoType[] = [
    { organization_id: 1, organization_name: "おはよう", organization_body: 'This is a mock organization 1', link: 'http://mocklink1.com' },
    { organization_id: 2, organization_name: 'Mock Organization 2', organization_body: 'This is a mock organization 2', link: 'http://mocklink2.com' },
    // 他のモックデータも必要に応じて追加
  ];

  const [soudanjohos, setSoudamjohos] = useState<SoudanjohoType[]>(mockData);

  useEffect(() => {
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
    };

    getSoudanjohoData();
  }, []);

  const handleInputSearch = (value: string) => {
    if (value === "") {
      setSoudamjohos(mockData); // 検索文字列が空の場合は元のデータを表示する
      return;
    }

    const searchValue = value.toLowerCase(); // 検索文字列を小文字に変換する
    const searchedJohos = soudanjohos.filter((soudanjoho) => {
      const isOrganizationMatch =
        soudanjoho.organization_name.toLowerCase().includes(searchValue) ||
        soudanjoho.organization_body.toLowerCase().includes(searchValue) ||
        soudanjoho.link.toLowerCase().includes(searchValue);

      const isTagMatch =
        soudanjoho.tag &&
        soudanjoho.tag.some((tag) =>
          tag.tag_body.toLowerCase().includes(searchValue)
        );

      return isOrganizationMatch || isTagMatch;
    });

    setSoudamjohos(searchedJohos); // 検索結果に基づいて配列をセットする
  };

  return (
    <div className="bg-custom-background fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-gray-300 to-gray-200 bg-opacity-80 flex mx-auto w-100% h-screen overflow-y-scroll">
      <div className="max-w-screen-lg w-full px-6 mx-auto">
        <Header />
        <div className="flex items-center mb-10">
          <img src={soudan} alt="Icon" className="w-10 h-10 mr-2" />
          <p className="text-4xl ">支援先紹介</p>
        </div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleInputSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 mb-3"
        />
        {soudanjohos.map((soudanjoho) => (
          <div key={soudanjoho.organization_id} className="bg-white pt-10 pb-10 pl-10 pr-10 mb-10 items-center justify-center rounded-lg">
            <h2>{soudanjoho.organization_name}</h2>
            <p>{soudanjoho.organization_body}</p>
            {soudanjoho.tag && soudanjoho.tag.map(tag => (
              <span key={tag.tag_id}>{tag.tag_body}</span>
            ))}
            <a href={soudanjoho.link}>{soudanjoho.link}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Soudanjoho;
