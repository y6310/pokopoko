import { useState, useEffect } from 'react';
import axios from 'axios';
import { SoudanjohoType, GetSoudanData, Tags } from '../models';
import Header from "./Header";
import soudan from '../Images/soudan.svg';
import ChoiceTag from "./ChoiceTag";
import Tagscomponent from "./Tagscomponent";
import search from '../Images/search.svg'

const Soudanjoho = () => {
  const mockData: SoudanjohoType[] = [
    {
      organization_id: 1, organization_name: "おはよう", organization_body: 'This is a mock organization 1', link: 'http://mocklink1.com',
      tag: [{
        tag_id: 11,
        tag_body: "#" + "セクシュアリティ"
      }]
    },
    { organization_id: 2, organization_name: 'Mock Organization 2', organization_body: 'This is a mock organization 2', link: 'http://mocklink2.com' },
    // 他のモックデータも必要に応じて追加
  ];

  const [searchsoudanjohos, setSearchSoudamjohos] = useState<SoudanjohoType[]>([]);
  const [searchValueSodan, setSearchValueSodan] = useState<string>("");
  const [jsonSoudanData, setJsonSoudanData] = useState<SoudanjohoType[]>([]);//Jsonからとってくる値をいれる、最初にすべての値を取得したあと変更しない
  const [choiceTag, setChoiceTag] = useState<Tags[]>([]);
  const [createTagText, setCreateTagText] = useState<string>("");




  const addHashtagToOrgs = (orgsArray: SoudanjohoType[]): SoudanjohoType[] => {
    return orgsArray.map(org => {
      if (org.tag && org.tag.length > 0) {
        org.tag.forEach(tag => {
          if (tag.tag_body && !tag.tag_body.startsWith("#")) {
            tag.tag_body = `#${tag.tag_body}`;
          }
        });
      }
      return org;
    });
  };

  const convertGetSoudanDataToSoudan = (data: GetSoudanData[]): SoudanjohoType[] => {
    return data.map((item) => ({
      organization_id: item.Id,
      organization_name: item.OrganizationName,
      organization_body: item.OrganizationBody,
      link: item.Link,
      tag: item.Tags.map((tag) => ({ tag_body: tag.TagBody, tag_id: tag.Id })),
    }));
  };

  useEffect(() => {
    const getSoudanjohoData = async () => {
      try {
        const responseSoudan = await axios.get<GetSoudanData[]>(process.env.REACT_APP_ENDPOINT_URL + "/organizations");
        const beforeSoudanjohosData: SoudanjohoType[] = convertGetSoudanDataToSoudan(responseSoudan.data);
        const SoudanjohosData = addHashtagToOrgs(beforeSoudanjohosData)
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


  // const handleInputSearch = (value: string) => {
  //   setSearchValueSodan(value);
  //   if (value === "") {
  //     const getSoudanjohoData = async () => {
  //       try {
  //         const responseSoudan = await axios.get<GetSoudanData[]>(process.env.REACT_APP_ENDPOINT_URL + "/organizations");
  //         const beforeSoudanjohosData: SoudanjohoType[] = convertGetSoudanDataToSoudan(responseSoudan.data);
  //         const SoudanjohosData = addHashtagToOrgs(beforeSoudanjohosData)
  //         setJsonSoudanData(SoudanjohosData);
  //         setSearchSoudamjohos(SoudanjohosData); // postsDataをセットする必要があります
  //         console.log("Response:", responseSoudan.data);
  //         // 成功時の処理をここに追加
  //       } catch (error) {
  //         console.error("Error:", error);
  //         // エラーハンドリングをここに追加
  //       }
  //     };
  
  //     getSoudanjohoData();
  //     return;
  //   }

  //   const searchValue = value.toLowerCase(); // 検索文字列を小文字に変換する
  //   const searchedJohos = searchsoudanjohos.filter((searchsoudanjoho) => {
  //     const isOrganizationMatch =
  //       searchsoudanjoho.organization_name.toLowerCase().includes(searchValue) ||
  //       searchsoudanjoho.organization_body.toLowerCase().includes(searchValue) ||
  //       searchsoudanjoho.link.toLowerCase().includes(searchValue);

  //     const isTagMatch =
  //       searchsoudanjoho.tag &&
  //       searchsoudanjoho.tag.some((tag: Tags) =>
  //         tag.tag_body.toLowerCase().includes(searchValue)
  //       );

  //     return isOrganizationMatch || isTagMatch;
  //   });

  //   setSearchSoudamjohos(searchedJohos); // 検索結果に基づいて配列をセットする
  //   setLastSearchValueSodan(value);
  // };

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     handleInputSearch(searchValueSodan);
  //   }
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValueSodan(value); // テキストボックスに値をセットする
  };

  const createTagObject = (tag_body: string): Tags => {
    return {
      tag_body,
      tag_id: Math.random(), // ランダムなIDを生成して識別子として使用
    };
  };

  const handleTagButtonClick = (buttonText: string) => {
    const newTag = createTagObject(buttonText);
    setChoiceTag([...choiceTag, newTag]);
  };

  const handleDeleteTag = (tag_id: number) => {
    const updatedTags = choiceTag.filter(tag => tag.tag_id !== tag_id);
    setChoiceTag(updatedTags);
  };

  const handleCreateTag = () => {
    if (createTagText.trim() !== "") {
      const createNewTag = createTagObject("#" + createTagText);
      setChoiceTag([...choiceTag, createNewTag]);
    };
    setCreateTagText("");//フォームのクリア       
  };

  const TagSearch = async () => {
    if (choiceTag.length >= 1) {
      const convertTagsArray = (choiceTag: Tags[]): { TagBody: string }[] => {
        return choiceTag.map(({ tag_body }) => ({ TagBody: tag_body.substring(1) }));
      };
      const postData = convertTagsArray(choiceTag)
      console.log(postData)
      try {
        const responseSoudan = await axios.post(process.env.REACT_APP_ENDPOINT_URL + "/orgssearch", postData, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        });
        const beforeSoudanjohosData: SoudanjohoType[] = convertGetSoudanDataToSoudan(responseSoudan.data);


        const SoudanjohosData = addHashtagToOrgs(beforeSoudanjohosData)
        return SoudanjohosData;
        // setJsonSoudanData(SoudanjohosData);
        // setSearchSoudamjohos(SoudanjohosData);
        console.log("Response:", responseSoudan.data);

        // 成功時の処理をここに追加
      } catch (error) {
        console.error("Error:", error);
        return [];
        // エラーハンドリングをここに追加
      }
    } else {
      try {
        const responseSoudan = await axios.get<GetSoudanData[]>(process.env.REACT_APP_ENDPOINT_URL + "/organizations");
        const beforeSoudanjohosData: SoudanjohoType[] = convertGetSoudanDataToSoudan(responseSoudan.data);
        const SoudanjohosData = addHashtagToOrgs(beforeSoudanjohosData)
        // setJsonSoudanData(SoudanjohosData);
        // setSearchSoudamjohos(SoudanjohosData); // postsDataをセットする必要があります
        return SoudanjohosData;
        console.log("Response:", responseSoudan.data);
        // 成功時の処理をここに追加
      } catch (error) {
        console.error("Error:", error);
        return [];
        // エラーハンドリングをここに追加
      }
    }
  };
  
  const applyFiltersSoudan = async () => {
    const tagFilteredSodans = await TagSearch();
    const searchValueLower = searchValueSodan.toLowerCase();
    const filteredSodans = tagFilteredSodans.filter((org) => {
      const isOrganizationMatch =
        org.organization_name.toLowerCase().includes(searchValueLower) ||
        org.organization_body.toLowerCase().includes(searchValueLower) ||
        org.link.toString().toLowerCase().includes(searchValueLower);

      const isTagMatch =
        org.tag &&
        org.tag.some((tag: Tags) =>
          tag.tag_body.toLowerCase().includes(searchValueLower)
        );

      return isOrganizationMatch || isTagMatch;
    });

    setSearchSoudamjohos(filteredSodans);
  };

  useEffect(() => {
    applyFiltersSoudan ();
  }, [searchValueSodan, choiceTag]);

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
          placeholder="文字を入力して検索"
          value={searchValueSodan}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 mb-3"
        />
        <div className="bg-white pt-10 pb-10 pl-10 pr-10 items-center justify-center rounded-lg mb-10">
          <p>タグで検索：タグ選択</p>
          <div>
            <ChoiceTag choiceTag={choiceTag} handleDeleteTag={handleDeleteTag} />
            <Tagscomponent handleTagButtonClick={handleTagButtonClick} />
          </div>

          <br></br>
          <div className="flex items-center">
            <textarea value={createTagText} onChange={(e) => setCreateTagText(e.target.value)} className=" border border-black-500 rounded-lg" placeholder="作成したいタグを入力"></textarea>
            <button onClick={handleCreateTag} className="flex items-center bg-gray-500 opacity-60 rounded-full text-white px-7 py-3 button-hover w-13 ">タグ作成</button>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center bg-gray-500 opacity-60 rounded-full text-white px-7 py-3 button-hover w-32 ">
              <img src={search} alt="Icon" className="w-5 h-5 mr-2" />
              <button onClick={applyFiltersSoudan}>検索</button>
            </div>
          </div>
        </div>
        <div className='pb-5'>
          <ul>
            {searchsoudanjohos.map((soudanjoho) => (
              <div key={soudanjoho.organization_id} className="bg-white pt-10 pb-10 pl-10 pr-10 mb-10 items-center justify-center rounded-lg">
                <p className="font-bold">{soudanjoho.organization_name}</p>
                <br></br>
                <p>{soudanjoho.organization_body}</p>
                <br></br>
                <p><a href={soudanjoho.link}>{soudanjoho.link}</a></p>
                <br></br>
                {soudanjoho.tag && soudanjoho.tag.map(tag => (
                  <span key={tag.tag_id}>{tag.tag_body}</span>
                ))}

              </div>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Soudanjoho;
