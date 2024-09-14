import axios from "axios";
import "./admin.css";
import { useContext, useEffect,useState } from "react";
import { datacontext, setdatacontext } from "../App";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Userheader from "../userdashboard/Userheader";
import Footer from "../Landingpage/Footer";

function Admin() {
   const countdownDuration =12*60*60 * 1000; // 24 hours in milliseconds
   const [remainingTime, setRemainingTime] = useState(countdownDuration);
   const [electionButtonDisplay,setElectionButtonDisplay]=useState(false)
   const [hourdisplay,setHourDisplay]=useState(false)
  const navigate=useNavigate()
  const [adminOrNot,setAdminOrNot]=useState(null)
  const [displayResult,setDisplayResult]=useState(false)


   const formatTime = (ms) => {
      const hours = Math.floor(ms / (60 * 60 * 1000));
      const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


   function startElectionClick(){
      setHourDisplay(true)
      setElectionButtonDisplay(true)
      
    
         localStorage.setItem('election',"election started")
         // Check if there's already a saved target time in local storage
         let targetTime = localStorage.getItem('targetTime');
     
         // If there's no saved target time, set a new one
         if (!targetTime) {
           targetTime = new Date().getTime() + countdownDuration;
           localStorage.setItem('targetTime', targetTime);
         }
     
         // Function to update the remaining time every second
         const interval = setInterval(() => {
           const now = new Date().getTime();
           const timeLeft = targetTime - now;
         localStorage.setItem("remaingtime",timeLeft)
           // Update state with the remaining time
           setRemainingTime(timeLeft);
     
           // If the countdown is over, stop the interval and clear local storage
           if (timeLeft < 0) {
            localStorage.removeItem('targetTime');
             clearInterval(interval);
             localStorage.setItem('election',"election ended")
          
            // Clear the target time
             setRemainingTime(0);
           }
         }, 1000);
     
        
         // Cleanup interval on component unmount
         return () => clearInterval(interval);
       }

       function electionButtonClick(e){
         e.preventDefault()
         localStorage.setItem("timecalToDisplayElectionButton", Date.now())
         startElectionClick()
         axios.get("http://localhost:8080/votingstart").then(()=>{

          toast.success("message send to voters")
         })
        .catch((err)=>{
          toast.error(" error in message send to voters")
        })
       }
       
       useEffect(()=>{
         const token=localStorage.getItem("token")
          axios.get("http://localhost:8080/admin", {
            headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
              'Content-Type': 'application/json'
            }
          }).then((res)=>{setAdminOrNot("admin")})
          .catch((err)=>{
            try {
              
               if (err.response.status === 403 || err.response.status==401) {
                 setAdminOrNot(null)
                   navigate('/');
                   return;
               }
               else if (err.response.status === 400) {
                setAdminOrNot("user")
                   navigate('/dashboard');
                   return;
               }
             
           } catch { }
          })
          const targetTime=localStorage.getItem("targetTime")
         try{
          
            if(targetTime){
               startElectionClick()
              setDisplayResult(true)
              localStorage.setItem("result","result pending")
            const remainingTime=localStorage.getItem("remaingtime")
            console.log("remaining time")
            if(remainingTime>0){
               setHourDisplay(true)
            } 
         }
         if(!targetTime)setDisplayResult(false)
            const electionButtonDisplayTime= localStorage.getItem("timecalToDisplayElectionButton")
         
            const addedtime=+electionButtonDisplayTime+(2*countdownDuration);
            console.log(addedtime,Date.now())
           // console.log(electionButtonDisplayTime)
            if(Date.now()>=addedtime){
               console.log(new Date().getTime())
              
               setElectionButtonDisplay(false)
               return
            }
            else setElectionButtonDisplay(true)
         
         }catch{}
       },[])
      
    console.log(adminOrNot)
       function voterDataButtonClick(){
        navigate("/votingdata")
       }

       function displayResultButtonClick(){
       toast.success("result displayed")
       localStorage.setItem("result","result displayed")
  //  navigate('/displayresult')
       }
   return (
      <>
     
            <Userheader />
            <div className="time-display" style={{ display: hourdisplay ? "block" : "none" }}>
              <h5>Election ends in: {formatTime(remainingTime)}</h5>
            </div>
            <div className="admin-buttons">
            <button className="voting-data" onClick={voterDataButtonClick}>Voting Data</button>

            <button className="display-result" disabled={displayResult} onClick={displayResultButtonClick}>Display result</button>

            <button disabled={electionButtonDisplay} className="start-election" onClick={electionButtonClick}>Start Election</button>
            </div>
           <div className="admin-footer">
           <Footer></Footer>
           </div>
          </>
    
    
  );
}

export default Admin;
