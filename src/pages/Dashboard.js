import React, { useState, useEffect, useContext } from 'react'

import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, WalletIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'
import { AuthContext } from '../context/AuthContext'
import TopFivePayouts from './TopFivePayouts'
import Graphs from './Graphs'

function Dashboard() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [payouts, setPayouts] = useState([]);
  const [totalApprovedPayouts, setTotalApprovedPayouts] = useState(0);
  const [totalPendingPayouts, setTotalPendingPayouts] = useState(0);

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  const { uid } = useContext(AuthContext);

  const [creditBalance, setCreditBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [ currency, setCurrency ] = useState("ksh");

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/balance/${uid}`)
    .then(response =>  response.json())
    .then(response => {
      setCreditBalance(response.credit_balance);
      setWalletBalance(response.wallet_balance);

      if(response.country == "kenya"){
        setCurrency("ksh");
      }else if(response.country == "uganda"){
        setCurrency("ush");
      }else if(response.country == "sa"){
        setCurrency("rand");
      }else if(response.country == "nigeria"){
        setCurrency("naira")
      }
    })
    .catch(err => console.log(err))

    fetch(`${process.env.REACT_APP_API_URL}/all_payouts/${uid}`)
    .then( response => response.json())
    .then(response => {
      setPayouts(response);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(()=>{
    const calculatedTotal = payouts.filter(item => item.status == 1).reduce((acc, item) => acc + Number(item.amount), 0);
    setTotalApprovedPayouts(calculatedTotal)
  }, [payouts])

  useEffect(()=>{
    const calculatedTotal = payouts.filter(item => item.status == 0).reduce((acc, item) => acc + Number(item.amount), 0);
    setTotalPendingPayouts(calculatedTotal)
  }, [payouts])

  return (
    <>
      {/* <PageTitle>Dashboard</PageTitle> */}

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <div className="grid gap-1 mb-8 md:grid-cols-2 xl:grid-cols-4 mt-10">
        <InfoCard title="Aprroved payouts" value={`${currency} ${totalApprovedPayouts}`}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending payouts" value={`${currency} ${totalPendingPayouts}`}>
          <RoundIcon
            icon={WalletIcon}
            iconColorClass="text-purple-500 dark:text-purple-100"
            bgColorClass="bg-purple-100 dark:bg-purple-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Wallet balance" value={`${currency}. ${walletBalance}`}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Credit Balance" value={`${currency} ${creditBalance}`}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-600 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-600"
            className="mr-4"
          />
        </InfoCard>

        {/* <InfoCard title="Total Brands" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard> */}
      </div>

      {/* <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div> */}

      <Graphs />

      <TopFivePayouts />
    </>
  )
}

export default Dashboard
