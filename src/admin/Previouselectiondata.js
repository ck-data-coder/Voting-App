import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './displayresult.css'; // Import CSS file

const Previouselectiondata = () => {
  const token=localStorage.getItem("token")
  async function gettimecalToDisplayElectionButton(){
    await axios.get('/api/gettimecalToDisplayElectionButton').then((res)=>{
     localStorage.setItem("timecalToDisplayElectionButton",res.data)
    }).catch(()=>{})
   }
   
    const timecalToDisplayElectionButton=localStorage.getItem("timecalToDisplayElectionButton")
     const electionTime=new Date(+timecalToDisplayElectionButton).toISOString().slice(0, 10)
  const [data, setdata] = useState();

  useEffect(() => {
    gettimecalToDisplayElectionButton()
    axios.get("/api/displayresult", {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        setdata(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="previous-election-container">
      {data ? data.map((e) => { 
        if (e.date !== electionTime) {
          return (
            <div key={e.date} className="previous-election-result">
              <p className="previous-election-date">{`Date: ${e.date}`}</p>
              <table className="previous-result-table">
                <thead>
                  <tr>
                    <th>Party Name</th>
                    <th>Vote Count</th>
                  </tr>
                </thead>
                <tbody>
                  {e.parties.map((party) => (
                    <tr key={party._id} className="previous-result-row">
                      <td>{party._id}</td>
                      <td>{party.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      }) : null}
    </div>
  );
}

export default Previouselectiondata;
