import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { registerContext } from '../components/ContextShare'
import { Alert } from 'react-bootstrap'
import { deleteUser, getUsers } from '../service/allapi'





function Home() {

  const[allUserdata,setallUserdata]=useState([])

  // object
  const { registerData, setregisterData } = useContext(registerContext)

  const navigate = useNavigate()

  const [search,setSearch]=useState("")



  const getAllEmployees = async () => {
    const response = await getUsers(search)

    console.log(response);

    if(response.status==200){
      setallUserdata(response.data)
      
    }else{

      alert("cannot fetch data")
    }
  }

  console.log("setallUserdata", allUserdata);


  const [showspin, setShowSpin] = useState(true)

  useEffect(() => {

    getAllEmployees()

    setTimeout(() => {
      setShowSpin(false)
    }, 2000)
  }, [search])


  // delete user

  const removeUser=async(id)=>{

    const response =await deleteUser(id)

    if(response.status===200){
      getAllEmployees()
    }else{
      alert("failed operation")
    }
  }





  return (
    <>

      {/* for getting data from Add.jsx as contextshare */}
      {
        registerData && <Alert variant='success' onClose={() => setregisterData("")} dismissible >

          {registerData.fname.toUpperCase()} registered Succesfully

        </Alert>
      }

      {

        showspin ?
          <LoadingSpinner /> :


          <div className='container d-flex flex-column'>

            <div className='search d-flex justify-content-center align-items-center mt-3 '>
              <span>Search:</span>
              <input type="text" placeholder='search by employee name' onChange={e=>setSearch(e.target.value)} className='form-control ms-2 ' style={{ width: "400px" }} />
              <Link to={'/add'} className='btn btn-primary ms-3'>
                <i class="fa-solid fa-user-plus"></i>ADD
              </Link>
            </div>

            <div className='table mt-5'>
              <h1 className='text-center fw-bolder'>List Of All Employees</h1>
              <Hometable displayData={allUserdata} removeUser={removeUser}/>

            </div>


          </div>


      }

    </>
  )
}

export default Home