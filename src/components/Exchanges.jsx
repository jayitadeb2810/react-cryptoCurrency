import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { Link } from 'react-router-dom';

// import { Container } from '@chakra-ui/react';

const Exchanges = () => {
  const [xchanges, setExchanges] = useState([])
  const [Loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)
  useEffect(()=>{
    const fetchExchanges = async ()=>{
      try {
        const {data} =await axios.get('https://api.coingecko.com/api/v3/exchanges?per_page=50') 
      setExchanges(data)
      console.log(data)
      setLoading(false)
      } catch (error) {
        setLoading(false)
        setErrors(true)
      }
      
    }
    fetchExchanges();
  },[])
  if(errors){
    return <ErrorComponent msg ={"Error Happeed" }/>
  }
  else {
  return (
 <div > {Loading?<Loader />:
        <div className='exchangeCardContainer'>
          
            {xchanges.map((i) => (
              
                <ExchangeCard key = {i.id } 
                name = {i.name}
                image = {i.image}
                url = {i.url} />
                
              
            ))}

        </div>
      }</div> 
      )
    }
}

export default Exchanges 
 const ExchangeCard =(props)=>(
  
  <>
      
        {/* <Link className='exchangeCard' to={props.url} target={'blank'}> */}
        <a className='exchangeCard' href={props.url} target={'blank'}>
        <div>{props.name}</div>
        <img  src={props.image} alt='imagery' />
        </a>

    
  </>
  
 )