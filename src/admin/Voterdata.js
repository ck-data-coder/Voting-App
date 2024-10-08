import React from 'react'
import axios from "axios";
import { useContext, useEffect,useState } from "react";
import Userheader from '../userdashboard/Userheader'
import "./voterdata.css"
import { datacontext, setdatacontext } from "../App";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from '../Landingpage/Footer';


const Voterdata = () => {
    const data = useContext(datacontext);
    const setdata = useContext(setdatacontext);
    const navigate=useNavigate()


    async function gettimecalToDisplayElectionButton(){
    await axios.get('/api/gettimecalToDisplayElectionButton').then((res)=>{
     localStorage.setItem("timecalToDisplayElectionButton",res.data)
    }).catch(()=>{})
   }
   
    const timecalToDisplayElectionButton=localStorage.getItem("timecalToDisplayElectionButton")
     const electionTime=new Date(+timecalToDisplayElectionButton).toISOString().slice(0, 10)

    const func = async () => {
     
        const token = localStorage.getItem('token');
        const value = await axios.get("/api/voterdata", {
           headers: {
             'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
             'Content-Type': 'application/json'
           }
         }).then((res)=>{
           console.log(res.data)
           setdata(res.data);
         }).catch((err)=>{
           toast.error(err.response.data.message)
           navigate('/')
         });
       
     };
  
     useEffect(() => {
      window.scrollTo(0, 0); 
      gettimecalToDisplayElectionButton()
        func();
     }, []);

     let currentElectionVotedOrNot=1;
  return (
   
    <>
     <Userheader></Userheader>
     <div className="admin-container">
          <Link  to={'/'}><img className='admin-backBtn' src={require('./back.png')}></img></Link> 
          <div className='current-election'>
          <h2>Current Election Voter Data </h2>
           <h4>Date:{electionTime}</h4>
         <table className="admin-table">
            <thead>
               <tr>
                  <th className="email-header">Voters Name</th>
                  <th className="email-header">Voter Epic No</th>
                  <th className="party-header">Selected Party</th>
               </tr>
            </thead>
            <tbody>
               
               {data ? data.map((e, index) => {
                  if(e.election.time==electionTime){
                     currentElectionVotedOrNot=0;
                  return (
                     e.election.voting_data.map((currentVoting)=>{
                       return( <tr key={index}>
                        <td className="name">{currentVoting.voter_name}</td>
                      <td className="epic_no">{currentVoting.epic_no}</td>
                      <td className="party_name">{currentVoting.party_name}</td>
                   </tr>)
                     })
                    
                  );}
               }) : null}
               {currentElectionVotedOrNot? <h3> 0 vote in current election</h3>:null}
            </tbody>
         </table>
         </div>


         <div className='previous-election'>
         <h2>Previous Election Voter Data </h2>
          {
            data?data.map((e)=>{
             if(e.election.time!==electionTime){
             return(<>
               <h4>Date: {e.election.time}</h4>
               <table className="admin-table">
               <thead>
                  <tr>
                     <th className="email-header">Voters Name</th>
                     <th className="email-header">Voter Epic No</th>
                     <th className="party-header">Selected Party</th>
                  </tr>
               </thead>
               <tbody>
                  
                  
                     
                       {e.election.voting_data.map((previousVoting)=>{
                          return ( <>
                            <tr>
                             <td className="name">{previousVoting.voter_name}</td>
                           <td className="epic_no">{previousVoting.epic_no}</td>
                           <td className="party_name">{previousVoting.party_name}</td>
                          </tr>
                          </>
                        )  
                       })
                        
             }
                       
                
               </tbody>
            </table>
            </>
             )
            }

            }):null

          }

         </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Voterdata