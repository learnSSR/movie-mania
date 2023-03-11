
import './App.css';
import Header from './component/header/header';
import SimpleBottomNavigation from './component/MainNav';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Trends from './Pages/Trends';
import Movies from './Pages/Movies';
import Series from './Pages/Series';
import Search from './Pages/Search';

function App() {
  return (<>
        <BrowserRouter>
        <Header />
          <div className="app">
            <Container>
              <Routes>
                <Route path='/' element={<Trends />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/series' element={<Series />} />
                <Route path='/search' element={<Search />} />
              </Routes>
            </Container>
          </div>
          <SimpleBottomNavigation />
        </BrowserRouter>
    </>
  );
}

export default App;
