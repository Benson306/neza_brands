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
  Pagination
} from '@windmill/react-ui'
import Payouts from './Payouts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PendingPayoutsTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);

  const { role, uid, userId } = useContext(AuthContext);

  useEffect(()=>{
    let adminConnectionString = `${process.env.REACT_APP_API_URL}/all_pending_payouts/${uid}`;
    let regularConnectionString = `${process.env.REACT_APP_API_URL}/pending_payouts/${userId}`;

    fetch(role == 'admin' ? adminConnectionString : regularConnectionString)
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

  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])

  // pagination setup
  const resultsPerPage = 5
  const totalResults = data.length;

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(data.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }, [pageTable1, data])

  const handleApprovePayout = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/approve_payout`,{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        payoutId: id,
        userId: userId
      })
    })
    .then(res => {
      if(res.ok){
        toast.success('Payment has been disbursed', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          setTimeout(()=>{
            window.location.reload();
          }, 1000)
      }else{
        res.json().then( result => {
          toast.error(result, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        })
        
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const handleRejectPayout = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/reject_payout`,{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        payoutId: id,
        userId: userId
      })
    })
    .then(res => {
      if(res.ok){
        toast.success('Payout has been suspended.', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          setTimeout(()=>{
            window.location.reload();
          }, 1000)
      }else{
        res.json().then( result => {
          toast.error(result, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        })
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div>
      <ToastContainer />
    <Payouts title="Pending payouts"/>
    <div className='w-full mx-auto'>
      { !loading && data.length > 0 && <div className='capitalize flex my-3 mr-20 text-xs text-gray-600 dark:text-gray-400'>
        Total Payout: <span className='font-semibold ml-2'>{data[0].currency}. {total}</span>
      </div> }
      { !loading && data.length < 1 && <div className='capitalize flex my-3 mr-20 text-xs text-gray-600 dark:text-gray-400'>
        You Have No Payouts
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
              { role == 'admin' && <TableCell>Actions</TableCell>}
            </tr>
          </TableHeader>
          <TableBody>
            {
              !loading && !error && dataTable1.slice().reverse().map( (item, i) => (
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
                { role == 'admin' && <TableCell>
                  <div className='flex gap-4'>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        handleApprovePayout(item._id);
                      }}
                      className='bg-blue-600 hover:bg-blue-400 rounded p-1 text-xs text-white'>Approve</button>
                    <button 
                      onClick={e => {
                        e.preventDefault();
                        handleRejectPayout(item._id);
                      }}
                      className='border border-red-600 p-1 text-xs rounded text-red-600 hover:bg-red-600 hover:text-white'>Reject</button>
                  </div>
                </TableCell> }
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
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </div>
    </div>
  )
}

export default PendingPayoutsTable