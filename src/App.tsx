import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import TopPage from "./components/TopPage"
import Keijiban from "./components/Keijiban"
import Soudanjoho from "./components/Soudanjoho"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <TopPage/>} />
        <Route path = "/Keijiban" element = { <Keijiban/>} />

        <Route path = "/soudanjoho" element = { <Soudanjoho/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
