import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import {FaAngleDown, FaAngleUp} from 'react-icons/fa'
import axios from 'axios';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { server } from '../App';


const CoinDetails = () => {
  const id3 = useParams();
  const [coinDetail, setCoinDetail] = useState({})
  const [Loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)
  const [currency, setCurrecy] = useState('inr')

  const currency_symbol = currency==="inr"? "₹" : currency==="eur"? "€" : "$"

  useEffect(()=>{
    const fetchCoin = async ()=>{
  try {
      const {data} =await axios.get(`${server}/coins/${id3.id3}`) 
     setCoinDetail(data)
      console.log(data)
      setLoading(false)
      } catch (error) {
        setLoading(false)
        setErrors(true)
      }
      
    }
    fetchCoin();
  },[id3.id3])

  if(errors){
    return <ErrorComponent msg ={"Error Happeed" }/>
  }
  else
  return (
    
    <div>{ 
      Loading? (<Loader />):(
        <div>
          <div className='radioButtonContaier'>
            <form  className="radioButton"   >
              INR <input type="radio" name='currencytype' onChange={(e)=>{setCurrecy(e.target.value)}} value={"inr"} defaultChecked />
              EUR <input type="radio" name='currencytype' onChange={(e)=>{setCurrecy(e.target.value)}}  value={"eur"} />
              USD <input type="radio" name='currencytype' onChange={(e)=>{setCurrecy(e.target.value)}}  value={"usd"} />
            </form>
          </div> 
          <div>
            
            { Date().split("G")[0]}
            
          </div>
          <img src={coinDetail.image.large} alt="coinimage" />
            <div >
            { currency_symbol}{coinDetail.market_data.current_price[currency]}
          </div>
          <div className='pricechange'>
            <div>
            { coinDetail.market_data.price_change_24h_in_currency[currency] >0 ? <FaAngleUp />:<FaAngleDown />}
          </div>
          <div>
          {coinDetail.market_data.price_change_24h_in_currency[currency]}
          </div>
          </div>
        </div>
      )
      }
      </div>

    )
  }


export default CoinDetails