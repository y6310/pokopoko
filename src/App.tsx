import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Posts } from './models';

import TopPage from "./components/TopPage"
import Toukou from "./components/Toukou"
import Moyakensaku from "./components/Moyakensaku"
import Soudanjoho from "./components/Soudanjoho"

function App() {

  // const comments: Posts[] = [
  //   { post_id: 1, user_name: 'User1', post_body: 'Comment 1', tag: [{ tag_id: 1, tag_body: 'Tag1' }], created_at: new Date() },
  //   { post_id: 2, user_name: 'User2', post_body: 'Comment 2', tag: [{ tag_id: 2, tag_body: 'Tag2' }], created_at: new Date() },
  //   // 他のコメント
  // ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <TopPage/>} />
        <Route path = "/Toukou" element = { <Toukou/>} />
        <Route path = "/Moyakensaku" element = { <Moyakensaku/> } />
        <Route path = "/soudanjoho" element = { <Soudanjoho/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
