import React, { useEffect, useState } from 'react';
import './ForgetPassword.css'; // Import the CSS file
import axios from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
       const [email,setEmail]=useState({email:null})
       const [emailDisable,setEmailDisable]=useState(false)
      const [generateOtpDisplay,setGenerateOtpDisplay]=useState(false)
      const [verifyOtpDisplay,setVerifyOtpDisplay]=useState(true)
      const [verifyOtpDisable,setVerifyOtpDisable]=useState(false)
      const [verifyButtonDisable,setVerifyButtonDisable]=useState(true)
      const [resendOtp,setresendOtp]=useState(true)
      const [timer,setTimer]=useState(true)
      const [time,setTime]=useState(120)
      const [otpGenerated,setOtpGenerated]=useState(false)
   const [resendOtpDisplay,setResendOtpDisplay]=useState(true)
   const [inputPasswordDisplay,setInputPasswordDisplay]=useState(false)
   const [generateOtpDisable,setGenerateOtpDisable]=useState(false)
   const [submitPasswordDisable,setSubmitPasswordDisable]=useState(true)
  
      const passwordInitalState={
        password:'',
        repeatepassword:''
       }
       const navigate=useNavigate()
       const [checkPassword,setCheckPassword]=useState(passwordInitalState)
       function passwordChange(e){
        setCheckPassword({...checkPassword,[e.target.name]:e.target.value})
 }
       function emailChange(e){
              setEmail({...email,[e.target.name]:e.target.value})
       }

       function geneteateOtpClick(e){
        e.preventDefault()
        if(email.email==null || email.email==''){
          toast.error("email Id is required")
          return
        }
        setGenerateOtpDisable(true)
        axios.post("http://localhost:8080/forgetpasswordotp",{...email,time:Date.now()}).then((res)=>{
          try{
            localStorage.setItem("forgetpasswordemail",email.email)
            toast.success(res.data.message)
            setGenerateOtpDisplay(true)
           setVerifyOtpDisplay(false)
           setEmailDisable(true)
           setOtpGenerated(true)
            }catch{}
          
        }).catch((err)=>{
          try{
            setGenerateOtpDisable(false)
            toast.error(err.response.data.message)
           }catch{}
        })
       }

     async  function verifyOtpClick(e){
          e.preventDefault()
          await axios.post("http://localhost:8080/forgetpasswordverifyotp",email).then((res)=>{
            try{
              toast.success(res.data.message)
              }catch{}
            setVerifyOtpDisable(true)
            setVerifyButtonDisable(true)
            setResendOtpDisplay(false)
            setInputPasswordDisplay(true)
          })
          .catch((err)=>{
            try{
              toast.error(err.response.data.message)
             }catch{}
          })
       }


       const resendOtpFunc=useCallback(async(e)=>{  

        e.preventDefault()
        setresendOtp(true)
        
        const email=localStorage.getItem("forgetpasswordemail")
       
        await axios.post("http://localhost:8080/forgetpasswordotp",{email:email,time:Date.now()}).then((res)=>{  

          console.log(res)
          try{
          toast.success(res.data.message)
          }catch{}
          setresendOtp(true)
          setTimer(true)
        
          setTime(120)
           }).catch(err=>{
             console.log(err)
            
             try{
               toast.error(err.response.data.message)
             }
             catch{ }
           })
      },[])
      
      useEffect(()=>{
       if(checkPassword.password=='' || checkPassword.repeatepassword==''){
        setSubmitPasswordDisable(true)
       }
       else{
        setSubmitPasswordDisable(false)
       }
      },[checkPassword])

      useEffect(()=>{
        if(email.otp){
          if(email.otp.length==6){
            setVerifyButtonDisable(false)
            return
          }
          else{
            setVerifyButtonDisable(true)
            return
          }
        }
      },[email])

       useEffect(()=>{
       
          const intervalId=setInterval(()=>{
            if(otpGenerated){ 
            setTime(previousTime=>{
              if(previousTime<=0 ){
                clearInterval(intervalId)
                setresendOtp(false)
                setTimer(false)
                return 0;
              }
              
              else if(previousTime>0 ) return previousTime-1;
            })}
          },1000)
   
        },[otpGenerated,timer])
        
        const min=Math.floor(time/60)
        const sec=time%60;

      async  function submitPasswordClick(e){
         e.preventDefault()
         let uppercase=1;
         let specialchar=1;
         let num=1;

       for (let i = 0; i < checkPassword.password.length; i++) {
        let asckey=checkPassword.password.charCodeAt(i)
        console.log(asckey)
          if(asckey>=65 && asckey<=90) uppercase=0;
          else if((asckey>=33 && asckey<=47) || (asckey>=58 && asckey<=64) || (asckey>=91 && asckey<=96) || (asckey>=123 && asckey<=126)) specialchar=0;
          else if(asckey>=48 && asckey<=57)num=0;
        
       }
        
       

         if(uppercase || specialchar || num){
          toast.error("password must contain uppercase ,special character and number")
          return;
         }
         if(checkPassword.password.length<=6){
          toast.error("password length should be greater than 6")
          return;
         }

         if(checkPassword.password!=checkPassword.repeatepassword){
          toast.error("password not match")
          return
         }
    
       


         await axios.patch("http://localhost:8080/updateforgetpassword",{email:email.email,password:checkPassword.password}).then((res)=>{
          try{
            toast.success(res.data.message)
            navigate('/login')
            }catch{}
         }).catch((err)=>{
          try{
            toast.error(err.response.data.message)
           }catch{}
         })
        }
  return (
    <>
  
    <form className="form-center" >
      <div className="Forget-container">
    
          <div className="form-group">
            <label htmlFor="Email"><b>Enter Your Email :-</b></label>
            <input
              type="email"
              id="Email"
              name="email"
              disabled={emailDisable}
              className="input-field"
              value={email.email}
              onChange={emailChange}
            />
            <button disabled={generateOtpDisable}  style={{display:generateOtpDisplay?"none":"block"}} className="generate-otp-button" onClick={geneteateOtpClick}>Generate OTP</button>
          </div>

        <div className='verify-otp' style={{display:verifyOtpDisplay?"none":"block"}}> 
          <label>Enter Your Otp</label>
        <input
               disabled={verifyOtpDisable}
              type="number"
              id="otp"
              name="otp"
              placeholder='enter otp'
              value={email.otp}
              onChange={emailChange}
            />
            <button  className="verify-otp-button" disabled={verifyButtonDisable} onClick={verifyOtpClick}>verify</button>

            <div style={{display:resendOtpDisplay?"block":"none"}}><button disabled={resendOtp} onClick={resendOtpFunc} id='resend-password-otp'>Resend otp</button><br></br>
                  <p className='password-timer'>in  {min}:{sec<10?`0${sec}`:sec} min</p>
                  
            </div> 
            </div>
  

             <div className='set-password' style={{display:inputPasswordDisplay?"block":"none"}}>
             <input
              type="password"
              id="password"
              name="password"
              placeholder='enter new password'
              className="input-field"
              value={checkPassword.password}
              onChange={passwordChange}
            />
              <input
              type="password"
              id="repeatepassword"
              name="repeatepassword"
              className="input-field"
               placeholder='re-enter new password'
              value={checkPassword.repeatepassword}
              onChange={passwordChange}
            />
            
            <button className="submit-password" disabled={submitPasswordDisable} onClick={submitPasswordClick}>Submit</button>
             </div>
      
       
      </div>
    </form>
   
    </>
  );
};

export default ForgetPassword;
