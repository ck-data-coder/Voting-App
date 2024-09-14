import React, { useEffect, useState } from "react";
import "./votercard.css"; // Make sure to create and link this CSS file
import data from "./data.js";
import axios from "axios";
import {toast} from 'react-toastify'
import Userheader from "../userdashboard/Userheader.js";
import indiaDistricts from "./districtdata.js";
import Footer from "../Landingpage/Footer.js";
import Spinner from "../Landingpage/Spinner.js";
function Votercard() {
  const initialState = {
    state: null,
    district: null,
    assembly_no: null,
    assembly_name: null,
    name: null,
    fname:null,
    gender:null,
    dob: null,
    aadhar:null,
    house_no: null,
    area: null,
    village: null,
    post_office: null,
    pincode: null,
    taluka: null,
    district: null,
    address_proof: null,
    picfile: null,
  };

 
  const [submitButtonDisable,setSubmitButtonDisable]=useState(true)
  const [votercardData, setvotercardData] = useState(initialState);
  const [districts, setdistricts] = useState([]);
  const [Assembly, setAssembly] = useState();
  const [spinnerdisplay,setSpinnerDisplay]=useState(false)

  function handlechange(e) {
    if(e.target.name=='state'){
      votercardData.district=null;
      setdistricts(null)
     }
     if(e.target.name=='district'){
      setAssembly(null)
      votercardData.assembly_name=null;
      votercardData.assembly_no=null;
     }
    if(e.target.name=="picfile"){ setvotercardData({ ...votercardData, [e.target.name]: e.target.files[0] });return};
    if(e.target.name=="address_proof"){ setvotercardData({ ...votercardData, [e.target.name]: e.target.files[0]});return};
    setvotercardData({ ...votercardData, [e.target.name]: e.target.value });
   
   
  }

  useEffect(() => {
    Object.keys(indiaDistricts).map((e) => {
      const state = votercardData.state;
      if (e == state) {
        console.log(e);
        setdistricts(indiaDistricts[e]);
        
      }
    });
   
  }, [votercardData.state]);
    


  function capitalizeFirstLetter(string) {
    if (!string) return ""; // Handle empty strings
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  useEffect(() => {
     let flag=1;
   
    [{ ...data }].map((e) => {
      Object.keys(e).forEach(function (currentValue, index, array) {
        const district = votercardData.district;
       
        if (capitalizeFirstLetter(currentValue.toLowerCase()) == district) {
          flag=0;
          console.log(flag)
          console.log(votercardData)
       
          setAssembly(data[currentValue]);
          return
        }
       
      });
    });
    if(flag){ setAssembly(null)
      votercardData.assembly_name=null;
     votercardData.assembly_no=null
    }

    let submitdisableflag=1;
    Object.keys(votercardData).map((e)=>{
     if(votercardData[e]==null || votercardData[e]==''){
       submitdisableflag=0;
      return
    } 
  })
  if(submitdisableflag){
    setSubmitButtonDisable(false)
  }
  else{
    setSubmitButtonDisable(true)
  }
    console.log(votercardData)
  }, [votercardData]);
 

  function onSubmit(e) {
    e.preventDefault();
    setSubmitButtonDisable(true)
    setSpinnerDisplay(true)
    console.log(votercardData);
    const formData = new FormData();
    formData.append("state", votercardData.state);
    formData.append("district", votercardData.district);
    formData.append("assembly_no", votercardData.assembly_no);
    formData.append("assembly_name", votercardData.assembly_name);
    formData.append("name", votercardData.name);
    formData.append("fname", votercardData.fname);
    formData.append("gender", votercardData.gender);
    formData.append("dob", votercardData.dob);
    formData.append("aadhar", votercardData.aadhar);
    formData.append("house_no", votercardData.house_no);
    formData.append("area", votercardData.area);
    formData.append("village", votercardData.village);
    formData.append("post_office", votercardData.post_office);
    formData.append("pincode", votercardData.pincode);
    formData.append("taluka", votercardData.taluka);
  
    formData.append("address_proof", votercardData.address_proof);
    formData.append("picfile", votercardData.picfile);
    console.log([...formData.entries()]);
    const token=localStorage.getItem('token');
     axios.post("http://localhost:8080/votercard" ,formData ,{
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
       
      }
    } ).then((res) => {

      try{
        toast.success(res.data.message)
        setSpinnerDisplay(false)
        }catch{}
        
    }).catch((err)=>{
      try{
        setSubmitButtonDisable(false)
        toast.error(err.response.data.message)
        setSpinnerDisplay(false)
      }
      catch{ }
    });
    console.log(formData);
  }

  return (
    <>
    <Userheader></Userheader>
      <form  enctype="multipart/form-data" >
        <div className="form-6">
          <h1 className="form-title">Voting-Form</h1>

          <h2 className="section-title">
            A. Select State, District & Assembly/Parliamentary Constituency
          </h2>
          <label htmlFor="state">Select Your State:</label>
         
          <select
            onChange={handlechange}
            selected={null}
            value={votercardData.state}
            name="state"
            id="state"
            required
          >
              <option value={null}>--Select--</option>
            <option value="Andhra_Pradesh">Andhra Pradesh</option>
            <option value="Arunachal_Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal_Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya_Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil_Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar_Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West_Bengal">West Bengal</option>
            <option value="Andaman_and_Nicobar_Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Dadra and Nagar Haveli and Daman and Diu">
              Dadra and Nagar Haveli and Daman and Diu
            </option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Delhi">Delhi</option>
            <option value="Puducherry">Puducherry</option>
            <option value="Ladakh">Ladakh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          </select>

          <label htmlFor="District">Select Your District:</label>
          <select onChange={handlechange} name="district"  id="District" required>
          <option value={null}>--Select--</option>
            {districts ? districts.map((e) => {
                  return <option value={e}>{e}</option>;
                })
              : null}
          </select>

          <label htmlFor="Assembly">No. & Assembly Constituency</label>
          <select
            onChange={handlechange}
            type="number"
           
            value={votercardData.assembly_no}
            name="assembly_no"
            id="Assembly"
            placeholder="No."
            required
          >
               <option value={null}>--Select--</option>
            {Assembly
              ?
               Assembly.map((e) => {
                  return <option value={e[1]}>{e[1]}</option>;
                })
              : null}
          </select>
          <select
            onChange={handlechange}
            type="String"
            required
            value={votercardData.assembly_name}
            name="assembly_name"
            placeholder="Assembly Name"
            className="Assembly-Name"
          >   <option value={null}>--Select--</option>
            {Assembly
              ? Assembly.map((e) => {
                  return <option value={e[0]}>{e[0]}</option>;
                })
              : null}
          </select>

          <hr />

          <h2 className="section-title">B. Personal Details</h2>
          <div className="personal-details">
            <label htmlFor="name">Name-Include Your Full Name:</label>
            <input
              onChange={handlechange}
              type="text"
              required
              value={votercardData.name}
              name="name"
            />

             <label htmlFor="fname">Father Name:</label>
            <input
              onChange={handlechange}
              type="text"
              required
              value={votercardData.fname}
              name="fname"
            />
             <label htmlFor="gender">gender:</label>
           <input
              onChange={handlechange}
              type="radio"
              required
              value="male"
              name="gender"
            />Male
              <input
              onChange={handlechange}
              type="radio"
              required
              value="female"
              name="gender"
            />Female


            <label htmlFor="pic">
              Upload Photograph
              <br />
              (Unsigned And Passport Size Color Photograph (4.5 cm x 3.5 cm)
              Showing Front View of Full Face With White Background.)
              <br />
              (Document Size Maximum 2MB, .jpg, .jpeg):
            </label>
            <input
              type="file"
              id="picfile"
              name="picfile"
              onChange={handlechange}
              required
              
            />
          </div>
          <hr />
          <h2 className="section-title">C.Aadhar number</h2>
          <div className="dob">
            <label htmlFor="Dob">Aadhar number:</label>
            <input
            required
              onChange={handlechange}
              type="number"
              value={votercardData.aadhar}
              name="aadhar"
            />
          </div>
          <hr />
          <h2 className="section-title">D. Date Of Birth</h2>
          <div className="dob">
            <label htmlFor="Dob">Date of Birth:</label>
            <input
            required
              onChange={handlechange}
              type="date"
              value={votercardData.dob}
              name="dob"
            />
          </div>
          <hr />

          <h2 className="section-title">E. Present Address Details</h2>
          <div className="address">
            <label htmlFor="H-add">House/Building/Apartment No:</label>
            <input
            required
              onChange={handlechange}
              type="text"
              value={votercardData.house_no}
              name="house_no"
            />

            <label htmlFor="A-add">Street/Area/Locality/Mohalla/Road:</label>
            <input
            required
              onChange={handlechange}
              type="text"
              value={votercardData.area}
              name="area"
            />

            <label htmlFor="V-add">Village/Town:</label>
            <input
            required
              onChange={handlechange}
              type="text"
              value={votercardData.village}
              name="village"
            />

            <label htmlFor="Post-add">Post Office:</label>
            <input
            required
              onChange={handlechange}
              type="text"
              value={votercardData.post_office}
              name="post_office"
            />

            <label htmlFor="Pincode">Pincode:</label>
            <input
            required
              onChange={handlechange}
              type="number"
              value={votercardData.pincode}
              name="pincode"
            />

            <label htmlFor="T-add">Teshil/Taluqa/Mandal:</label>
            <input
            required
              onChange={handlechange}
              type="text"
              value={votercardData.taluka}
              name="taluka"
            />

            <label htmlFor="D-add">District:</label>
            <input
              onChange={handlechange}
              type="text"
              disabled
              value={votercardData.district}
              name="district"
            />

            <label htmlFor="Add-proof">
              Self Attested Copy of Address Proof:
            </label>
            <input
            required
              onChange={handlechange}
              type="file"
              name="address_proof"
            
            />
          </div>
          <button type="Submit" disabled={submitButtonDisable} onClick={onSubmit} className="submit">
            Submit
          </button>
         {spinnerdisplay? <Spinner></Spinner>:null}
        </div>
      </form>
      <Footer></Footer>
    </>
  );
}

export default Votercard;
