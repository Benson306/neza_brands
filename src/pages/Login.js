import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button, WindmillContext } from '@windmill/react-ui'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { addUid, addUserId, addRole, addEmail, addFirstTimePassord } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = () => {

    if(email == null || password == null){
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

    fetch(`${process.env.REACT_APP_API_URL}/brand_login`,{
      method: 'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
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

          response.json().then((res)=>{
            addEmail(res.email);
            addRole(res.role);
            addUserId(res._id);
            addUid(res.brand_id);
            addFirstTimePassord(res.firstTimePassword)

            if(res.firstTimePassword){
              navigate('/change_password');
            }else{
              navigate('/app/dashboard');
            }
          });
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
  const { mode } = useContext(WindmillContext)

  const backgroundImageStyle = {
    backgroundImage: 'url(/bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem',
    width: '100%',
  };

  return (
    <div  className='flex items-center min-h-screen p-6 bg-cover bg-no-repeat w-full'
    style={backgroundImageStyle}>
      <ToastContainer />
      <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden">
      <div className='flex justify-center mb-10'>
            { mode === 'dark' ? (
              <img src={require("../assets/img/LogoWhite.png")} width={100} />
            ) : (
              <img src={require("../assets/img/LogoBlack.png")} width={100} />
            )}
        </div>
        <div className='bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        <div className="flex justify-center overflow-y-auto md:flex-row">
          {/* <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div> */}
          <main className="flex items-center justify-center p-6 sm:p-12 w-full">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input onChange={e =>  setEmail(e.target.value)} className="mt-1" type="email" placeholder="john@doe.com" />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input onChange={e =>  setPassword(e.target.value)} className="mt-1" type="password" placeholder="***************" />
              </Label>

              <Button class="bg-green-500 p-2 rounded-lg text-sm text-white w-full mt-4 text-center" block
              onClick={() => handleSubmit()}
              >
                Log in
              </Button>

              <hr className="my-6" />

              <p >
                <Link
                  className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </main>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login
