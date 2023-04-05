import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Home from './components/Home';
import Coins from './components/Coins';
import Exchanges from './components/Exchanges';
import CoinDetails from './components/CoinDetails';
import Loader from './components/Loader';
import './styles/Header.css';
import './styles/App.css';
import './styles/ExchangeCard.css'


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Coins' element={<Coins />} />
        
        <Route path='/Exchanges' element={<Exchanges />} />
        <Route path='/Coin/:id3' element={<CoinDetails />} />
        <Route path='/*' element={<div>Page Not Found 404</div> }/>
      </Routes>
    </Router>
  );
}

export default App;
export const server = 'https://api.coingecko.com/api/v3'
