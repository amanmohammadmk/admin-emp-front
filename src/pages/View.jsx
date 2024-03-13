import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import LoadingSpinner from '../components/LoadingSpinner'
import { useParams } from 'react-router-dom'
import { getUsers } from '../service/allapi'
import { BASE_URL } from '../service/baseurl'


function View() {

  const [user, setUser] = useState({})

  const { id } = useParams()

  console.log("id", id);



  const getUserview = async () => {

    
    const { data } = await getUsers("")
    console.log("data for view ", data);


    console.log(data.find(item => item._id === id));


 
    setUser(data.find(item => item._id === id));
  }

  useEffect(() => {
    getUserview()

  }, [])


  const [showspin, setShowSpin] = useState(true)

  useEffect(() => {

    setTimeout(() => {
      setShowSpin(false)
    }, 1000)
  }, [])

  return (
    <>

      {showspin ?
        <LoadingSpinner /> :


        <div className='container' style={{ height: "80vh" }}>

          {user ?
            <Card className='shadow ms-auto mt-5 p-3'>

              <div className='image text-center mb-3 '>
                <img src={`${BASE_URL}/uploads/${user.profile}`} className='rounded shadow-lg' width="70px" height="70px" alt="no image" />
              </div>
              <div className="user-profile-container text-center">
                <h2 className="mb-4">{user.fname.toUpperCase()} Profile</h2>
                <div className="user-info d-flex flex-column ">
                  <h3 className="user-name">
                    <span className="font-weight-bold text-black-50">Full Name : </span> {user.fname.toUpperCase()} {user.lname.toUpperCase()}
                  </h3>
                  <h3 className="user-email">
                    <span className="font-weight-bold text-black-50">Email : </span> {user.email}
                  </h3>
                  <h3 className="user-mobile">
                    <span className="font-weight-bold text-black-50">Mobile : </span> {user.mobile}
                  </h3>
                  <h3 className="user-gender">
                    <span className="font-weight-bold text-black-50">Gender : </span> {user.gender}
                  </h3>
                  <h3 className="user-status">
                    <span className="font-weight-bold text-black-50">Designation : </span>{' '}
                  
                      {user.status}
                  
                  </h3>
                  <h3 className="user-location">
                    <span className="font-weight-bold text-black-50">Location : </span>{' '}
                    {user.location.charAt(0).toUpperCase() + user.location.slice(1)}
                  </h3>
                </div>
              </div>

            </Card>
            : ""
          }

        </div>
      }


    </>

  )
}

export default View