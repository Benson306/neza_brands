import React, { useState } from 'react'
import { Input, HelperText, Label, Select, Textarea, Button, Card, CardBody } from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { OutlinePersonIcon, PeopleIcon, MailIcon, FormsIcon, MoneyIcon, CountryIcon } from '../icons'
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FileUpload() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);
  const [viewProcessBtn, setViewProcessBtn] = useState(false);

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      // Check if the file is an Excel file (xlsx or xls)
      if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setSelectedFile(file);
      setViewProcessBtn(true);
      } else {
      setSelectedFile(null);
      alert('Please upload a valid Excel file (XLSX or XLS)');
      }
  };

  const handleFileDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setSelectedFile(file);
      setViewProcessBtn(true);
      } else {
      setSelectedFile(null);
      alert('Please upload a valid Excel file (XLSX or XLS)');
      }
  };

  const handleDeleteFile = () => {
      setSelectedFile(null);
      setViewProcessBtn(false);
  };


  const navigate = useNavigate();

  const handleFileProcess = () => {
    if (!selectedFile) {
      alert('Please upload a file first.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      // Check if the Excel file has the correct headers
      const expectedHeaders = ['recepientName', 'email', 'country', 'description', 'currency', 'amount'];
      const actualHeaders = rows[0];
      if (!expectedHeaders.every((header, index) => header === actualHeaders[index])) {
        alert('The Excel file does not have the correct headers.');
        return;
      }
  
      // Remove the header row
      rows.shift();
  
      // Validate and filter data
      const validatedData = rows.map(row => {
        const [recepientName, email, country, description, currency, amount] = row;
        if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) return null; // Invalid email
        if (!['nigeria', 'kenya', 'sa', 'uganda'].includes(country.toLowerCase())) return null; // Invalid country
        if (!Number.isInteger(amount)) return null; // Invalid amount
        
        // Create an object for each row
        return {
          recepientName,
          email,
          country,
          description,
          currency,
          amount
        };
      }).filter(Boolean); // Filter out null values (invalid rows)
  
      // Save the validated data
      setData(validatedData);

      if(validatedData.length > 0){
        navigate('/app/summary_payment', { state: validatedData});
      }else{
        toast.error('Excel sheet is empty', {
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
  
      
    };
  
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div>
      <ToastContainer />
      <div className='text-center'>
        <PageTitle>Make Multiple Payouts</PageTitle>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full lg:w-1/2 lg:mx-auto">
          <p className="text-gray-600 dark:text-gray-400">
            When you have many payouts to make.
          </p>

          <div className='flex justify-between text-blue-800 dark:text-blue-500 font-extrabold mt-3'>
            <span>Choose File</span>
            <a href={require("../assets/excel/PAYMENT_EXCEL_TEMPLATE.xlsx")} download className='hover:text-blue-600 hover:underline'>Download template</a>
          </div>

        <div className="flex items-center justify-center w-full mt-2" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
          {selectedFile ? (
            <div className="flex justify-center gap-4 mt-5">
                <div className=''>
                    <img src={require('../icons/excel.png')} alt="Excel Logo" className="w-32 h-32 mx-auto" />
                    <div className="text-xs text-center mt-5 overflow-hidden mx-auto">{selectedFile.name}</div>
                </div>
              
              <button type="button" onClick={handleDeleteFile}  className="w-8 h-8 fill-current bg-red-500 text-white cursor-pointer rounded-full">
                X
              </button>
            </div>
          ) : (
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">XLS, XSLS</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
            </label>
          )}
        </div>

        {
          viewProcessBtn &&
          <div className='flex justify-end mr-2 mt-2'> 
            <button 
            onClick={e => {
              e.preventDefault();
              handleFileProcess();
            }}
            className='bg-blue-600 hover:bg-blue-500 text-white p-2 text-sm rounded-lg'>
                Proceed
            </button>
          </div>
        }

        { !viewProcessBtn && <p className="text-gray-600 dark:text-gray-400 mt-4">We support excel (.xlsx) and (.xls) file format. The file must have fields with title recepient_name, recepient_email, country, description and amount . You can download a template <a href={require("../assets/excel/PAYMENT_EXCEL_TEMPLATE.xlsx")} download className='text-blue-800 hover:text-blue-500 dark:text-blue-500 font-bold hover:underline'>here</a>.</p> }
      </div>
    </div>
  )
}

export default FileUpload