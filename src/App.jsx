import WordCard from './components/WordCard.jsx'
import SearchBar from './components/SearchBar.jsx'
import Favorites from './components/Favorites.jsx'
import Header from './components/Header.jsx'

export default function App(){

  return(
        <>
          <Header/>
          <WordCard/>
          <SearchBar/>
          <Favorites/>
        </>
        )
}