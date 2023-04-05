import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className="heading">
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/Coins'>Coins</Link>
            <Link to="/Exchanges">Exchange</Link>

            {/* <Link to="/CoinDetails"></Link> */}
        </nav>
    </div>
  )
}

export default Header