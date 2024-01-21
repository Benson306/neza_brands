import React, { useState } from 'react'
import { Input, HelperText, Label, Select, Textarea, Button, Card, CardBody } from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { OutlinePersonIcon, PeopleIcon, MailIcon, FormsIcon, MoneyIcon, CountryIcon } from '../icons'
import { useNavigate } from 'react-router-dom'

function FileUpload() {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      // Check if the file is an Excel file (xlsx or xls)
      if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setSelectedFile(file);
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
      } else {
      setSelectedFile(null);
      alert('Please upload a valid Excel file (XLSX or XLS)');
      }
  };

  const handleDeleteFile = () => {
      setSelectedFile(null);
  };


  const navigate = useNavigate();

  return (
    <div>
      <div className='text-center'>
        <PageTitle>Make Multiple Payouts</PageTitle>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full lg:w-1/2 lg:mx-auto">
          <p className="text-gray-600 dark:text-gray-400">
            When you have many payouts to make.
          </p>

          <div className='flex justify-between text-blue-800 dark:text-blue-500 font-extrabold mt-3'>
            <span>Choose File</span>
            <a href="" className='hover:text-blue-600 hover:underline'>Download template</a>
          </div>

        <div className="flex items-center justify-center w-full mt-2" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
          {selectedFile ? (
            <div className="flex gap-4 lg:gap-10 mt-5">
                <div className=''>
                    <img src={require('../icons/excel.png')} alt="Excel Logo" className="w-32 h-32 mr-2" />
                    <div className="text-sm mr-2 text-center mt-5">{selectedFile.name}</div>
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

        <p className="text-gray-600 dark:text-gray-400 mt-4">We support excel (.xlsx) and (.xls) file format. The file must have a field containing the recepient's Name, country, recepient's email, description , amount and the currency. You can download a template <a href="#" className='text-blue-800 hover:text-blue-500 dark:text-blue-500 font-bold hover:underline'>here</a>.</p>
      </div>
    </div>
  )
}

export default FileUpload