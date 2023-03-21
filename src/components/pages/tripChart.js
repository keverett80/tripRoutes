import React, { useState, useEffect } from 'react';
import { MDBChart, MDBCol } from 'mdb-react-ui-kit';
import { listTrips } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { listEmployees } from '../../graphql/queries';


export default function App() {
  const [tripData, setTripData] = useState([]);
  const [chartTitle, setChartTitle] = useState([]);
  const [DRIVER_COLORS, setDriverColors] = useState([]);

  useEffect(() => {
    async function fetchData() {

        // Fetch employee data
  const apiDataEmployee = await API.graphql(graphqlOperation(listEmployees));
  const employeeData = apiDataEmployee.data.listEmployees.items;

  // Generate driver colors based on employee email addresses
  const driverColors = {};
    const availableColors = ['#50648E', '#b3ee3a', '#535d72', '#1ca9c9', '#ffff6a', '#B0E0E6', '#556B2F', '#FFA07A', '#00BFFF', '#DA70D6', '#00FFFF', '#FFD700', '#00FA9A', '#4B0082', '#FF1493', '#9400D3', '#FFA500'];
    let colorIndex = 0;
    employeeData.forEach(employee => {
      if (!driverColors[employee.emailAddress]) {
        driverColors[employee.emailAddress] = availableColors[colorIndex % availableColors.length];
        colorIndex++;
      }
    });

  // Do something with driverColors, e.g. update state
setDriverColors( driverColors);
      const today = new Date();
      const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
      const apiData = await API.graphql(graphqlOperation(listTrips, { limit: 1000 }));
      const data = apiData.data.listTrips.items.filter(trip => {
        const appointmentDate = new Date(trip.appointmentDate);
        const tripStatus = trip.status;
        return (appointmentDate >= weekStart && appointmentDate <= today) && tripStatus === 'complete';
      });
      setTripData(data);


      const days = [];
      for (let i = 0; i <= 30; i++) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + i);
        days.push(date);
      }
      setChartTitle(days);
    }

    fetchData();
  }, []);

  // Create an object to hold the data for each driver
  const driverData = {};
  tripData.forEach(trip => {
    const driver = trip.driver;
    if (!driver || driver === 'null') {
      return;
    }

    const date = new Date(Date.parse(trip.appointmentDate));
    const dateString = date.toDateString(); // Group data by appointment date instead of day of the week

    if (!driverData[driver]) {
      driverData[driver] = {};
    }

    if (!driverData[driver][dateString]) {
      driverData[driver][dateString] = 1;
    } else {
      driverData[driver][dateString]++;
    }
  });

  // Convert the driver data into a format that can be used by the chart
  const chartData = {
    labels: chartTitle.map(date => date.toLocaleDateString()),
    datasets: []
  };
  Object.keys(driverData).forEach((driver, index) => {
    const color = DRIVER_COLORS[driver] || '#000000'; // Fallback to black if no color is specified
    const data = {
      label: driver,
      data: chartTitle.map(date => driverData[driver][date.toDateString()] || 0), // Use the appointment date instead of day of the week
      borderColor: color,
      backgroundColor: color,
      fill: false
    };
    chartData.datasets.push(data);
  });

  return (
    <MDBCol lg='9'>
    <MDBChart
        type='bar'
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Trips by Day for the Past 30 Days'
            },
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </MDBCol>
  );
}
