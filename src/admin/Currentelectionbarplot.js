import React, { useState,useEffect } from 'react'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
const Currentelectionbarplot = () => {
  const token=localStorage.getItem("token")
  async function gettimecalToDisplayElectionButton(){
   await axios.get('/api/gettimecalToDisplayElectionButton').then((res)=>{
    localStorage.setItem("timecalToDisplayElectionButton",res.data)
   }).catch(()=>{})
  }

   const timecalToDisplayElectionButton=localStorage.getItem("timecalToDisplayElectionButton")
    const electionTime=new Date(+timecalToDisplayElectionButton).toISOString().slice(0, 10)
   
    const [currentElecData,setCurrentElecData]=useState()

  async  function reqfunc(){
    await  axios.get("/api/displayresult", {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
           res.data.map((e)=>{ 
               if(e.date==electionTime){
             
                 setCurrentElecData(e.parties)
                
               }
           })
        
     }).catch((err)=>console.log(err))
    }
    useEffect(()=>{
      gettimecalToDisplayElectionButton()
      reqfunc()
    },[])

    console.log(currentElecData)
  return (
 
  <>
    <ResponsiveContainer width="100%" height={400}>
    <BarChart data={currentElecData} margin={{ top: 2, right: 2, left: 20, bottom: 20 }}>
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey='_id'  label={{ value: 'parties', position: 'insideBottom', offset: -15 }} />
      <YAxis  label={{ value: 'no of votes', angle: -90, position: 'insideLeft',offset:20 }} 
          allowDecimals={false} />
      <Tooltip />
      <Legend   align="right"  // Aligns the legend to the right
          verticalAlign="top" />
      <Bar dataKey="count" name="votes"  fill="#8884d8" barSize={30} />
    </BarChart>
  </ResponsiveContainer>
  </>
  
)
}

export default Currentelectionbarplot