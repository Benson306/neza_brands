import React, { useEffect, useState } from 'react'
import SectionTitle from '../components/Typography/SectionTitle'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
  } from '@windmill/react-ui'
import { Link, useLocation } from 'react-router-dom'
import { Input, HelperText, Label, Select, Textarea, Button, Card, CardBody } from '@windmill/react-ui'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import InfoCard from '../components/Cards/InfoCard'

function SummaryAndPayment() {
  const { state } = useLocation();
  const data = state;
  const [total, setTotal] = useState(0);
  
  useEffect(()=>{
    const calculatedTotal = data.reduce((acc, item) => acc + Number(item.amount), 0);
    setTotal(calculatedTotal)
  },[data]);

  return (
    <div>

    <div className='lg:text-center mt-3'>
        <SectionTitle>Summary</SectionTitle>
    </div>
    
    <div className='w-full lg:w-2/3 mx-auto'>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell >Name</TableCell>
              <TableCell >Description</TableCell>
              <TableCell >Country</TableCell>
              <TableCell >Amount</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
              data.map( (item, i) => (
              <TableRow key={i}>
                <TableCell>
                      <p className="font-semibold">{item.recepientName}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.email}</p>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.description}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{item.country}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{item.currency} {item.amount}</span>
                </TableCell>
              </TableRow>
              ) )
            }
          </TableBody>
        </Table>
        <TableFooter className="flex justify-between pr-16">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">{data[0].currency} {total}</p>
        </TableFooter>
      </TableContainer>

      <Card className="mt-4 w-4/6 lg:w-full lg:mx-0">
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Payment</p>

            <p className='lg:text-center text-gray-600 dark:text-gray-400'>Make payment via:</p>

            <div className='block lg:flex w-full gap-2 mt-4'>

              <button 
              className='w-5/6 lg:w-1/2 bg-blue-600 rounded p-2 h-20 text-white text-center'
              onClick={e => {
                e.preventDefault();
              }}
              >
                  <div className='font-semibold'>Wallet</div>
                  <div className='text-xs text-white'>
                    <span>Wallet Bal: </span>
                    <span>Ksh. 4200</span>
                  </div>
              </button>

              <button 
                className='w-5/6 lg:w-1/2 border border-gray-300 rounded px-2 h-20 text-black dark:text-white mt-4 lg:mt-0'
                onClick={e => {
                  e.preventDefault();
                }}
              >
                 <div className='font-semibold'>Credits</div>
                  <div className='text-xs text-black dark:text-white'>
                    <span>Credits Bal: </span>
                    <span>Ksh. 200</span>
                  </div>
              </button>

            </div>
          </CardBody>
        </Card>
    </div>
    </div>
  )
}

export default SummaryAndPayment