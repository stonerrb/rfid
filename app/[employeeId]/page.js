"use client"
import { useEffect, useState } from 'react';

function MyComponent({ params }) {
    const [employeeRecords, setEmployeeRecords] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://44.201.255.58:3000/api/employee/?id=${params.employeeId}`);
          const data = await response.json();
          setEmployeeRecords(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [params.employeeId]);
  
    const calculateTotalTime = (inTime, outTime) => {
        if (!inTime || !outTime) return '-';
        
        const inDateTime = new Date(inTime);
        const outDateTime = new Date(outTime);
    
        if (isNaN(inDateTime) || isNaN(outDateTime)) return '-';
    
        const totalTime = (outDateTime - inDateTime) / 1000; // Difference in seconds
        const hours = Math.floor(totalTime / 3600);
        const minutes = Math.floor((totalTime % 3600) / 60);
        const seconds = Math.floor(totalTime % 60);
        return `${hours}h ${minutes}m ${seconds}s`;
      };
    
      const currentDate = new Date().toDateString();

    return (
      <div className="bg-black text-white p-8">
        <h1 className="text-3xl mb-4 text-center">Employee Records for ID: {params.employeeId}</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-500 text-white p-2">Date</th>
              <th className="bg-blue-500 text-white p-2">In Time</th>
              <th className="bg-blue-500 text-white p-2">Out Time</th>
              <th className="bg-blue-500 text-white p-2">Total Time</th>
            </tr>
          </thead>
          <tbody>
            {employeeRecords.map((record, index) => (
              <tr key={index}>
                <td className="p-2 text-center">{new Date(record.inTime).toLocaleDateString()}</td>
                <td className="p-2 text-center">{new Date(record.inTime).toLocaleTimeString()}</td>
                <td className="p-2 text-center">{record.outTime ? new Date(record.outTime).toLocaleTimeString() : '-'}</td>
                <td className="p-2 text-center">{calculateTotalTime(record.inTime, record.outTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default MyComponent;
  