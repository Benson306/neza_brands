import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Users() {
  return (
    <div>
        <ToastContainer />

        <PageTitle>Manage users</PageTitle>
    </div>
  )
}

export default Users