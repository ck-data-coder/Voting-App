import React from 'react'
import Previouselctionchart from './Previouselctionchart'
import Previouselectiondata from './Previouselectiondata'
import Userheader from '../userdashboard/Userheader'
import Footer from '../Landingpage/Footer'

const Previouselection = () => {
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