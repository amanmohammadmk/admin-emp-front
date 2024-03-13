import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../service/baseurl';





function Hometable({ displayData,removeUser }) {

  console.log("display", displayData);
  console.log("data to delete",removeUser);

  return (
    <>
     <div className='table-responsive mt-3'>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Full Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Designation</th>
        <th>Course</th>
        <th>Profile</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        displayData.length > 0 ?
          displayData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.fname} {item.lname}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.status}</td>
              <td>{item.selectedCourses ? item.selectedCourses.join(', ') : ''}</td>
              <td><img style={{ width: "70px", height: "70ox" }} src={`${BASE_URL}/uploads/${item.profile}`} alt="" /></td>
              <td>
                <Link to={`/view/${item._id}`}>
                  <i className="fa-sharp fa-solid fa-eye fs-4 me-2"></i>
                </Link>
                <Link to={`/edit/${item._id}`}>
                  <i className="fa-sharp fa-solid fa-pen fs-4 me-2"></i>
                </Link>
                <span onClick={() => removeUser(item._id)}>
                  <i className="fa-sharp fa-solid fa-eye fa-trash fs-4" style={{ color: "red" }}></i>
                </span>
              </td>
            </tr>
          )) : (
            <tr className='fw text-center'>
              <td colSpan="7">Nothing to display</td>
            </tr>
          )
      }
    </tbody>
  </Table>
</div>

    </>
  )
}

export default Hometable