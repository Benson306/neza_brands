import React, { useContext, useEffect, useState } from 'react'

import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import {
  lineOptions,
  lineLegends,
  barLegends,
} from '../utils/demo/chartsData'
import { AuthContext } from '../context/AuthContext'
import { scaleService } from 'chart.js'

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

    const [monthsLoading, setMonthsLoading] = useState(true);
    const [labels, setLabels] = useState([]);
    const [monthlyAmounts, setMonthlyAmounts] = useState([]);

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}/payouts_per_month/${uid}`)
      .then((results)=>{
          if(results.ok){
              results.json().then(result => {
                console.log(result)
                const fetchedLabels = [""];
                const fetchedAmounts = [0];
    
                result.forEach(item => {
                  fetchedLabels.push(item.month);
                  fetchedAmounts.push(item.totalAmount);
                });
    
                setLabels(fetchedLabels);
                setMonthlyAmounts(fetchedAmounts);
                setMonthsLoading(false);
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
      { title: 'Credit', color: 'bg-green-500' },
    ]

    const barOptions = {
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: 'rgb(22 163 74)',
            // borderColor: window.chartColors.red,
            borderWidth: 0,
            barPercentage: 0.5,
            categoryPercentage: 0.4,
            data: monthlyAmounts
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            beginAtZero: true
          }
        }
      },
      legend: {
        display: false,
      },
    }

  return (
    <div className="block lg:flex gap-1 mb-2">

        <div className='mb-1 w-full lg:w-1/2'>
            { !monthsLoading && <ChartCard title="Total payouts per month">
                <Bar {...barOptions} />
                <div className='mb-8'> </div>
            </ChartCard> }
        </div>
        <div className='mb-1 w-full lg:w-1/2'>
            { !loading && <ChartCard title="Source of funds (KES)">
                <Doughnut {...doughnutOptions} />
                <ChartLegend legends={doughnutLegends} />
            </ChartCard> }
        </div>
        
      </div>
  )
}

export default Graphs