import HomePage from './pages/HomePage.jsx'
import FavoritePage from './pages/FavoritePage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'

import Header from './components/Header.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom";
export default function App(){

  return(
    <BrowserRouter>
    <Header />
    <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/favorite" element={<FavoritePage />}/>
        <Route path="/history" element={<HistoryPage />}/>
    </Routes>
  </BrowserRouter>
        )
}