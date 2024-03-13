import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerContext } from "../components/ContextShare";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUsers } from '../service/allapi';
import { BASE_URL } from '../service/baseurl';




function Edit() {


  // object
  const { registerData, setregisterData } = useContext(registerContext)

  const navigate = useNavigate()

  const [showspin, setShowSpin] = useState(true);


  useEffect(() => {

    setTimeout(() => {
      setShowSpin(false);

    }, 2000);

  }, []);

  const options = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];




  // to hold normal input
  const [normalInputs, setnormalInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""

  })

  // to hold status
  const [status, setStatus] = useState("")


  // to hold file uploading content
  const [profile, setProfile] = useState("")

  const [preview, setpreview] = useState("")

  // to change profile to url to get image
  useEffect(() => {
    if (profile) {
      URL.createObjectURL(profile)
      setpreview(URL.createObjectURL(profile))
    }
  }, [profile])

  const { id } = useParams()

  console.log("id", id);

  const [existingImg, setexistingImg] = useState()


// to get single useer
  const getUserview = async () => {
    // we get data from from backend
    const { data } = await getUsers("")
    console.log(data);
    // to check the id get while clicking view button on hometable (_id)
    console.log(data.find(item => item._id === id));

    // save all its content to setuser
    let existingUser=data.find(item => item._id === id);

   setnormalInputs(existingUser)

   setStatus(existingUser.status)

   setexistingImg(existingUser.profile)



  }

  useEffect(() => {
    getUserview()

  }, [])


  // to get normal input
  const getandsetInput = (e) => {
    const { name, value } = e.target
    setnormalInputs({ ...normalInputs, [name]: value })
  }
  console.log(normalInputs);


  // to get ptofile
  const getandsetprofile = (e) => {
    console.log(e.target.files[0]);
    setProfile(e.target.files[0])
  }

  console.log(profile);
  console.log("status", status);


  const handlesubmit = async (e) => {
    e.preventDefault()

    // destructure the inputs
    const { fname, lname, email, mobile, gender, location } = normalInputs

    if (!fname || !lname || !email || !mobile || !gender || !location || !status || !profile) {
      toast.warning("please fill the form completely")
    } else {
      // toast.success("form completly filled")


      const data = new FormData()

      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)
      profile? data.append("profile", profile):data.append("profile",existingImg)
      data.append("location", location)

      if(profile){

        var headers = {
          "content-type": "multipart/form-data"
        }

      }else{
        var headers=""
      }

     

      // make api call

      const result = await editUser(id,data, headers)

      console.log(result);

      if (result.status === 200) {

  
        navigate('/home')


      }
      else {
        toast.error("request failed")
      }


    }


  }


  return (
    <>

      {
        showspin ? <LoadingSpinner /> :
          <div className="container">
            <h2 className="text-center fw-bolder mt-3 text-uppercase">
             UPDATE EMPLOYEE DETAILS
            </h2>

            <div className="shadow border rounded p-3 mt-3 ">
              <div className="text-center">
                <img
                  style={{ widows: "70px", height: "70px" }}
                  src={`preview ? preview : ${BASE_URL}/uploads/${existingImg}`}
                  alt="Error"
                />
              </div>

              <Form className="mt-3">
                <Row className="mb-3 ">


                  {/* FIRST NAME  */}

                  <FloatingLabel
                    controlId="floatingInputfName"
                    label="First Name"
                    className="mb-3 col-lg-6 "

                  >
                    <Form.Control name="fname" value={normalInputs.fname} onChange={e => getandsetInput(e)} type="text" placeholder=" First Name" />
                  </FloatingLabel>


                  {/* LAST NAME  */}

                  <FloatingLabel
                    controlId="floatingInputlName"
                    label="Last Name"
                    className="mb-3 col-lg-6 "

                  >
                    <Form.Control name="lname" value={normalInputs.lname} onChange={e => getandsetInput(e)} type="text" placeholder=" Last Name" />
                  </FloatingLabel>


                  {/* EMAil  */}

                  <FloatingLabel
                    controlId="floatingInputEmail"
                    label=" Email"
                    className="mb-3 col-lg-6 "

                  >
                    <Form.Control name="email" value={normalInputs.email} onChange={e => getandsetInput(e)} type="email" placeholder=" Email" />
                  </FloatingLabel>


                  {/* Number  */}

                  <FloatingLabel
                    controlId="floatingInputMobile"
                    label=" Mobile"
                    className="mb-3 col-lg-6 "
                  >
                    <Form.Control name="mobile" value={normalInputs.mobile} onChange={e => getandsetInput(e)} type="text" placeholder=" Mobile" />
                  </FloatingLabel>


                  {/* GENDER  */}

                  <Form.Group className=" mb-3 col-lg-6">
                    <Form.Label>Select Gender</Form.Label>

                    <Form.Check
                      value={"male"}
                      type={"radio"}
                      label={"Male"}
                      name="gender"
                      onChange={e => getandsetInput(e)}
                      checked={normalInputs.gender=="male"?true:false}
                    />

                    <Form.Check
                      value={"Famale"}
                      type={"radio"}
                      label={"Female"}
                      name="gender"
                      onChange={e => getandsetInput(e)}
                      checked={normalInputs.gender=="Famale"?true:false}
                    />
                  </Form.Group>


                  {/* STATUS  */}

                  <Form.Group className=" mb-3 col-lg-6">
                    <Form.Label>Select Employee status</Form.Label>
                    <Select options={options} placeholder={status} onChange={e => setStatus(e.value)} />
                  </Form.Group>



                  {/* PROFILE PIC  */}

                  <Form.Group className=" mb-3 col-lg-6">
                    <Form.Label>Choose a Profile picture</Form.Label>
                    <Form.Control type="file" onChange={e => getandsetprofile(e)} name="user_profile" />

                  </Form.Group>


                  {/* LOCATION  */}


                  <FloatingLabel
                    controlId="floatingInputLocation"
                    label=" Location"
                    className="mb-3 col-lg-6 mt-3"
                  >
                    <Form.Control name="location" value={normalInputs.location} onChange={e => getandsetInput(e)} type="text" placeholder=" Location" />
                  </FloatingLabel>




                  <Button className='mt-4 mb-4' style={{width:"200px", marginLeft:"40%"}} onClick={e => handlesubmit(e)} type="submit">Update</Button>
                </Row>
              </Form>
            </div>
          </div>}

      <ToastContainer />

    </>

  );
}

export default Edit