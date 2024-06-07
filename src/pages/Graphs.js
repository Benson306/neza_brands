import React, { useContext, useEffect, useState } from 'react'

import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import {
  lineOptions,
  barOptions,
  lineLegends,
  barLegends,
} from '../utils/demo/chartsData'
import { AuthContext } from '../context/AuthContext'

function Graphs() {
    const { uid } = useContext(AuthContext);
    const [ data, setData] = useState({
        wallet: 0,
        credit: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/source_stats/${uid}`)
        .then((results)=>{
            if(results.ok){
                results.json().then(result => {
                    console.log(result)
                    setData(result);
                    setLoading(false);
                })
            }else{
                console.log("Error Fetching data");
            }
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    const doughnutOptions = {
        data: {
          datasets: [
            {
              data: [data.wallet, data.credit],
              /**
               * These colors come from Tailwind CSS palette
               * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
               */
              backgroundColor: ['rgb(37 99 235)', 'rgb(22 163 74)'],
              label: 'Dataset 1',
            },
          ],
          labels: ['Wallet', 'Credit'],
        },
        options: {
          responsive: true,
          cutoutPercentage: 80,
        },
        legend: {
          display: false,
        },
      }

      const doughnutLegends = [
        { title: 'Wallet', color: 'bg-blue-600' },
        { title: 'Credit', color: 'bg-green-600' },
      ]

  return (
    <div className="block lg:flex justify-evenly gap-2 mb-2">
        <div className='mb-2'>
            { !loading && <ChartCard title="Source of funds">
                <Doughnut {...doughnutOptions} />
                <ChartLegend legends={doughnutLegends} />
            </ChartCard> }
        </div>
        
        <div className='mb-2'>
            <ChartCard title="Lines">
                <Line {...lineOptions} />
                <ChartLegend legends={lineLegends} />
            </ChartCard>
        </div>

        <div className='mb-2'>
            <ChartCard title="Bars">
                <Bar {...barOptions} />
                <ChartLegend legends={barLegends} />
            </ChartCard>
        </div>
      </div>
  )
}

export default Graphs