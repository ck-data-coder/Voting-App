import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css'
import Userheader from './Userheader';
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';


const Dashboard = () => {
  const navigate=useNavigate()
const [remaingTime,setRemainingTime]=useState()
const [displayTime,setDisplayTime]=useState(false)
let remainingTime = localStorage.getItem('remaingtime');
let targetTime=localStorage.getItem("targetTime")
  useEffect(()=>{
 
     
     
      // Function to update the remaining time every second
      if(targetTime){
        setDisplayTime(true)
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = targetTime - now;
        localStorage.setItem("remaingtime",timeLeft)
     
        // Update state with the remaining time
        setRemainingTime(timeLeft);
  
        // If the countdown is over, stop the interval and clear local storage
        if (timeLeft <= 0) {
          localStorage.removeItem('targetTime');
          clearInterval(interval);
          localStorage.setItem('election',"election ended")
          setRemainingTime(0);
        }
      }, 1000);
    }
     else setDisplayTime(false)
  },[])


  const images = [
    require('./photos/slide1.jpg'),
    require('./photos/slide2.jpg'),
    require('./photos/slide3.jpg'),
    require('./photos/slide4.jpg'),
    require('./photos/slide5.jpg'),
    require('./photos/slide6.jpg'),
    require('./photos/slide7.jpg'),
    require('./photos/slide8.jpeg'),
    require('./photos/slide9.jpeg'),
    require('./photos/slide10.jpeg'),
    require('./photos/slide11.jpeg'),
    require('./photos/slide12.jpeg'),
    require('./photos/slide13.jpeg'),
    require('./photos/slide14.jpeg'),
    require('./photos/slide15.jpeg'),
    require('./photos/slide16.jpeg'),
    require('./photos/slide17.jpeg'),
    require('./photos/slide18.jpeg'),
  ];

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  function votingClick(){
    if(targetTime){
      navigate('/voteparty')
      return;
    }
    const electionButtonDisplayTime= localStorage.getItem("timecalToDisplayElectionButton")
    const time=Date.now()
    const electionStartTime= +electionButtonDisplayTime +(2*12*60*60*1000);

 if(time>electionStartTime){
  toast.error("election not started yet")
  return
 }
 else if(time<electionStartTime){
  toast.error("election ended")
  return
 }
  }

  function displayButtonClick(){
    const result=localStorage.getItem('result')
    if(targetTime){
       toast.error("voting is not ended yet")
      return
      }
     else if(result=="result pending"){
        toast.error("result is not release yet")
        return
      }
     else if(result=="result displayed"){
      navigate('/displayresult')
     }
  }
  return (
 
    <>
      <Userheader />
      <div className="time-display" style={{display:displayTime?"block":"none"}}>
    
    <h5>Election ends in : {formatTime(remaingTime)}</h5>
  </div>
      <div className="dashboard-container">
        <div className="custom-image-slider">
          <div className="custom-slides">
            {images.map((image, index) => (
              <img className="custom-slide-image" src={image} alt={`Slide ${index + 1}`} key={index} />
            ))}
          </div>
        </div>
        <div className="custom-content-container">
          <h1 className="custom-heading">Voter Services</h1>
          <div className="custom-service-container">
            <Link to={'/votercard'}>
              <button className="custom-service-button">
                <img className="custom-button-logo" src={require('./photos/apply.jpg')} alt="Apply Logo" />
                Apply for Voter ID Card
              </button>
            </Link>
            <Link to={'/downloadvotercard'}>
              <button className="custom-service-button">
                <img className="custom-button-logo" src={require('./photos/download-icon-vector-upload-button-260nw-2408758909.webp')} alt="Download Logo" />
                Download Voter ID Card
              </button>
            </Link>
            <Link to={'/updatevotercard'}>
              <button className="custom-service-button">
                <img className="custom-button-logo" src={require('./photos/update-button_592324-19469.avif')} alt="Update Logo" />
                Update Voter ID Card
              </button>
            </Link>
          
              <button className="custom-service-button" onClick={votingClick}>
                <img className="custom-button-logo" src={require('./photos/flat-design-vector-illustration-logo-260nw-1933475405.webp')} alt="Vote Logo" />
                Vote for Party
              </button>
              <Link to={'/previousresult'}>
              <button className="custom-service-button">
                <img className="custom-button-logo" src={require('./photos/previous.webp')} alt="Update Logo" />
               Previous result
              </button>
            </Link>
           
              <button className="custom-service-button" onClick={displayButtonClick} >
                <img className="custom-button-logo" src={require('./photos/result.jpeg')} alt="Update Logo" />
                result
              </button>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
