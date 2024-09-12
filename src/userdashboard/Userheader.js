import React, { useContext, useEffect, useState } from 'react';
import './userheader.css';
import { usercontext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Userheader = () => {
    const usercon = useContext(usercontext);
    const [profileDisplay, setProfileDisplay] = useState(false);
    const [username, setUsername] = useState('user');
    const [email, setemail] = useState('user')
    
    
        const token=localStorage.getItem('token');
        const navigate = useNavigate();
      
      
        console.log(usercon)
        axios.post('http://localhost:8080/userheader', usercon,{
            headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            }
          }).then((res) => {
            console.log(res)
            setUsername(res.data.data.username);
            setemail(res.data.data.email)
        }).catch(()=>{setUsername('user'); setemail('user')})
      
   
    

    const handleProfileClick = () => {
        setProfileDisplay(!profileDisplay);
    };

   function logoutClick(){
    localStorage.removeItem("token");
    navigate("/")
    
   }

    return (
        <>
             <header className="eci-header">
                <div className="eci-logo">
                    <img src={require('./photos/eci.png')} alt="ECI Logo" />
                </div>
                <div className="eci-title">
                    <h2>भारत निर्वाचन आयोग</h2>
                    <h1>Election Commission of India</h1>
                </div>
                <div className="eci-user-profile">
    <div className="eci-user-name" id="userName" onClick={handleProfileClick}>
        <img src={require('./photos/users-vector.jpg')} alt="User Icon" className="eci-user-icon" />
        <span>{username}</span>
    </div>
    <div className="eci-dropdown" id="dropdownMenu" style={{ display: profileDisplay ? 'block' : 'none' }}>
        <ul>
            <li><a href="#">Name - {username}</a></li>
            <li><a href="#"><strong>Email - {email}</strong></a></li>
            <li>
                <button className="logout-button" onClick={logoutClick}>
                    Logout <span className="arrow">&rarr;</span>
                </button>
            </li>
        </ul>
    </div>
</div>

            </header>

           
        </>
    );
};

export default Userheader;
