import React, { useEffect, useState } from 'react'
import { Input, HelperText, Label, Select, Textarea, Button, Card, CardBody } from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { OutlinePersonIcon, PeopleIcon, MailIcon, FormsIcon, MoneyIcon, CountryIcon } from '../icons'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SimpleForm() {
  const navigate = useNavigate();

  const [recepientName, setReceiptName] = useState(null);
  const [country, setCountry] = useState("kenya");
  const [email, setEmail] = useState(null);
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);
  const [currency, setCurrency] = useState("ksh");

  const handleSubmit = () =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
      toast.error('Invalid Email', {
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

    let data = {recepientName, country, description, email, amount, currency}

    const newData = [];
    newData.push(data);

    navigate('/app/summary_payment', { state: newData});
  }

  useEffect(()=>{
    if(country == "kenya"){
      setCurrency("ksh");
    }else if(country == "uganda"){
      setCurrency("ush");
    }else if(country == "sa"){
      setCurrency("rand");
    }else if(country == "nigeria"){
      setCurrency("naira")
    }
  }, [country])

  return (
    <div>
      <ToastContainer />
      <div className='text-center'>
        <PageTitle>Create Single Payout</PageTitle>
      </div>
      

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full lg:w-1/2 lg:mx-auto">
        <Label>
            <span>Recepient Name</span>
            {/* <!-- focus-within sets the color for the icon when input is focused --> */}
            <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
              <input
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                placeholder="Jane Doe"
                onChange={e => setReceiptName(e.target.value)}
              />
              <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                <OutlinePersonIcon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
        </Label>

        <Label className="mt-4">
            <span>Country</span>
            {/* <!-- focus-within sets the color for the icon when input is focused --> */}
            <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
              
              <Select 
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                onChange={e => setCountry(e.target.value)}
              >
              <option value="kenya">Kenya</option>
              <option value="uganda">Uganda</option>
              <option value="sa">South Africa</option>
              <option value="nigeria">Nigeria</option>
            </Select>
              <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                <CountryIcon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
        </Label>

        <Label className="mt-4">
            <span>Email</span>
            {/* <!-- focus-within sets the color for the icon when input is focused --> */}
            <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
              <input
                type='email'
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                placeholder="janedoe@gmail.com"
                onChange={e => setEmail(e.target.value)}
              />
              <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                <MailIcon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
        </Label>

        <Label className="mt-4">
            <span>Description</span>
            {/* <!-- focus-within sets the color for the icon when input is focused --> */}
            <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
              <input
                type='text'
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                placeholder="Payment for ..."
                onChange={e => setDescription(e.target.value)}
              />
              <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                <FormsIcon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
        </Label>

        <div className='flex'>
          <Label className="mt-4">
              <span>Amount </span>
              {/* <!-- focus-within sets the color for the icon when input is focused --> */}
              <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
                <input
                  type='number'
                  className="block w-full pl-16 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                  placeholder="200"
                  onChange={e => setAmount(e.target.value)}
                />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                  {/* <MoneyIcon className="w-5 h-5" aria-hidden="true" /> */}
                  <span className='capitalize font-semibold'>{currency}</span>
                </div>
              </div>
          </Label>

        </div>

        <div className='flex justify-center mt-4 mb-1'>
            <Button onClick={
              ()=>{
                handleSubmit();
              }
            } class="bg-blue-600 p-2 rounded-lg text-sm text-white w-full">CREATE PAYOUT</Button>
        </div>

      </div>
    </div>
  )
}

export default SimpleForm