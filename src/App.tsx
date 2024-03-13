import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Keijiban from "./components/Keijiban"
import Tsukaikata from "./components/Tsukaikata"
import Taikendan from "./components/Taikendan"
import Soudanjoho from "./components/Soudanjoho"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <Keijiban/>} />
        <Route path = "/tsukaikata" element = { <Tsukaikata/> }/>
        <Route path = "/taikendan" element = { <Taikendan/> }/>
        <Route path = "/soudanjoho" element = { <Soudanjoho/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
