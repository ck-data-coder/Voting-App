import Landingpage from './Landingpage/Landingpage.js';
import './App.css';
import {
BrowserRouter as Router,
Routes,
Route,



} from 'react-router-dom'
import Login from './Landingpage/login/Login.js';
import Signup from './Landingpage/signup/signup.js';
import {User} from './user/User.js';
import Admin from './admin/Admin.js';
import { createContext, useState } from 'react';
import Votercard from './votercard/Votercard.js';
import Dashboard from './userdashboard/Dashboard.js';
import Downloadvotercard from './userdashboard/Downloadvotercard.js';
import Updatevotercard from './userdashboard/Updatevotercard.js';
import Voterdata from './admin/Voterdata.js';
import ForgetPassword from './Landingpage/login/ForgetPassword.js';
import Displayresult from './admin/Displayresult.js';
import Previouselection from './admin/Previouselection.js';
import Aboutus from './Landingpage/static pages/Aboutus.js';
import Contactus from './Landingpage/static pages/Contactus.js';
import Privacypolicy from './Landingpage/static pages/Privacypolicy.js';
import Terms from './Landingpage/static pages/Terms.js';

const usercontext=createContext(null);
const setusercontext=createContext(null);
const datacontext=createContext(null);
const setdatacontext=createContext(null);
const Signupcontext=createContext(null);
const setSignupcontext=createContext(null);
function App() {
  const [user,setuser]=useState(null)
 const[data,setdata]=useState(null)
 const [signupCon,setSignupCon]=useState(null)

  return (<>
  <usercontext.Provider value={user}>
    <setusercontext.Provider value={setuser}>
      <datacontext.Provider value={data}>
        <setdatacontext.Provider value={setdata}>
           <Signupcontext.Provider value={signupCon}>
            <setSignupcontext.Provider value={setSignupCon}>
  <Router>
      <Routes>
        <Route exact path='/' element = {<Landingpage></Landingpage>}></Route>
        <Route exact path='/login' element = {<Login></Login>}></Route>
        <Route exact path='/signup' element = {<Signup></Signup>}></Route>
        <Route exact path='/voteparty' element = {<User></User>}></Route>
        <Route exact path='/admin' element = {<Admin></Admin>}></Route>
        <Route exact path='/votercard' element = {<Votercard></Votercard>}></Route>
        <Route exact path='/dashboard' element = {<Dashboard></Dashboard>}></Route>
        <Route exact path='/downloadvotercard' element = {<Downloadvotercard></Downloadvotercard>}></Route>
        <Route exact path='/updatevotercard' element = {<Updatevotercard></Updatevotercard>}></Route>
        <Route exact path='/votingdata' element = {<Voterdata></Voterdata>}></Route>
        <Route exact path='/forgetpassword' element = {<ForgetPassword></ForgetPassword>}></Route>
        <Route exact path='/displayresult' element = {<Displayresult></Displayresult>}></Route>
        <Route exact path='/previousresult' element = {<Previouselection></Previouselection>}></Route>

        <Route exact path='/About Us' element = {<Aboutus></Aboutus>}></Route>
        <Route exact path='/Contact Us' element = {<Contactus></Contactus>}></Route>
        <Route exact path='/Privacy Policy' element = {<Privacypolicy></Privacypolicy>}></Route>
        <Route exact path='/Terms of Service' element = {<Terms></Terms>}></Route>
      </Routes>
    </Router>
    </setSignupcontext.Provider>
    </Signupcontext.Provider>
    </setdatacontext.Provider>
    </datacontext.Provider>
    </setusercontext.Provider>
    </usercontext.Provider>
  </> 
  );
}
export {App,usercontext,setusercontext,setdatacontext,datacontext,setSignupcontext,Signupcontext};
