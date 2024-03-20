import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from "./components/Header";
import Keijiban from "./components/Keijiban"

import Soudanjoho from "./components/Soudanjoho"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path = "/" element = { <Keijiban/>} />
        <Route path = "/soudanjoho" element = { <Soudanjoho/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
