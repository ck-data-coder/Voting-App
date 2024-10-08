import axios from "axios";
import "./admin.css";
import { useContext, useEffect,useState } from "react";
import { datacontext, setdatacontext } from "../App";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Userheader from "../userdashboard/Userheader";
import Footer from "../Landingpage/Footer";

function Admin() {
   const countdownDuration =12*60*60*1000; // 24 hours in milliseconds
   const [remainingTime, setRemainingTime] = useState(countdownDuration);
   const [electionButtonDisplay,setElectionButtonDisplay]=useState(false)
   const [hourdisplay,setHourDisplay]=useState(false)
  const navigate=useNavigate()
  const [adminOrNot,setAdminOrNot]=useState(null)
  const [displayResult,setDisplayResult]=useState(false)
const [electionButtonDisplayTime,setelectionButtonDisplayTime]=useState(null)

   const formatTime = (ms) => {
      const hours = Math.floor(ms / (60 * 60 * 1000));
      const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


  async function startElectionClick(){
    
      setElectionButtonDisplay(true)
      
    
         localStorage.setItem('election',"election started")
         // Check if there's already a saved target time in local storage
         let targetTime = localStorage.getItem('targetTime');
      
       console.log(targetTime)
         // If there's no saved target time, set a new one
         if (!targetTime || targetTime=='') {
           targetTime = new Date().getTime() + countdownDuration;
           localStorage.setItem('targetTime', targetTime);
           await axios.post('/api/puttargettimeelectionandresult',{id :1,targettime:targetTime,election:"election started",result:"result pending"}).then(()=>{}).catch((err)=>{console.log(err)})
           console.log(targetTime)
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
             axios.delete('/api/removetargettime',{id:1}).then(()=>{}).catch((err)=>{console.log(err)})
             axios.post('/api/setelection',{election:"election ended"}).then(()=>{}).catch((err)=>{console.log(err)})
             clearInterval(interval);
             localStorage.setItem('election',"election ended")
          
            // Clear the target time
             setRemainingTime(0);
           }
         }, 1000);
     
         setHourDisplay(true)
         // Cleanup interval on component unmount
         return () => clearInterval(interval);
       }

     async  function electionButtonClick(e){
         e.preventDefault()
         setDisplayResult(true)
         localStorage.setItem("timecalToDisplayElectionButton", Date.now())
         startElectionClick()
         await axios.post('/api/settimecalToDisplayElectionButton',{timecalToDisplayElectionButton:Date.now()}).then(()=>{}).catch((err)=>{console.log(err)})
         axios.get("/api/votingstart").then(()=>{

          toast.success("message send to voters")
         })
        .catch((err)=>{
          toast.error(" error in message send to voters")
        })
       }

    async function gettime(){
      console.log("repeated calls")
     await  axios.get('/api/gettimecalToDisplayElectionButton')
       .then((res)=>{
      //   setelectionButtonDisplayTime(res.data); 
        const addedtime= +res.data+(2*countdownDuration);
        console.log(addedtime,Date.now())
       // console.log(electionButtonDisplayTime)
        if(Date.now()>=addedtime){
           console.log(new Date().getTime())
          
           setElectionButtonDisplay(false)
           return
        }
        else setElectionButtonDisplay(true)
      
    }).catch(()=>{})
    }
    
        async function gettargettime() {
          console.log("checking run or not")
       await  axios.get("/api/gettargettime").then(async(res)=>{
            try{
      
              localStorage.setItem('targetTime', res.data);
               await  startElectionClick()
                setDisplayResult(true)
                localStorage.setItem("result","result pending")
              
              const remainingTime=localStorage.getItem("remaingtime")
              console.log("remaining time")
              if(remainingTime>0){
                 setHourDisplay(true)
              } 
        
           }catch{}
          }).catch((err)=>{
            localStorage.removeItem("targetTime")
           setDisplayResult(false)
            console.log(err)})

        }
      
      
       useEffect(()=>{
       
        window.scrollTo(0, 0); 
         const token=localStorage.getItem("token")
          axios.get("/api/admin", {
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
       //   let targetTime=localStorage.getItem("targetTime")
            gettime()
            gettargettime()
           
   
       },[])
      
    console.log(adminOrNot)
       function voterDataButtonClick(){
        navigate("/votingdata")
       }

      async function displayResultButtonClick(){
       toast.success("result displayed")
       localStorage.setItem("result","result displayed")
       await axios.post('/api/setresult',{result:"result displayed"})
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
