import React, { useState } from 'react'
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button
} from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import PayoutsTable from './PayoutsTable'
import { useNavigate } from 'react-router-dom'

function Payouts() {

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const navigate = useNavigate();

  return (

    <div>
        <PageTitle>Payouts</PageTitle>

        <div className='flex justify-end mr-5 lg:mr-20 mb-10'>
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white" onClick={openModal}>New Payout  +</Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="text-center">Create Payout</ModalHeader>
        <ModalBody className="text-center">
          Select method to create Payout
        </ModalBody>
        <ModalFooter class="justify-center">
            <div className='flex justify-evenly gap-4'>
                <div className="hidden sm:block">
                    <Button class="w-48 bg-blue-600 p-2 rounded-lg text-sm text-white"
                    onClick={()=>{
                        closeModal();
                        navigate('/app/simple_form')
                    }}
                    >Simple Form</Button>
                    <p className='text-xs text-center mt-2 text-gray-500'>For a single payout use this option</p>
                </div>
                <div className="hidden sm:block">
                    <Button layout="outline" className="w-48 border border-gray-500 p-2 rounded-lg text-sm" 
                    onClick={() => {
                        closeModal();
                        navigate('/app/file_upload')
                    }}>
                    File Upload (.xls)
                    </Button>
                    <p className='text-xs text-center mt-2 text-gray-500'>For multiple payouts use this option</p>
                </div>
            </div>
          
          <div className="block w-full sm:hidden mb-4">
          <p className='text-xs text-center mb-1 text-gray-500'>For a single payout use this option</p>
            <Button block size="large" class="w-full border border-gray-500 p-2 rounded-lg text-sm dark:text-white" layout="outline" 
            onClick={() => {
                closeModal();
                navigate('/app/simple_form')
            }}
            >
                Simple Form
            </Button>
          </div>
          <div className="block w-full sm:hidden mt-2">
            <p className='text-xs text-center mb-1 text-gray-500'>For multiple payouts use this option</p>
            <Button size="large" class="w-full bg-blue-600 border border-blue-600 p-2 rounded-lg text-sm text-white"
            onClick={() => {
                closeModal();
                navigate('/app/file_upload')
            }}
            >
                File Upload (.xls)
            </Button>
          </div>
        </ModalFooter>
      </Modal>

        <PayoutsTable />
        
    </div>
  )
}

export default Payouts