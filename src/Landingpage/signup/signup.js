import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'
import {  toast } from 'react-toastify';
import { setSignupcontext, Signupcontext } from '../../App';
import Spinner from '../Spinner';

const Signup = () => {
  const signupcon=useContext(Signupcontext)
  const setsignupcon=useContext(setSignupcontext)
  const signupInitialState={
    name:'',
    email:'',
    password:''
  }
 const passwordInitalState={
  password:'',
  repeatepassword:''
 }
 const [signupData,setSignupData]=useState(signupInitialState);
 const [passwordData,setPasswordData]=useState(passwordInitalState);
 const [otpdisplay,setotpdisplay]=useState('none')
 const [otp,setotp]=useState({otpval:''});
 const [error, setError] = useState('');
 const [terms,setTerms]=useState(false);
 const [signup,setSignup]=useState("generate otp")
 const [disable,setDisable]=useState(false)
 const [disableinput,setDisableinput]=useState(false)
 const [resendOtp,setresendOtp]=useState(true)
 const [time,setTime]=useState(120)
 const [timer,setTimer]=useState(true)
 const [spinnerdisplay,setSpinnerDisplay]=useState(false)

 function signupHandleChange(e){
setSignupData({...signupData,[e.target.name]:e.target.value});
 setError('')
 }
 function passwordHandleChange(e){
  setPasswordData({...passwordData,[e.target.name]:e.target.value});
  setError('')
}

const navigate=useNavigate();
function termsClick(e){
  e.stopPropagation();
  setTerms(!terms);
  if(!terms) setError('')
  console.log(terms)
}
function callBoth(e){
 signupHandleChange(e);
 passwordHandleChange(e);
}
async function signupSumbit(e){
  e.preventDefault();
  if(signupData.email=='' || signupData.name=='' || signupData.password==''){
   toast.error("name,email and password is required")
   return;
  }
  else{
  
         let uppercase=1;
         let specialchar=1;
         let num=1;

       for (let i = 0; i < signupData.password.length; i++) {
        let asckey=signupData.password.charCodeAt(i)
        console.log(asckey)
          if(asckey>=65 && asckey<=90) uppercase=0;
          else if((asckey>=33 && asckey<=47) || (asckey>=58 && asckey<=64) || (asckey>=91 && asckey<=96) || (asckey>=123 && asckey<=126)) specialchar=0;
          else if(asckey>=48 && asckey<=57)num=0;
       }

         if(uppercase || specialchar || num){
          toast.error("password must contain uppercase ,special character and number")
          return;
         }
         if(signupData.password.length<=6){
          toast.error("password length should be greater than 6")
          return;
         }
         if(passwordData.password!==passwordData.repeatepassword){
          toast.error("password does not match");
          return;
        }
        if(!terms){
          toast.error('check terms and conditions')
          return;
        }
  
if(signup=="generate otp"){
  setSpinnerDisplay(true)
  setsignupcon(signupData);
  setDisable(true)
  if(signup=="Register") setDisableinput(true)
  localStorage.setItem('signupdata',JSON.stringify(signupData))
 await axios.post("http://localhost:8080/signup",{signupData,signup:signup,time:Date.now()}).then((res)=>{
  try{
    setSpinnerDisplay(false)
    toast.success(res.data.message)
    }catch{}
 setSignup('Register')
 setDisable(true)
 setotpdisplay('block')
  }).catch(err=>{
    console.log(err)
    try{
      setDisable(false)
      setSpinnerDisplay(false)
      toast.error(err.response.data.message)
    }
    catch{

    }
  })
return;
}


 if(signup=="Register"){
  setSpinnerDisplay(true)
  if(otp.otpval.length==6){
    axios.post("http://localhost:8080/signup",{signupData,otp}).then(()=>{
      axios.post( "http://localhost:8080/signup",{signupData,data:"database"})
      .then(res=>{
       console.log(res.data);
    
       toast.success("signup success, please login")
       navigate('/');
      })
      .catch(err=>{
        try{
      
          toast.error(err.response.data.message)
          console.error(err.response.data.message);
        }
        catch{}
     
      })
      setSpinnerDisplay(false)
    }).catch((err)=>{
      try{
        toast.error(err.response.data.message)
        setSpinnerDisplay(false)
        console.error(err.response.data.message);
      }
      catch{}
    })
  }
 else{
  setSpinnerDisplay(false)
  toast.error("otp is incorrect")}
}}
}

  
const resendOtpFunc=useCallback(async(e)=>{
  e.preventDefault()
  setresendOtp(true)
  setSpinnerDisplay(true)
  const item=JSON.parse(localStorage.getItem('signupdata'))
  
  const signupData=item;
  console.log(signupData)
  await axios.post("http://localhost:8080/signup",{signupData,signup:signup}).then((res)=>{ 
    setSpinnerDisplay(false)
    setDisableinput(true)
    console.log(res)
    try{
    toast.success(res.data.message)
    }catch{}
    setresendOtp(true)
    setTimer(true)
    setTime(120)
     }).catch(err=>{
       console.log(err)
       setSpinnerDisplay(false)
       try{
         toast.error(err.response.data.message)
       }
       catch{ }
     })
},[])

useEffect(()=>{
const intervalId=setInterval(()=>{
  if(signup=="Register"){ 
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

 
},[signup,timer])

const min=Math.floor(time/60)
const sec=time%60;
useEffect(()=>{
  if(otp.otpval.length==6 || signup=='generate otp'){
    setDisable(false)
  }
  else setDisable(true)
},[otp])

function otpvalidate(e){
  setotp({...otp,[e.target.name]:e.target.value});
  
 setError('')
}



  return (
    <>
    <section class="vh-100" style={{backgroundColor: '#eee'}}>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{borderRadius: "25px"}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <h3 style={{marginLeft:"14%"}}>Welcome to Sales Panel</h3>
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input disabled={disableinput} type="text" onChange={signupHandleChange} name="name" id="validationDefault01"   class="form-control" required />
                      <label class="form-label" for="validationDefault01"><span style={{color:'red'}}>*</span>Your Name</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input disabled={disableinput} type="email" id="form3Example3c" name='email' onChange={signupHandleChange} value={signupData.email} pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" class="form-control"/>
                      <label class="form-label" for="form3Example3c"><span style={{color:'red'}}>*</span>Your Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input disabled={disableinput} type="password" id="form3Example4c" name='password'  onChange={callBoth} class="form-control" />
                      <label class="form-label" for="form3Example4c"><span style={{color:'red'}}>*</span>Password</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input disabled={disableinput} type="password" id="form3Example4cd" name='repeatepassword' onChange={passwordHandleChange} class="form-control" />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input disabled={disableinput} onClick={termsClick}   class="" type="checkbox" value="" id="form2Example3" style={{ position: 'relative',
    top: '-2px'}} />
                    <label class="" htmlFor="form2Example3">
                      I agree all statements in <Link to='/'>Terms of service</Link>
                    </label>
                  </div>
                  {error && <div style={{ color: 'red',position:'relative',top:'-40px' }}>{error}</div>}
                   

                   <div style={{'display':otpdisplay}} className='get-otp'>
                 
                  {/* <div class="d-flex  flex-row align-items-center mb-4 otp-generate">
                   
                  </div> */}
                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input type="text" onChange={otpvalidate} name="otpval" placeholder='enter otp' id="validationDefault01" value={otp.otpval} class="form-control " />
                      <label class="form-label" for="validationDefault01"></label>
                    </div>
                  <div><button disabled={resendOtp} onClick={resendOtpFunc} className='resend-otp'>Resend otp</button><br></br>
                  <p className='timer'>in  {min}:{sec<10?`0${sec}`:sec} min</p></div> 
                  </div>
                  <div className='signup-spinner'>
                   {spinnerdisplay?  <Spinner></Spinner>:null}
                  </div>
                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4 signup-spinner-adjust">
                   <button onClick={signupSumbit} disabled={disable} type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">{signup}</button>
                 </div>
                
                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src={require("./signup.jpg")}
                  class="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Signup