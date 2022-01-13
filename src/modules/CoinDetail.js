import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../api/api'
import { priceFormatRegex } from '../utils/helper';

function CoinDetail() {
  const { id } = useParams()
  const [coinDetail, setCoinDetail] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCoinDetail = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoinDetail(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCoinDetail()
  }, []);//eslint-disable-line react-hooks/exhaustive-deps

  if(loading) {
    return (
      <div className='data-loader' style={{position: 'absolute',fontSize: '20px'}}>Loading ...</div>
    )
  }

  return (
    <>
      <img src={coinDetail && coinDetail.image.large} alt={''} />
      <span>{coinDetail && coinDetail.name}</span>
      <h2>Current Price: &#8377;{coinDetail && priceFormatRegex(coinDetail.market_data.current_price.inr)}</h2>
      <p>{coinDetail && coinDetail.description.en.split(". ")[0]}</p>
    </>
  )
}

export default CoinDetail
