import React, { useState, useEffect } from 'react';
import PatientHeader from './PatientHeader'
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../../Store/AuthClient';
import '../doctor/term.css';

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();


  const getData = async () => {
    // Set loading to true while fetching data
    try {

      if (user) {
        const listOfAppointments = user.appointmnets;
        console.log("The total list is: ", listOfAppointments);

        const foundAppointment = listOfAppointments.find(appointment => appointment.appointmentId === id);

        setAppointment(foundAppointment);

      }

    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false); // Set loading to false after data is fetched
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [user, appointment]);


  // if (!appointment) {
  //   return <div>Appointment not found</div>;
  // }
  // if (!appointment || Object.keys(appointment).length === 0) {
  //   return <div>Appointment not found</div>;
  // }
  if (isLoading) {
    return <><PatientHeader /><div><div className="loader"></div></div></>; // Show loading indicator
  }

  return (
    <>
      <PatientHeader />
      <div className="container mx-auto mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="w-full">
            <div className='flex justify-between'>
              <h3 className="text-lg font-semibold text-teal-600 p-2">Appointment Details</h3>
            </div>
            {
              isLoading ? (<div className="loader"></div>) : (<div className="bg-white rounded-lg shadow-lg">
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <tbody>
                        <tr className="border-b border-teal-600">
                          <td className="font-semibold pr-4 pt-2 pb-2">Appointment ID</td>
                          <td className="pr-4 pt-2 pb-2">{id}</td>
                        </tr>
                        <tr className="border-b border-teal-600">
                          <td className="font-semibold pr-4 pt-2 pb-2">Hospital Name</td>
                          <td className="pr-4 pt-2 pb-2">{appointment.hospitalName}</td>
                        </tr>
                        {/* <tr className="border-b border-teal-600">
                          <td className="font-semibold pr-4 pt-2 pb-2">Department</td>
                          <td className="pr-4 pt-2 pb-2">{appointment.department}</td>
                        </tr> */}
                        <tr className="border-b border-teal-600">
                          <td className="font-semibold pr-4 pt-2 pb-2">Doctor Name</td>
                          <td className="pr-4 pt-2 pb-2">{appointment.doctorName?.firstname}  {appointment.doctorName?.lastname}</td>
                        </tr>
                        <tr className="border-b border-teal-600">
                          <td className="font-semibold pr-4 pt-2 pb-2">Appointment Date</td>
                          <td className="pr-4 pt-2 pb-2">{new Date(appointment.appointmentDate).getDate() + "/" + (parseInt(new Date(appointment.appointmentDate).getMonth()) + 1) + "/" + new Date(appointment.appointmentDate).getFullYear()}</td>
                        </tr>
                        <tr className="border-b border-teal-600">
                          <td className="font-semibold pr-4 pt-2 pb-2">Time Slot</td>
                          <td className="pr-4 pt-2 pb-2">{appointment.time}</td>
                        </tr>
                        <tr className="border-b border-teal-600">
                          <td className="font-semibold pr-4 pt-2 pb-2 ">Problem</td>
                          <td className="pr-4 pt-2 pb-2 wrap-text">{appointment.problem}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>)
            }

          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentDetails;
