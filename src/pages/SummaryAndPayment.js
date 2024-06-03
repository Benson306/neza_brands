import React, { useContext, useEffect, useState } from 'react'
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
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input, HelperText, Label, Select, Textarea, Button, Card, CardBody } from '@windmill/react-ui'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import InfoCard from '../components/Cards/InfoCard'
import { AuthContext } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SummaryAndPayment() {
  const { state } = useLocation();
  const data = state;
  const [total, setTotal] = useState(0);

  const { uid, userId , email } = useContext(AuthContext);
  const [creditBalance, setCreditBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [ currency, setCurrency ] = useState("ksh");

  const navigate = useNavigate();
  
  useEffect(()=>{
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

    const calculatedTotal = data.reduce((acc, item) => acc + Number(item.amount), 0);
    setTotal(calculatedTotal)

  },[data]);

  const handlePayByWallet = () => {
    if(walletBalance < total){
      toast.error('Insufficient Wallet Balance', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        return;
    }

    if(data.length < 2){
      fetch(`${process.env.REACT_APP_API_URL}/make_single_payout`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          initiatedBy: userId,
          sender_id : uid,
          sender_email : email,
          recepient_name : data[0].recepientName,
          recepient_email : data[0].email,
          amount : data[0].amount,
          country : data[0].country,
          description: data[0].description,
          currency: data[0].currency,
          source : "wallet",
        })
      })
      .then(response => {
        if(response.ok){
          toast.success('Success', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setTimeout(()=>{
              navigate("/app/payouts");
            }, 700)
        }else{
          toast.error('Failed. Server Error', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
      })
      .catch(err => {
        toast.error('Server Error', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
    }else if(data.length > 1){
      fetch(`${process.env.REACT_APP_API_URL}/make_multiple_payout`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          initiatedBy: userId,
          sender_id : uid,
          sender_email : email,
          data: data,
          source : "wallet"
        })
      })
      .then(response => {
        if(response.ok){
          toast.success('Success', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setTimeout(()=>{
              navigate("/app/payouts");
            }, 700)
        }else{
          toast.error('Failed. Server Error', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
      })
      .catch(err => {
        toast.error('Server Error', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
    }
    
  }

  const handlePayByCredit = () => {
    if(creditBalance < total){
      toast.error('Insufficient Credit Balance', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        return;
    }

    if(data.length < 2){
      fetch(`${process.env.REACT_APP_API_URL}/make_single_payout`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          sender_id : uid,
          sender_email : email,
          recepient_name : data[0].recepientName,
          recepient_email : data[0].email,
          amount : data[0].amount,
          country : data[0].country,
          description: data[0].description,
          currency: data[0].currency,
          source : "credit",
        })
      })
      .then(response => {
        if(response.ok){
          toast.success('Success', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setTimeout(()=>{
              navigate("/app/payouts");
              window.location.reload();
            }, 700)
        }else{
          toast.error('Failed. Server Error', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
      })
      .catch(err => {
        toast.error('Server Error', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
    }else if(data.length > 1){
      fetch(`${process.env.REACT_APP_API_URL}/make_multiple_payout`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          sender_id : uid,
          sender_email : email,
          data: data,
          source : "credit",
        })
      })
      .then(response => {
        if(response.ok){
          toast.success('Success', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setTimeout(()=>{
              navigate("/app/payouts");
              window.location.reload();
            }, 700)
        }else{
          toast.error('Failed. Server Error', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
      })
      .catch(err => {
        toast.error('Server Error', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
    }
  }

  const handleCombineBothPaymentMethods = () =>{

  }

  return (
    <div>
    <ToastContainer />

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
                handlePayByWallet();
              }}
              >
                  <div className='font-semibold'>Wallet</div>
                  <div className='text-xs text-white'>
                    <span>Wallet Bal: </span>
                    <span className='capitalize'>{currency}. {walletBalance}</span>
                  </div>
              </button>

              <button 
                className='w-5/6 lg:w-1/2 border border-gray-300 rounded px-2 h-20 text-black dark:text-white mt-4 lg:mt-0'
                onClick={e => {
                  e.preventDefault();
                  handlePayByCredit();
                }}
              >
                 <div className='font-semibold'>Credits</div>
                  <div className='text-xs text-black dark:text-white'>
                    <span>Credits Bal: </span>
                    <span className='capitalize'>{currency}. {creditBalance}</span>
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