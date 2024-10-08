import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Userheader from "../userdashboard/Userheader";
import './user.css'
import Footer from "../Landingpage/Footer";

const parties = [
  { logo: "./logo-photos/logo-bjp.png", name: "Bhartiy Janta Party", memberName: "Narendra Modi" },
  { logo: "./logo-photos/CPI-logo.png", name: "Communist Party of India", memberName: "Avishkar Kale" },
  { logo: "./logo-photos/Indian_National_Congress-logo.webp", name: "Indian National Congress", memberName: "Rahul Gandhi" },
  { logo: "./logo-photos/NPP_Flag-logo.jpg", name: "National People's Party", memberName: "Chaitanya Kaklij" },
  { logo: "./logo-photos/AAP-logo.png", name: "Aam Adami Party", memberName: "Avishkar Kale" },

  // More parties can be added here dynamically by the admin
];
const partynames=[]
parties.map((party)=>{
   partynames.push(party.name)
})

const User = () => {
  const [epic, setEpic] = useState({ epic_no: "" });
  const [verifydisable, setVerifyDisable] = useState(true);
  const [inputdisable, setInputdisable] = useState(false);
  const [displayparties,setDisplayParties]=useState(false)
  const navigate = useNavigate();
  const token=localStorage.getItem('token')
  function epicChange(e) {
    setEpic({ ...epic, [e.target.name]: e.target.value });
  }

  function veryfyClick(e) {
  axios.post("/api/userepicverify",epic,{
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
     
    }
  }).then((res)=>{
  setDisplayParties(true)
  setVerifyDisable(true)
  setInputdisable(true)
  try{
    toast.success(res.data.message)
    }catch{}
  }).catch((err)=>{
    try{
      toast.error(err.response.data.message)
     }catch{}
  })

  }
 
  async function gettargettime(){
    await axios.get('/api/gettargettime').then((res)=>{
       
    }).catch(()=>{
      navigate('/')
      return;
    })
   }

   async function gettimecalToDisplayElectionButton(){
    await axios.get('/api/gettimecalToDisplayElectionButton').then((res)=>{
     localStorage.setItem("timecalToDisplayElectionButton",res.data)
    }).catch(()=>{})
   }

  useEffect(()=>{
    window.scrollTo(0, 0); 
    gettimecalToDisplayElectionButton()
 gettargettime()
  },[])

  useEffect(() => {

    console.log("epic len: " + epic.epic_no.length);
    if (epic.epic_no.length === 10) {
    
      setVerifyDisable(false);
    } else {
      setVerifyDisable(true);
    }
  }, [epic]);


function voteClick(partyname){
 const time= localStorage.getItem('timecalToDisplayElectionButton')
const data={
  party_name:partyname,
  epic_no:epic.epic_no,
  time:time
}

axios.post("/api/uservote",data,{
  headers: {
    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
   
  }
}).then((res)=>{
  try{
    toast.success(res.data.message)
    navigate('/dashboard')
    }catch{}

}).catch((err)=>{
  try{
    toast.error(err.response.data.message)
   }catch{}
})

}

  return (
    <>
      <Userheader></Userheader>
      <div className="container">
        <label htmlFor="epic-no">Enter Your Epic-number:</label>
        <input
          type="text"
          name="epic_no"
          value={epic.epic_no}
          placeholder="Enter your epic number"
          onChange={epicChange}
          id="btn"
          disabled={inputdisable}
        />
        <button
          className="verify"
          disabled={verifydisable}
          onClick={veryfyClick}
        >
          Verify
        </button>
      </div>

      <div style={{display:displayparties?"flex":"none"}} className="voting-container" >
        {parties.map((party, index) => (
          <div className="party-card" key={index}>
            <img
              src={require(`${party.logo}`)}
              alt={`${party.name} logo`}
              className="party-logo"
            />
            <h3 className="party-name">{party.name}</h3>
            <h3 className="party-name">{party.memberName}</h3>
            <button className="vote-button" onClick={()=>voteClick(party.name)}>Vote</button>
          </div>
        ))}
      </div>
      <div className="voteforparty-footer">
      <Footer></Footer>
      </div>
    </>
  );
};

export { User, partynames };
