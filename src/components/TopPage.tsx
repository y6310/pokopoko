import React from 'react'
import '../index.css'
import { Link } from "react-router-dom";
import mokumoya from '../Images/mokumoya.svg'
import search from '../Images/search.svg'
import send from '../Images/send.svg'
import soudan from '../Images/soudan.svg'
import totoukou from '../Images/totoukou.svg'
import tomoyakensaku from '../Images/tomoyakensaku.svg'
import toshienshoukai from '../Images/toshienshoukai.svg'

const TopPage = () => { 
    return (
    <div className="bg-custom-background fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-gray-300 to-gray-200 bg-opacity-80 flex items-center justify-center overflow-y-auto h-screen overflow-y-scroll">
        <div>
        <img src={mokumoya} alt="Icon" className="w-100 h-80 mx-auto "/>

        <p className="text-center text-2xl">モヤっとは、モヤモヤを抱えているあなたが一歩踏み出すための掲示板</p>
        
        <div className = "pt-10 pl-10 pr-10">
            <div className="flex items-center ">
                <img src={send} alt="Icon" className="w-10 h-10 mr-2" />
                <p className="text-2xl">モヤモヤ投稿</p>
            </div>
            <p>誰にも言えない、ここだから言えるモヤモヤ、吐き出してみよう。</p>
            <Link to="/Toukou" className="inline-block">
                <img src={totoukou} alt="Icon" className="mr-2" />
            </Link>
        </div>
        <div className = "pt-10 pl-10 pr-10">
            <div className="flex items-center">
                <img src={search} alt="Icon" className="w-10 h-10 mr-2"/>
                <p className="text-2xl">モヤモヤ検索</p>
            </div>
            <p>あなたが抱えるモヤモヤは他の人も抱えているものかも。<br></br>
            モヤモヤを探そう。</p>
            <Link to="/Moyakensaku" className="inline-block">
                <img src={tomoyakensaku} alt="Icon" className="mr-2" />
            </Link>
        </div>
        <div className = "pt-10 pl-10 pr-10">
            <div className="flex items-center">
                <img src={soudan} alt="Icon"  className="w-10 h-10 mr-2"/>
                <p className="text-2xl">モヤモヤ支援先紹介</p>
            </div>
            <p>あなたのモヤモヤの解放に近づくかも、相談機関の情報をまとめました。</p>
            <Link to="/Soudanjoho">
                <img src={toshienshoukai} alt="Icon" className="mr-2" />
            </Link>
        </div>
        </div>
    </div>

    )
}

export default TopPage