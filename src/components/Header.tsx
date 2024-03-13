import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
        <nav>
            <Link to="/">モヤッと</Link>
            <Link to="/Tsukaikata">使い方</Link>
            <Link to="/">掲示板</Link>
            <Link to="/Taikendan">体験談</Link>
            <Link to="/Soudanjoho">相談情報</Link>        
        </nav>
    </div>
  )
}

export default Header