import React, { useEffect } from 'react'
import Previouselctionchart from './Previouselctionchart'
import Previouselectiondata from './Previouselectiondata'
import Userheader from '../userdashboard/Userheader'
import Footer from '../Landingpage/Footer'

const Previouselection = () => {
  useEffect(()=>{
    window.scrollTo(0, 0); 
  },[])
  return (
    <>
    <Userheader></Userheader>
     <Previouselectiondata></Previouselectiondata>
    <Previouselctionchart></Previouselctionchart>
   <Footer></Footer>
    </>
  )
}

export default Previouselection