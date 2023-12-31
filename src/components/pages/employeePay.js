import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listTrips } from '../../graphql/queries';
import { MDBTable, MDBTableHead, MDBTableBody, MDBSpinner } from 'mdb-react-ui-kit';

const getStartOfWeek = (date) => {
  const result = new Date(date);
  result.setDate(result.getDate() - result.getDay()); // Assuming Sunday is the start of the week
  return result;
};

const getEndOfWeek = (date) => {
  const result = getStartOfWeek(date);
  result.setDate(result.getDate() + 6); // Get the end of the week (Saturday)
  return result;
};

const DriverPaySummary = () => {
  const [driverPays, setDriverPays] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [fullWeek, setFullWeek] = useState(false);

  useEffect(() => {
    async function fetchData(selectedDate) {
      setLoading(true);
      try {
        const weekStart = getStartOfWeek(selectedDate);
        let weekEnd = selectedDate;
        if (fullWeek) {
          weekEnd = getEndOfWeek(selectedDate);
        }

        const apiData = await API.graphql(graphqlOperation(listTrips));
        const trips = apiData.data.listTrips.items;

        const tempDriverPays = {};
        trips.forEach(trip => {
          const tripDate = new Date(trip.appointmentDate);
          if (tripDate >= weekStart && tripDate <= weekEnd) {
            // Handle missing or undefined employeePay
            const pay = trip.employeePay ? parseFloat(trip.employeePay) : 0;
            const driver = trip.driver;
            tempDriverPays[driver] = (tempDriverPays[driver] || 0) + pay;
          }
        });

        setDriverPays(tempDriverPays);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData(selectedWeek);
  }, [selectedWeek, fullWeek]);

  const handleWeekChange = (event) => {
    const week = new Date(event.target.value);
    setSelectedWeek(week);
  };

  return (
    <div>
      <h2>Driver Pay Summary</h2>
      <label htmlFor="week-selector">Select Week:</label>
      <input type="date" id="week-selector" onChange={handleWeekChange} />
      <div>
        <label>
          <input
            type="checkbox"
            checked={fullWeek}
            onChange={() => setFullWeek(!fullWeek)}
          />
          Show full week
        </label>
      </div>

      {loading ? (
        <MDBSpinner />
      ) : (
        <MDBTable>
          <MDBTableHead dark>
            <tr>
              <th>Driver</th>
              <th>Total Pay</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {Object.entries(driverPays).length > 0 ? (
              Object.entries(driverPays).map(([driver, pay]) => (
                <tr key={driver}>
                  <td>{driver}</td>
                  <td>${parseFloat(pay).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No data available</td>
              </tr>
            )}
          </MDBTableBody>
        </MDBTable>
      )}
    </div>
  );
};

export default DriverPaySummary;
