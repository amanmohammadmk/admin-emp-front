import React, { useContext, useEffect, useState } from "react";
import { Form, FloatingLabel, Row, Button, Alert } from "react-bootstrap";
import Select from "react-select";
import LoadingSpinner from '../components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from "../service/allapi";
import { registerContext } from "../components/ContextShare";
import { useNavigate } from "react-router-dom";



function Add() {
  
  
  const{registerData,setregisterData}=useContext(registerContext)

  const navigate = useNavigate()

  const [showspin, setShowSpin] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {

    setTimeout(() => {
      setShowSpin(false);

    }, 2000);

  }, []);

  const options = [
    { value: "HR", label: "HR" },
    { value: "Manager", label: "MANAGER" },
    { value: "Sales", label: "SALES" },
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


  // to get normal input
  const getandsetInput = (e) => {
    const { name, value } = e.target
    setnormalInputs({ ...normalInputs, [name]: value })
  }
  console.log(normalInputs);

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCourses([...selectedCourses, value]);
    } else {
      setSelectedCourses(selectedCourses.filter(course => course !== value));
    }
  };


  // to get ptofile
  const getandsetprofile = (e) => {
    console.log(e.target.files[0]);
    setProfile(e.target.files[0])
  }

  console.log(profile);
  console.log("status",status);

  const handlesubmit = async (e) => {
    e.preventDefault()

    // destrecture
    const { fname, lname, email, mobile, gender, location } = normalInputs
    if (!fname || !lname || !email || !mobile || !gender || !location || !status || selectedCourses.length === 0 || !profile) {
      toast.warn("fil")
    }
    else {


      // FormData to store uploading content of form to bankend
      const data = new FormData()
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("location", location)
      data.append("status", status)
      data.append("profile", profile)
      data.append("selectedCourses", selectedCourses.join(','));

      // multi purpose home data

      const headers = {
        "content-type": "multipart/form-data"
      }

      // api call
      const result = await addUser(data, headers)
      console.log(result);

      if(result.status===200){

        // to make state empty
            setnormalInputs({...normalInputs,
              fname: "",
            lname: "",
            email: "",
            mobile: "",
            gender: "",
            location: ""})
            setStatus("")
            setSelectedCourses("")
            setProfile("")

        // to get all data after submitting
        setregisterData(result.data)
        navigate('/home')

      }else{
        toast.warn("error request")
      }

    }

  }








  return (
    <>
   

      {
        showspin ? <LoadingSpinner /> :
          <div className="container">
            <h2 className="text-center fw-bolder mt-3 text-uppercase">
              Add new Employee Details
            </h2>

            <div className="shadow border rounded p-3 mt-3 ">
              <div className="text-center">
                <img
                  style={{ widows: "70px", height: "70px" }}
                  src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/7085/7085798.png"}
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
                    <Form.Control name="fname" value={normalInputs.value} onChange={e => getandsetInput(e)} type="text" placeholder=" First Name" />
                  </FloatingLabel>


                  {/* LAST NAME  */}

                  <FloatingLabel
                    controlId="floatingInputlName"
                    label="Last Name"
                    className="mb-3 col-lg-6 "

                  >
                    <Form.Control name="lname" value={normalInputs.value} onChange={e => getandsetInput(e)} type="text" placeholder=" Last Name" />
                  </FloatingLabel>


                  {/* EMAil  */}

                  <FloatingLabel
                    controlId="floatingInputEmail"
                    label=" Email"
                    className="mb-3 col-lg-6 "

                  >
                    <Form.Control name="email" value={normalInputs.value} onChange={e => getandsetInput(e)} type="email" placeholder=" Email" />
                  </FloatingLabel>


                  {/* Number  */}

                  <FloatingLabel
                    controlId="floatingInputMobile"
                    label=" Mobile"
                    className="mb-3 col-lg-6 "
                  >
                    <Form.Control name="mobile" value={normalInputs.value} onChange={e => getandsetInput(e)} type="text" placeholder=" Mobile" />
                  </FloatingLabel>


                  {/* GENDER  */}

                  <Form.Group className=" mb-3 col-lg-6">
                    <Form.Label>Select Gender</Form.Label>

                    <Form.Check
                      value={"male"}
                      type={"radio"}
                      label={"male"}
                      name="gender"
                      onChange={e => getandsetInput(e)}
                    />

                    <Form.Check
                      value={"Famale"}
                      type={"radio"}
                      label={"Female"}
                      name="gender"
                      onChange={e => getandsetInput(e)}
                    />
                  </Form.Group>


                  {/* STATUS  */}

                  <Form.Group className=" mb-3 col-lg-6">
                    <Form.Label>Designation</Form.Label>
                    <Select options={options} onChange={e => setStatus(e.value)} />
                  </Form.Group>


                  <Form.Group className="mb-3">
            <Form.Label>Select Courses:</Form.Label>
            <Form.Check
              type="checkbox"
              label="MCA"
              value="MCA"
              checked={selectedCourses.includes('MCA')}
              onChange={handleCourseChange}
            />
            <Form.Check
              type="checkbox"
              label="BCA"
              value="BCA"
              checked={selectedCourses.includes('BCA')}
              onChange={handleCourseChange}
            />
            <Form.Check
              type="checkbox"
              label="BSC"
              value="BSC"
              checked={selectedCourses.includes('BSC')}
              onChange={handleCourseChange}
            />
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
                    <Form.Control name="location" value={normalInputs.value} onChange={e => getandsetInput(e)} type="text" placeholder=" Location" />
                  </FloatingLabel>




                  <Button onClick={e => handlesubmit(e)} type="submit">Submit</Button>
                </Row>
              </Form>
            </div>
          </div>}

      <ToastContainer />
    </>
  );
}

export default Add;