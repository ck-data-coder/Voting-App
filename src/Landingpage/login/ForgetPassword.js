import React, { useEffect, useState } from 'react';
import './ForgetPassword.css'; // Import the CSS file
import axios from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';

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
   const [generateotpSpinnerDisplay,setGenerateOtpSpinnerDisplay]=useState(false)
  const [resendotpAndVerifySpinnerDisplay,setResendOtpAndVerifySpinnerDisplay]=useState(false)
 
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
        setGenerateOtpSpinnerDisplay(true)
        axios.post("http://localhost:8080/forgetpasswordotp",{...email,time:Date.now()}).then((res)=>{
          try{
            localStorage.setItem("forgetpasswordemail",email.email)
            toast.success(res.data.message)
            setGenerateOtpDisplay(true)
            setGenerateOtpSpinnerDisplay(false)
           setVerifyOtpDisplay(false)
           setEmailDisable(true)
           setOtpGenerated(true)
            }catch{}
          
        }).catch((err)=>{
          try{
            setGenerateOtpDisable(false)
            setGenerateOtpSpinnerDisplay(false)
            toast.error(err.response.data.message)
           }catch{}
        })
       }

     async  function verifyOtpClick(e){
          e.preventDefault()
          setResendOtpAndVerifySpinnerDisplay(true)
          await axios.post("http://localhost:8080/forgetpasswordverifyotp",email).then((res)=>{
            try{
              toast.success(res.data.message)
              }catch{}
            setVerifyOtpDisable(true)
            setResendOtpAndVerifySpinnerDisplay(false)
            setVerifyButtonDisable(true)
            setResendOtpDisplay(false)
            setVerifyOtpDisplay(true)
            setInputPasswordDisplay(true)
          })
          .catch((err)=>{
            try{
              setResendOtpAndVerifySpinnerDisplay(false)
              toast.error(err.response.data.message)
             }catch{}
          })
       }


       const resendOtpFunc=useCallback(async(e)=>{  

        e.preventDefault()
        setresendOtp(true)
        setResendOtpAndVerifySpinnerDisplay(true)
        const email=localStorage.getItem("forgetpasswordemail")
       
        await axios.post("http://localhost:8080/forgetpasswordotp",{email:email,time:Date.now()}).then((res)=>{  

          console.log(res)
          try{
          toast.success(res.data.message)
          }catch{}
          setresendOtp(true)
          setTimer(true)
          setResendOtpAndVerifySpinnerDisplay(false)
          setTime(120)
           }).catch(err=>{
             console.log(err)
             setResendOtpAndVerifySpinnerDisplay(false)
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
  
    <form className="password-form-center" >
      <div className="Forget-container">
    
          <div className="password-form-group">
            <label htmlFor="Email"><b>Enter Your Email :-</b></label>
            <input
              type="email"
              id="Email"
              name="email"
              disabled={emailDisable}
              className="forgetpassword-email-input-field"
              value={email.email}
              onChange={emailChange}
            />
            <button disabled={generateOtpDisable}  style={{display:generateOtpDisplay?"none":"inline-block"}} className="forgetpassword-generate-otp-button" onClick={geneteateOtpClick}>Generate OTP</button>
            {generateotpSpinnerDisplay?  <div className='forgetpassword-spinner'>
           <Spinner></Spinner>
            </div>:null}
          </div>

        <div className='forgetpassword-verify-otp' style={{display:verifyOtpDisplay?"none":"block"}}> 
          <label>Enter Your Otp</label>
        <input
               disabled={verifyOtpDisable}
              type="number"
              id="otp"
              name="otp"
              placeholder='enter otp'
              value={email.otp}
              onChange={emailChange}
              className='forgetpassword-otp-input-field'
            />
          
             
            <div style={{display:resendOtpDisplay?"inline-block":"none"}}><button disabled={resendOtp} type='resend-otp' onClick={resendOtpFunc} id='forgetpassword-resend-password-otp'>Resend otp</button><br></br>
                  <p className='forgetpassword-password-timer'>in  {min}:{sec<10?`0${sec}`:sec} min</p>
                  
            </div> 
          {resendotpAndVerifySpinnerDisplay?  <div className="forgetpassword-verify-resendotp-spinner-display">
            <Spinner></Spinner>
            </div>: null}
            <button  className="forgetpassword-verify-otp-button" disabled={verifyButtonDisable} onClick={verifyOtpClick}>verify</button>
            </div>
           

             <div className='forgetpassword-set-password' style={{display:inputPasswordDisplay?"block":"none"}}>
             <input
              type="password"
              id="password"
              name="password"
              placeholder='enter new password'
              className="newpassword-input-field"
              value={checkPassword.password}
              onChange={passwordChange}
            />
              <input
              type="password"
              id="repeatepassword"
              name="repeatepassword"
              className="newpassword-input-field"
               placeholder='re-enter new password'
              value={checkPassword.repeatepassword}
              onChange={passwordChange}
            />
            
            <button className="forgetpassword-submit-password" disabled={submitPasswordDisable} onClick={submitPasswordClick}>Submit</button>
             </div>
      
       
      </div>
    </form>
   
    </>
  );
};

export default ForgetPassword;
