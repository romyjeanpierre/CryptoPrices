import {useState, useEffect} from "react";
import {useParams} from "react-router-dom"


export default function Price (props) {
  const [coin, setCoin] = useState("null");

  
    
    const params = useParams()
    //console.log(params); 
    const {symbol} = params
    // Using the other two variables to create our URL
    const url = `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${process.env.REACT_APP_COINAPI_KEY}`;
  


    const getCoin = async () => {
      try{
        const response = await fetch(url);
        const data = await response.json();
        setCoin(data);
      } catch(e){
        console.error('ERROR FETCHING DATA', e);
      }
    };
  
    // useEffect to run getCoin when component mounts
    //runs as soon as the component mounts
    useEffect(() => {
      getCoin();
    }, []);
  
    // loaded function for when data is fetched
    //show the fetched data
    const loaded = () => {
      return (
        <div>
          <h1>
            {coin.asset_id_base}/{coin.asset_id_quote}
          </h1>
          <h2>{coin.rate}</h2>
        </div>
      );
    };
  
    // Function for when data doesn't exist
    const loading = () =>  <h1>Loading...</h1>;
  
    // if coin has data, run the loaded function, otherwise, run loading
    return coin && coin.rate ? loaded() : loading();
  };