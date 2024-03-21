import { Link } from "react-router-dom";
import mokumoya from '../Images/mokumoya.svg';

const Header = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 w-full">        
      <Link to="/"><img src={mokumoya} alt="Icon" className="w-24 h-24"/></Link>
      <nav className="flex items-center text-right"> {/* w-fullとmax-w-screen-xlを追加 */}
        <Link to="/Toukou" className="mr-6 ">モヤモヤ投稿</Link>
        <Link to="/Moyakensaku" className="mr-6">モヤモヤ検索</Link>
        <Link to="/Soudanjoho" className="">支援先紹介</Link>    
      </nav>
    </div>
  );
}

export default Header;