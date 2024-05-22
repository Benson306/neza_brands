import React, { useContext } from 'react'
import {
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter,
    Avatar,
    Badge,
    Pagination,
} from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { AuthContext } from '../context/AuthContext';

function Settings() {
  const { email } = useContext(AuthContext);
  return (
    <div>
        <PageTitle>Account settings</PageTitle>
        <div className='mx-5'>
          <SectionTitle>Email address</SectionTitle>
          <div className='block lg:flex gap-32 text-sm'>
              <p className='dark:text-gray-500'>Your email is <b>{email}</b></p>
              <button className='underline text-blue-600 hover:text-blue-500'>Change</button>
          </div>

          <div className='mt-10'>
            <SectionTitle>Password</SectionTitle>
            <div className='block lg:flex gap-16 text-sm'>
              <div className='mb-2 lg:mb-0'>
                  <div className='mb-2 dark:text-gray-500 text-sm'>Current password</div>
                  <input type="password" className='p-2 border border-gray-400 rounded-lg dark:text-white bg-transparent' />
              </div>

              <div>
                  <div className='mb-2 dark:text-gray-500 text-sm'>New password</div>
                  <input type="password" className='p-2 border border-gray-400 rounded-lg dark:text-white bg-transparent' />
              </div>
            </div>
            <div className='dark:text-gray-500 text-xs mt-5 block lg:flex gap-2'>
              <div>Can't remember your current password?</div>
              <button className='underline text-blue-600 hover:text-blue-500 mt-2 lg:mt-0'>Reset your password</button>
            </div>
            <button className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg text-xs mt-4'>
              Save password
            </button>
          </div>

          <div className='mt-10 mb-10'>
            <SectionTitle>Delete account</SectionTitle>
            <p className='dark:text-gray-500 text-sm'>Would you like to delete your account?</p>
            <p className='dark:text-gray-500 text-xs'>Deleting your account will remove all the content associated with it.</p>
            <button className='underline text-red-500 hover:text-red-600 rounded-lg text-sm mt-4'>
              I want to delete my account
            </button>
          </div>
        </div>
        
    </div>
  )
}

export default Settings