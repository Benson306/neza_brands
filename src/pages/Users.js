import React, { useState, useEffect, useContext } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button, Label, Select
} from '@windmill/react-ui';
import { EditIcon, TrashIcon } from '../icons'

function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [submitLoading, setSubmitLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setEmail(null);
        setFullName(null);
        setJobTitle(null);
        setRole(null);
        setId(null);
        setIsModalOpen(false)
    }

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    function openDeleteModal() {
        setIsDeleteModalOpen(true)
    }

    function closeDeleteModal() {
        setId(null);
        setIsDeleteModalOpen(false)
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    function openEditModal() {
        setIsEditModalOpen(true)
    }

    function closeEditModal() {
        setEmail(null);
        setFullName(null);
        setJobTitle(null);
        setRole(null);
        setId(null);
        setIsEditModalOpen(false)
    }

    const { uid } = useContext(AuthContext);

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}/brand_users/${uid}`)
      .then(res => {
        if(res.ok){
          res.json().then( result =>{
            setLoading(false);
            setData(result);
          });
        }else{
          setLoading(false);
          setError(true);
        }
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      })
    },[])

    // setup pages control for every table
    const [pageTable1, setPageTable1] = useState(1)

    // setup data for every table
    const [dataTable1, setDataTable1] = useState([])

    // pagination setup
    const resultsPerPage = 10;
    const totalResults = data.length;

    // pagination change control
    function onPageChangeTable1(p) {
      setPageTable1(p)
    }

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
      setDataTable1(data.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage).reverse())
    }, [pageTable1, data])

    const [email, setEmail] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [jobTitle, setJobTitle] = useState(null);
    const [role, setRole] = useState(null);

    const [id, setId] = useState(null);

    const handleSubmit = () => {
      setSubmitLoading(true);
      if(email == null || role == null || jobTitle == null || fullName == null){
        toast.error('All field must be filled', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        return;
      }
      
      fetch(`${process.env.REACT_APP_API_URL}/add_brand_user`,{
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          brand_id: uid,
          fullName,
          jobTitle,
          email,
          role
        })
      })
      .then(res => {
        if(res.ok){
          setSubmitLoading(false);
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
          closeModal();
          window.location.reload();
        }else{
          setSubmitLoading(false);
          toast.error('Failed', {
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
        setSubmitLoading(false);
        toast.error('Failed', {
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

    const handleDelete = () => {
      fetch(`${process.env.REACT_APP_API_URL}\brand_user\${id}`,{
        method: 'DELETE'
      })
      .then(res=> {
        if(res.ok){
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
        }else{
          toast.error('Failed. Server error', {
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
        toast.error('Failed. Server error', {
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

    const handleUpdate = () => {
      setSubmitLoading(true);

      if(email == null || role == null || jobTitle == null || fullName == null){
        toast.error('All field must be filled', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        return;
      }

      fetch(`${process.env.REACT_APP_API_URL}/update_brand_user/${id}`,{
        method: 'PUT',
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          fullName,
          jobTitle,
          email,
          role
        })
      })
      .then(res => {
        if(res.ok){
          setSubmitLoading(false);
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
          closeEditModal();
          window.location.reload();
        }else{
          setSubmitLoading(false);
          toast.error('Failed', {
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
        setSubmitLoading(false);
        toast.error('Failed', {
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
    <div>
        <ToastContainer />

        <PageTitle>Manage users</PageTitle>

        { !loading && data.length > 0 && <div className='capitalize flex my-3 mr-20 text-xs text-gray-600 dark:text-gray-400'>
          Total accounts: <span className='font-semibold ml-2'>{data.length}</span>
        </div> }
        { !loading && data.length < 1 && <div className='capitalize flex my-3 mr-20 text-xs text-gray-600 dark:text-gray-400'>
          You Have No Users
        </div> }

        <div className='flex justify-end mr-5 lg:mr-20 mb-5'>
            <Button class="bg-green-600 p-2 rounded-lg text-sm text-white" onClick={openModal}>Add user  +</Button>
        </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell >Email</TableCell>
              <TableCell >Job Title</TableCell>
              <TableCell >Role</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
              !loading && !error && dataTable1.slice().map( (item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="text-sm font-semibold">{item.fullName}</div>
                  <div className="text-xs">{item.email}</div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.jobTitle}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{item.role}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" onClick={
                        e => {
                          setEmail(item.email);
                          setFullName(item.fullName);
                          setJobTitle(item.jobTitle);
                          setRole(item.role);
                          setId(item._id);
                          openEditModal();
                        }
                      } />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={e=>{
                      //handleDelete(user._id);
                      setId(item._id);
                      openDeleteModal();
                    }}>
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              ) )
            }
            {
              loading && 
              <TableCell>
                <span>Loading.......</span>
              </TableCell>
            }
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>


      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="text-center">Add user</ModalHeader>
        <ModalBody>
            <Label className="mt-4">
                <span>Full name </span>
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
                    <input
                    type='text'
                    className="block w-full pl-3 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                    placeholder="John Doe"
                    onChange={e => setFullName(e.target.value)}
                    />
                </div>
            </Label>
            <Label className="mt-4">
                <span>Email </span>
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
                    <input
                    type='email'
                    className="block w-full pl-3 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                    placeholder="johndoe@gmail.com"
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
            </Label>
            <Label className="mt-4">
                <span>Job Title </span>
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
                    <input
                    type='text'
                    className="block w-full pl-3 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                    placeholder="Finance Manager"
                    onChange={e => setJobTitle(e.target.value)}
                    />
                </div>
            </Label>
            <Label className="mt-4">
              <span>Choose system role</span>
              <Select className="mt-1 capitalize" onChange={e => setRole(e.target.value)}>
                <option value={null}></option>
                <option tooltip="type" value="admin">Admin user</option>
                <option value="regular">Regular user</option>
              </Select>
            </Label>
        </ModalBody>
        <ModalFooter class="justify-center">
            <div className='flex justify-center mt-4 mb-1'>
                { submitLoading && <div className='border border-green-600 p-2 w-full rounded-lg text-center text-green-800 text-sm'>
                    Loading ....
                    </div> }
                { !submitLoading && <Button onClick={
                ()=>{
                    handleSubmit();
                }
                } class="bg-green-600 p-2 rounded-lg text-sm text-white w-full">
                    Add Users
                </Button> }
            </div>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalHeader className="text-center">Update user</ModalHeader>
        <ModalBody>
            <Label className="mt-4">
                <span>Full name </span>
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
                    <input
                    type='text'
                    className="block w-full pl-3 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    />
                </div>
            </Label>
            <Label className="mt-4">
                <span>Email </span>
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
                    <input
                    type='email'
                    className="block w-full pl-3 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                    placeholder="johndoe@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
            </Label>
            <Label className="mt-4">
                <span>Job Title </span>
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
                    <input
                    type='text'
                    className="capitalize block w-full pl-3 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                    placeholder="Finance Manager"
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                    />
                </div>
            </Label>
            <Label className="mt-4">
              <span>Choose system role</span>
              <Select className="mt-1" value={role} onChange={e => setRole(e.target.value)}>
                <option tooltip="type" value="admin">Admin user</option>
                <option value="regular">Regular user</option>
              </Select>
            </Label>
        </ModalBody>
        <ModalFooter class="justify-center">
            <div className='flex justify-center mt-4 mb-1'>
                { submitLoading && <div className='border border-blue-600 p-2 w-full rounded-lg text-center text-blue-800 text-sm'>
                    Loading ....
                    </div> }
                { !submitLoading && <Button onClick={
                ()=>{
                    handleUpdate();
                }
                } class="bg-blue-600 p-2 rounded-lg text-sm text-white w-full">
                    Update User
                </Button> }
            </div>
        </ModalFooter>
      </Modal>
      
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>

          <Label className="mt-1">
            <span className='text-center'>Are you sure you want to delete?</span>
          </Label>
          
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </div>
          
          <div className="hidden sm:block">
            <Button class="bg-red-600 p-2 rounded-lg text-sm text-white"
            onClick={()=> 
              handleDelete()
            }
            >Yes</Button>
          </div>

          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button class="bg-red-600 p-2 rounded-lg text-sm text-white w-full" block size="large"
            onClick={()=> handleDelete()}
            >
              Yes
            </Button>
          </div>
        </ModalFooter>
      </Modal>

    </div>
  )
}

export default Users