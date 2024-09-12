import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Currentelectionbarplot from './Currentelectionbarplot';
import Previouselctionchart from './Previouselctionchart';
import Previouselectiondata from './Previouselectiondata';
import './displayresult.css'; // Import CSS for styling

const Displayresult = () => {
  const electionTime = new Date(+localStorage.getItem("timecalToDisplayElectionButton")).toISOString().slice(0, 10);
  const [data, setdata] = useState();

  useEffect(() => {
    axios.get("http://localhost:8080/displayresult")
      .then((res) => {
        console.log(JSON.stringify(res.data));
        setdata(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let currentElectionVotedOrNot=1;
  return (
    <div className="display-result-container">
      {data ? data.map((e) => {
        if (e.date === electionTime) {
          currentElectionVotedOrNot=0;
          return (
            <div key={e.date} className="election-section">
              <div className="election-table-container">
                <p className="election-date">{`Date: ${e.date}`}</p>
                <h2 className="result-heading">Current Election Result</h2>
                <table className="result-table">
                  <thead>
                    <tr>
                      <th>Party Name</th>
                      <th>Vote Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {e.parties.map((party) => (
                      <tr key={party._id} className="result-row">
                        <td>{party._id}</td>
                        <td>{party.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="graph-container">
                <h3 className="graph-heading">Current Election Results Graph</h3>
                <div className="graph-wrapper">
                  <Currentelectionbarplot />
                </div>
              </div>
            </div>
          );
        }
        return null;
      }) : null}

{ currentElectionVotedOrNot?<h1>0 vote in current election</h1>:null}
      <div className="election-section">
       
        <div className="graph-container">
          <h3 className="graph-heading">Previous Election Data</h3>
          <div className="graph-wrapper">
            <Previouselectiondata />
          </div>
          <h3 className="graph-heading">Previous Election Chart</h3>
          <div className="graph-wrapper">
            <Previouselctionchart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Displayresult;
