import React, { useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Button,
    Pagination,
  } from '@windmill/react-ui'

function SummaryAndPayment() {
    const [dataTable, setDateTable] = useState([])
  return (
    <div>
        <div className='text-center mt-3'>
            <SectionTitle>Summary</SectionTitle>
        </div>
    
    <div className='w-full lg:w-2/3 mx-auto'>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr className='flex justify-between'>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow>
                <tr className='flex justify-between'>
                    <TableCell>
                        <p>bnkimtai@gmail.com</p>
                    </TableCell>
                    <TableCell>
                        <p>Ksh. 4500</p>
                    </TableCell>
                </tr>
            </TableRow>
            <TableRow>
                <tr className='flex justify-between'>
                    <TableCell>
                        <p>bnkimtai@gmail.com</p>
                    </TableCell>
                    <TableCell>
                        <p>Ksh. 4500</p>
                    </TableCell>
                </tr>
            </TableRow>
            <TableRow>
                <tr className='flex justify-between'>
                    <TableCell>
                        <p>bnkimtai@gmail.com</p>
                    </TableCell>
                    <TableCell>
                        <p>Ksh. 4500</p>
                    </TableCell>
                </tr>
            </TableRow>
            { dataTable.length > 0 && dataTable.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  )
}

export default SummaryAndPayment