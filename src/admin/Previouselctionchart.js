import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { partynames } from '../user/User';

const PreviousElectionChart = () => {
  const electionTime = new Date(+localStorage.getItem("timecalToDisplayElectionButton")).toISOString().slice(0, 10);
  const [transformedData, setTransformedData] = useState([]);
  const [uniqueParties, setUniqueParties] = useState(new Set());

  const fetchPreviousElectionData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/displayresult");
      const previousElecData = response.data.filter(e => e.date !== electionTime);

      // Aggregate data per date
      const formattedData = previousElecData.map(item => {
        const partyData = { date: item.date };
        partynames.forEach(party => {
          const found = item.parties.find(p => p._id === party);
          partyData[party] = found ? found.count : 0; // Use 0 if the party doesn't exist on this date
        });
        return partyData;
      });

      setTransformedData(formattedData);

      // Collect unique party keys
      const uniqueKeys = new Set();
      formattedData.forEach(entry => {
        Object.keys(entry)
          .filter(key => key !== 'date' && entry[key] > 0)
          .forEach(key => uniqueKeys.add(key));
      });

      setUniqueParties(uniqueKeys);
      console.log(uniqueParties)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPreviousElectionData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={transformedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'No of Votes', angle: -90, position: 'insideLeft', offset: 0 }} allowDecimals={false} />
        <Tooltip />
        <Legend align="right" verticalAlign="top" />

        {/* Render bars for each unique party */}
        {[...uniqueParties].map((party) => (
          <Bar
          barSize={20}
            key={party} // Unique key for each Bar component
            dataKey={party}
            fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
            name={party} // Display name in the legend
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PreviousElectionChart;
