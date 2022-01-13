import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { HistoricalChart } from './config/api/api'
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import CoinDetail from './modules/CoinDetail';
Chart.register(...registerables);

function CryptoDetailView() {
  const { id } = useParams()
  const [historicalData, setHistoricalData] = useState([])
  const [days, setDays] = useState(90);
  const [loading, setLoading] = useState(true)

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(id, days, 'INR'))
    setHistoricalData(data.prices)
    setLoading(false)
  }
  useEffect(() => {
    fetchHistoricalData()
  }, [days]);//eslint-disable-line react-hooks/exhaustive-deps

  if(loading) {
    return (
      <div className='data-loader'>Loading ...</div>
    )
  }

  return (
    <div className='chart-canvas'>
      <div className='wrapper'>
        <div className='right-panel'>
          <Line 
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in INR`,
                  borderColor: "lightgreen",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
              scales: {
                x: {
                  grid:{display:false}
                },
                y: {
                grid:{display:false}
                }
              }
            }}
          />

          <div className='switch-btns'>
            <button className={days === 90 ? 'active' : null}
              onClick={() => {setDays(90);
              }}
            >3 Months</button>
            <button className={days === 1 ? 'active' : null}
              onClick={() => {setDays(1);
              }}
            >24 hours</button>
          </div>
        </div>
        <div className='left-panel'>
          <CoinDetail />
        </div>
      </div>
    </div>
  )
}

export default CryptoDetailView
