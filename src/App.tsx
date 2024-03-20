import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from "./components/Header";
import Keijiban from "./components/Keijiban"
import Tsukaikata from "./components/Tsukaikata"
import Soudanjoho from "./components/Soudanjoho"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path = "/" element = { <Keijiban/>} />
        <Route path = "/tsukaikata" element = { <Tsukaikata/> }/>
        <Route path = "/soudanjoho" element = { <Soudanjoho/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
