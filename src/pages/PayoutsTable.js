import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
} from '@windmill/react-ui'

function PayoutsTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);

  const { uid } = useContext(AuthContext);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/payouts/${uid}`)
    .then( response => response.json())
    .then(response => {
      setData(response);
      setLoading(false);
    })
    .catch(err => {
      setError(true);
      setLoading(false);
    })
  },[])

  useEffect(()=>{
    const calculatedTotal = data.reduce((acc, item) => acc + Number(item.amount), 0);
    setTotal(calculatedTotal)
  },[data])

  return (
    <div className='w-full mx-auto'>
      { !loading && <div className='capitalize flex my-3 mr-20 text-xs text-gray-600 dark:text-gray-400'>
        Total Payout: <span className='font-semibold ml-2'>{data[0].currency}. {total}</span>
      </div> }
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell >Name</TableCell>
              <TableCell >Description</TableCell>
              <TableCell >Source</TableCell>
              <TableCell >Country</TableCell>
              <TableCell >Amount</TableCell>
              <TableCell >Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
              !loading && !error && data.reverse().map( (item, i) => (
              <TableRow key={i}>
                <TableCell>
                      <p className="font-semibold">{item.recepient_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.recepient_email}</p>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.description}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.source}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{item.country}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{item.currency} {item.amount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{item.date}</span>
                </TableCell>
              </TableRow>
              ) )
            }
            {
              loading && 
              <TableCell>
                <span>Loading.......</span>
              </TableCell>
            }
          </TableBody>
        </Table>
      </TableContainer>

    
    </div>
  )
}

export default PayoutsTable