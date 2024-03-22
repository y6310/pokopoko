import { useState, useEffect } from 'react';
import axios from 'axios';
import { SoudanjohoType, GetSoudanData,Tags} from '../models';
import Header from "./Header";
import soudan from '../Images/soudan.svg';

const Soudanjoho = () => {
  const mockData: SoudanjohoType[] = [
    { organization_id: 1, organization_name: "おはよう", organization_body: 'This is a mock organization 1', link: 'http://mocklink1.com',
    tag: [{
      tag_id: 11,
      tag_body: "#"+"セクシュアリティ"
  }]},
    { organization_id: 2, organization_name: 'Mock Organization 2', organization_body: 'This is a mock organization 2', link: 'http://mocklink2.com' },
    // 他のモックデータも必要に応じて追加
  ];

  const [searchsoudanjohos, setSearchSoudamjohos] = useState<SoudanjohoType[]>([]);
  const [searchValueSodan, setSearchValueSodan] = useState<string>("");
  const [lastSearchValueSodan, setLastSearchValueSodan] = useState<string>("");
  const [jsonSoudanData, setJsonSoudanData] = useState<SoudanjohoType[]>([]);//Jsonからとってくる値をいれる、最初にすべての値を取得したあと変更しない

  
  const convertGetSoudanDataToSoudan = (data: GetSoudanData[]): SoudanjohoType[] => {
    return data.map((item) => ({
      organization_id:item.Id,
      organization_name: item.OrganizationName,
      organization_body: item.OrganizationBody,
      link:item.Link,
      tag: item.Tags.map((tag) => ({ tag_body: tag.TagBody, tag_id:tag.Id })),
    }));
  };

  useEffect(() => {
    const getSoudanjohoData = async () => {
      try {
        const responseSoudan = await axios.get<GetSoudanData[]>("./latest-post-sample.json");
        const SoudanjohosData: SoudanjohoType[] = convertGetSoudanDataToSoudan(responseSoudan.data);
        setJsonSoudanData(SoudanjohosData);
        setSearchSoudamjohos(SoudanjohosData); // postsDataをセットする必要があります
        console.log("Response:", responseSoudan.data);
        // 成功時の処理をここに追加
      } catch (error) {
        console.error("Error:", error);
        // エラーハンドリングをここに追加
      }
    };

    getSoudanjohoData();
  }, []);


  const handleInputSearch = (value: string) => {
    setSearchValueSodan(value);
    if (value === "") {
      setSearchSoudamjohos(searchsoudanjohos); // 検索文字列が空の場合は元のデータを表示する
      return;
    }

    const searchValue = value.toLowerCase(); // 検索文字列を小文字に変換する
    const searchedJohos = searchsoudanjohos.filter((searchsoudanjoho) => {
      const isOrganizationMatch =
        searchsoudanjoho.organization_name.toLowerCase().includes(searchValue) ||
        searchsoudanjoho.organization_body.toLowerCase().includes(searchValue) ||
        searchsoudanjoho.link.toLowerCase().includes(searchValue);

      const isTagMatch =
        searchsoudanjoho.tag &&
        searchsoudanjoho.tag.some((tag: Tags) =>
          tag.tag_body.toLowerCase().includes(searchValue)
        );

      return isOrganizationMatch || isTagMatch;
    });

      setSearchSoudamjohos(searchedJohos); // 検索結果に基づいて配列をセットする
      setLastSearchValueSodan(value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleInputSearch(searchValueSodan);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchValueSodan(value); // テキストボックスに値をセットする
      if (value === "" || lastSearchValueSodan !== "") {
        setSearchSoudamjohos(jsonSoudanData); // 検索文字列が空の場合かつ前回検索があった場合は元のデータを表示する
        setLastSearchValueSodan("");
      }
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
          value={searchValueSodan}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 mb-3"
        />
        <div>
          <ul>        
            {searchsoudanjohos.map((soudanjoho) => (
              <div key={soudanjoho.organization_id} className="bg-white pt-10 pb-10 pl-10 pr-10 mb-10 items-center justify-center rounded-lg">
              <p>{soudanjoho.organization_name}</p>
              <p>{soudanjoho.organization_body}</p>
              {soudanjoho.tag && soudanjoho.tag.map(tag => (
                <span key={tag.tag_id}>{tag.tag_body}</span>
              ))}
              <p><a href={soudanjoho.link}>{soudanjoho.link}</a></p>
            </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Soudanjoho;
