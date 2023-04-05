import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { ExchangeCard } from './Exchanges';
import { server } from '../App';
import '../styles/ExchangeCard.css'

// import { Container } from '@chakra-ui/react';

const Coins = () => {
  const [coin, setCoin] = useState([])
  const [Loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)
  const [page, setPage] = useState(1)
  const [currency, setCurrecy] = useState('inr')
  
const currency_symbol = currency==="inr"? "₹" : currency==="eur"? "€" : "$"
  
const btn = new Array(8).fill(1)

const pageChange = (pageNumber)=>{
  setLoading(true)
  setPage(pageNumber)
}


  useEffect(()=>{
    const fetchCoins = async ()=>{
  try {
      const {data} =await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`) 
     setCoin(data)
      console.log(data)
      setLoading(false)
      } catch (error) {
        setLoading(false)
        setErrors(true)
      }
      
  }    
    fetchCoins();
  },[currency, page])
  if(errors){
    return <ErrorComponent msg ={"Error Happeed" }/>
  }
  else {
  return (
 <div > {Loading?<Loader />:
    <div>
        <div className='radioButtonContaier'>
          <form  className="radioButton"   >
           INR <input type="radio" name='currencytype' onChange={(e)=>{setCurrecy(e.target.value)}} value={"inr"} defaultChecked />
           EUR <input type="radio" name='currencytype' onChange={(e)=>{setCurrecy(e.target.value)}}  value={"eur"} />
           USD <input type="radio" name='currencytype' onChange={(e)=>{setCurrecy(e.target.value)}}  value={"usd"} />
          </form>
        </div>  
        <div className='exchangeCardContainer'>
          
            {coin.map((i) => (
              
                <CoinCard 
                id3 = {i.id}
                key = {i.id } 
                name = {i.name}
                image = {i.image}
                symbol = {i.symbol}
                price  = {i.current_price}
                currecy_symbol={currency_symbol}
                />
                
              
            ))}
            
        </div>
        <div className='pageChangebutton'> 
              {btn.map((item, index)=>(
            <button key={index} onClick={()=>pageChange(index + 1)} >{index + 1}</button>
              ))}
        </div>
      </div>
      }</div> 
      )
    }
}

const CoinCard =({id3,  name, image,  symbol, price, currecy_symbol= "₹"})=>{
  return (
  <>
      
        <Link className='exchangeCard' to={`/Coin/${id3}`} >
        <div>{name}</div>
        <img  src={image} alt='imagery' />
        <div>{symbol}</div>
        <div>{price ? ` ${currecy_symbol} ${price}` : "NA" }</div>
        </Link>

    
  </>
  )
}

export default Coins 
