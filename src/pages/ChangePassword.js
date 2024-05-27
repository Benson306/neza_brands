import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext'

function ChangePassword() {
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [password, setPassword] = useState(null);

  const { uid, logout } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = () => {

    if(confirmPassword == null || password == null){
      toast.error('All Fields Are Required', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      return
    }

    fetch(`${process.env.REACT_APP_API_URL}/change_brand_password`,{
      method: 'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        _id: uid,
        password
      })
    })
    .then( response => {
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

        navigate('/app/dashboard');
      }else{
        toast.error('Check your credentials', {
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
      toast.error('Error', {
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
  
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="w-1/3 mx-auto bg-white rounded-lg shadow-xl dark:bg-gray-800">
          
          <main className="flex items-center justify-center p-6 sm:p-12">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Change Password</h1>
              <Label>
                <span>Password</span>
                <Input onChange={e =>  setPassword(e.target.value)} className="mt-1" type="password" placeholder="*********" />
              </Label>

              <Label className="mt-4">
                <span>Confirm Password</span>
                <Input onChange={e =>  setConfirmPassword(e.target.value)} className="mt-1" type="password" placeholder="*********" />
              </Label>

              <Button class="bg-green-600 p-2 rounded-lg text-sm text-white w-full mt-4 text-center" block
              onClick={() => handleSubmit()}
              >
                Change Password
              </Button>

              <hr className="my-6" />

              <p >
                <Link
                  className="text-sm font-medium text-green-600 dark:text-blue-400 hover:underline"
                  onClick={()=>{
                    logout();
                  }}
                >
                  Sign Out?
                </Link>
              </p>
            </div>
          </main>
      </div>
    </div>
  )
}

export default ChangePassword
