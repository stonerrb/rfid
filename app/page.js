"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [employeesData, setEmployeesData] = useState([]);

  useEffect(() => {
    fetch('http://44.201.255.58:3000/api/')
      .then(response => response.json())
      .then(data => setEmployeesData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
      <h1 className="text-3xl mb-4 text-center">Employee Logging</h1>
      <p className="text-lg mb-4 text-center">{currentDate}</p>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-blue-500 text-white p-2">Employee ID</th>
            <th className="bg-blue-500 text-white p-2">Employee Name</th>
            <th className="bg-blue-500 text-white p-2">In Time</th>
            <th className="bg-blue-500 text-white p-2">Out Time</th>
            <th className="bg-blue-500 text-white p-2">Total Time</th>
          </tr>
        </thead>
        <tbody>
          {employeesData.map((employee, index) => (
            <tr key={index} className="text-align-center"> 
              <td className="p-2 text-center">
                <Link href={`/${employee.employeeId}`}>
                <span className="text-blue-500 hover:underline">{employee.employeeId}</span>
            </Link>
              </td>
              <td className="p-2 text-center">{employee.employeeName}</td>
              <td className="p-2 text-center">{employee.inTime ? new Date(employee.inTime).toLocaleTimeString() : '-'}</td>
              <td className="p-2 text-center">{employee.outTime ? new Date(employee.outTime).toLocaleTimeString() : '-'}</td>
              <td className="p-2 text-center">{calculateTotalTime(employee.inTime, employee.outTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
