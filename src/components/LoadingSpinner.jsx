import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import './spinner.css'





function LoadingSpinner() {
  return (
    <div className='d-flex justify-content-center align-item-center m-5'>
        <Spinner animation='grow' variant='info' className='me-1'/> <span className='fs-4' style={{animationName:"example",
  animationDuration:"2s"}}>Loading.......</span>
    </div>
  )
}

export default LoadingSpinner