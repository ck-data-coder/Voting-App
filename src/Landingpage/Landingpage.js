import './landingpage.css'
import data from './data.json'
import { Link, useNavigate } from 'react-router-dom'
import Dashboard from '../userdashboard/Dashboard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Admin from '../admin/Admin'
import Footer from './Footer'
function Landingpage() {
    const navigate=useNavigate()
    const [useroradmin,setuseroradmin]=useState()
    const token=localStorage.getItem('token')
  useEffect(()=>{
   axios.get("http://localhost:8080/landingpage",{
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
     
    }
  }).then((res)=>{
    console.log(res.data)
    if(res.data.data=='user'){
        setuseroradmin('user');
      navigate("/dashboard")
        console.log(useroradmin)
        return
    }
    else if(res.data.data=='admin'){
        setuseroradmin('admin');
       navigate('/admin')
        console.log(useroradmin)
        return
    }  
    else {
        setuseroradmin(false)
      
    }
    console.log(useroradmin)
   }).catch((err)=>{
    setuseroradmin(false)
   })
  },[])
    return (
       
   
        useroradmin=='user'? <Dashboard></Dashboard>:useroradmin=='admin'?<Admin></Admin>:<>
         <header>
                <img src={require('./login/logo.jpg')}></img>
                <div className="landing-logo">Voting App</div>
                <nav>
                    <ul>
                       <Link to={'/login'}><li><button>Login</button></li></Link>
                       <Link to={'/signup'}><li><button>signup</button></li></Link>
                    </ul>
                </nav>
            </header>

            <section className="hero">
                <h1>Welcome to the Voting Application</h1>
                <p>Check state-wise Lok Sabha and Vidhan Sabha seats below.</p>
            </section>

            <section className="seats">
                <h2>State-wise Seats</h2>
                <div className="states">
                    {data.map((value) => {
                        return(
                        <div className="state">
                            <h3>{value.state}</h3>
                            <p>Lok Sabha Seats:{value.loksabha}</p>
                            <p>Vidhan Sabha Seats:{value.vidhansabha}</p>
                        </div>
                        )
                    })}

                </div>
            </section>

            
           <Footer></Footer>
            </>
      
        
    )
}

export default Landingpage;