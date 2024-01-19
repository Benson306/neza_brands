import React from 'react'
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
    Button
} from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import PayoutsTable from './PayoutsTable'

function Payouts() {
  return (
    <div>
        <PageTitle>Payouts</PageTitle>

        <div className='flex justify-end mr-20 mb-10'>
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white">New Payout +</Button>
        </div>

        <PayoutsTable />
        
    </div>
  )
}

export default Payouts