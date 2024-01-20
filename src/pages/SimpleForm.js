import React from 'react'
import { Input, HelperText, Label, Select, Textarea, Button, Card, CardBody } from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { OutlinePersonIcon, PeopleIcon, MailIcon, FormsIcon, MoneyIcon, CountryIcon } from '../icons'

function SimpleForm() {
  return (
    <div>
      <div className='text-center'>
        <PageTitle>Create Single Payout</PageTitle>
      </div>
      

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full lg:w-1/2 lg:mx-auto">
        <Label>
            <span>Recepient Name</span>
            {/* <!-- focus-within sets the color for the icon when input is focused --> */}
            <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
              <input
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                placeholder="Jane Doe"
              />
              <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                <OutlinePersonIcon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
        </Label>

        <Label className="mt-4">
            <span>Country</span>
            {/* <!-- focus-within sets the color for the icon when input is focused --> */}
            <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
              
              <Select 
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"

              >
              <option>Kenya</option>
              <option>Uganda</option>
              <option>Tanzania</option>
              <option>Nigeria</option>
            </Select>
              <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                <CountryIcon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
        </Label>

        <Label className="mt-4">
            <span>Email</span>
            {/* <!-- focus-within sets the color for the icon when input is focused --> */}
            <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
              <input
                type='text'
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                placeholder="janedoe@gmail.com"
              />
              <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                <MailIcon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
        </Label>

        <Label className="mt-4">
            <span>Description</span>
            {/* <!-- focus-within sets the color for the icon when input is focused --> */}
            <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
              <input
                type='text'
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                placeholder="Payment for ..."
              />
              <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                <FormsIcon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
        </Label>

        <div className='flex'>
          <Label className="mt-4">
              <span>Amount </span>
              {/* <!-- focus-within sets the color for the icon when input is focused --> */}
              <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
                <input
                  type='number'
                  className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                  placeholder="200"
                />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                  <MoneyIcon className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
          </Label>

          <Label className="mt-4">
            <span>Currency</span>
            <Select className="mt-1">
              <option>Ksh</option>
              <option>Ush</option>
              <option>Tsh</option>
              <option>Naira</option>
            </Select>
          </Label>

        </div>

        <Card className="mt-4">
          <CardBody>
            <div className='flex justify-between'>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">TOTAL KES</p>
            <p className="text-gray-600 dark:text-gray-400">
              450
            </p>
            </div>
          </CardBody>
        </Card>

        <div className='flex justify-center mt-4 mb-1'>
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white w-full">CREATE PAYOUT</Button>
        </div>

      </div>
    </div>
  )
}

export default SimpleForm