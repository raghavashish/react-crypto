import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
// import CryptoDetailView from './CryptoDetailView';
import './styles/styles.css';
import { CoinList } from '../api/api';
import { priceFormatRegex, readableTime } from '../utils/helper';

function CryptoListView() {
  const [coinData, setCoinData] = useState([])
  const [loading, setLoading] = useState(true)
  let headerData = ['Name', 'Price', '24h%', 'ATH%', 'Last Updated', 'Action']

  const fetchTopCoins = async () => {
    const { data } = await axios.get(CoinList('INR'))
    setCoinData(data)
    setLoading(false)
  }
  
  useEffect(() => {
    fetchTopCoins()
  }, [])

  if(loading) {
    return (
      <div className='data-loader'>Loading ...</div>
    )
  }
  return (
    <>
      <table className='table-container'>
        <thead>
          <tr>
            {
              headerData.map((heading, index) => {
                return <th key={index}>{heading}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            coinData.map((crypto) => {
              return (
                <tr key={crypto.id}>
                  <td><img src={crypto.image} />{crypto.name} <span>({crypto.symbol})</span></td>
                  <td><span>&#8377;</span> {priceFormatRegex(crypto.current_price)}</td>
                  
                  <td className={crypto.price_change_percentage_24h > 0 ? 'safe' : 'danger'}>
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className={crypto.ath_change_percentage > 0 ? 'safe' : 'danger'}>
                    {crypto.ath_change_percentage.toFixed(2)}%
                  </td>
                  <td>
                    {readableTime(crypto.last_updated)}
                  </td>
                  <td>
                    <Link to={`coin/${crypto.id}`}>View</Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default CryptoListView
