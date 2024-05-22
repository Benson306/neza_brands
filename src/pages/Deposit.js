import React, { useContext, useEffect, useState } from 'react'
import { Input, HelperText, Label, Select, Textarea, Button, Card, CardBody } from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { OutlinePersonIcon, PeopleIcon, MailIcon, FormsIcon, MoneyIcon, CountryIcon } from '../icons'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Pagination,
    Modal, ModalHeader, ModalBody, ModalFooter
  } from '@windmill/react-ui';

function Deposit() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(null);
  const [currency, setCurrency] = useState("ksh");
  const { uid } = useContext(AuthContext);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(()=>{
    const searchParams = new URLSearchParams(window.location.search);

    const deposit_id = searchParams.get('deposit_id');

    if (deposit_id !== null) {
      fetch(`${process.env.REACT_APP_API_URL}/cancel_transaction/${deposit_id}`)
      .catch((err)=>{
        console.log(err)
      })
    }
  },[])

  const handleSubmit = () =>{
    setSubmitLoading(true);
    const amountRegex = /^\d+$/;

    if(!amountRegex.test(amount) || amount < 5){
      toast.error('Invalid amount', {
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

    fetch(`${process.env.REACT_APP_API_URL}/charge`,{
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            amount: Number(amount),
            brand_id: uid
        })
    })
    .then(response =>{
        if(response.ok){
            response.json().then((res)=>{
                setSubmitLoading(false);
                window.open(res, "_blank");
                closeModal();
                window.location.reload();
            })
        }else{
            setSubmitLoading(false);
            toast.error('Initialization Failed', {
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
        setSubmitLoading(false);
        console.log(err);
        toast.error('Initialization Failed', {
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/deposits/${uid}`)
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
  const resultsPerPage = 10;
  const totalResults = data.length;

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(data.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage).reverse())
  }, [pageTable1, data])

  const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

  return (
    <div>
      <ToastContainer />

        <PageTitle>Deposits</PageTitle>

        { !loading && data.length > 0 && <div className='capitalize flex my-3 mr-20 text-xs text-gray-600 dark:text-gray-400'>
        Total Deposits: <span className='font-semibold ml-2'>{data[0].currency}. {total}</span>
      </div> }
      { !loading && data.length < 1 && <div className='capitalize flex my-3 mr-20 text-xs text-gray-600 dark:text-gray-400'>
        You Have No Deposits
      </div> }

      <div className='flex justify-end mr-5 lg:mr-20 mb-5'>
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white" onClick={openModal}>Add funds  +</Button>
        </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell >Amount</TableCell>
              <TableCell >Status</TableCell>
              <TableCell>Date/Time</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
              !loading && !error && dataTable1.slice().map( (item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-xs capitalize">{item.currency} {item.amount}</span>
                </TableCell>
                <TableCell>
                  {
                    item.status == "charge.success" ? <span className="text-xs bg-green-600 text-white rounded-md p-1">{item.status.split(".")[1]}</span>
                    :
                    item.status == "charge.cancelled" ? <span className="text-xs bg-red-600 text-white rounded-md p-1">{item.status.split(".")[1]}</span>
                    :
                    <span className="text-xs bg-gray-600 text-white rounded-md p-1">{item.status.split(".")[1]}</span>
                  }
                  
                </TableCell>
                <TableCell>
                  <span className="text-xs"><b>{item.time} UTC</b> <br/> {item.date}</span>
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
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>


      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="text-center">Add Funds</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter class="justify-center">
            <div className='flex justify-center mt-4 mb-1'>
                { submitLoading && <div className='border border-blue-600 p-2 w-full rounded-lg text-center text-blue-800 text-sm'>
                    Loading ....
                    </div> }
                { !submitLoading && <Button onClick={
                ()=>{
                    handleSubmit();
                }
                } class="bg-blue-600 p-2 rounded-lg text-sm text-white w-full">
                    ADD FUNDS
                </Button> }
            </div>
        </ModalFooter>
      </Modal>

      
      </div>
  )
}

export default Deposit