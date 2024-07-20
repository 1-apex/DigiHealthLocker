import React, { useState, useEffect } from 'react'
import PatientHeader from './PatientHeader'
import { NavLink } from 'react-router-dom'
import { ShimmerTable } from '../../../utils/Shimmer';
import { useAuth } from '../../../Store/AuthClient';
import '../doctor/term.css'

const AllAppointments = () => {
  const { user } = useAuth();
  let [pAllAppointments, setdoctorprovidedAllAppointments] = useState([]);
  const [appointmentsLoaded, setAppointmentsLoaded] = useState(false);

  // const handleRegistrationChange = (e) => {
  //   setRegistrationNo(e.target.value);

  // };

  const getTheList = async () => {

    // doctorAllAppointments = await allAppointments(registrationNo);
    // console.log("The appoinments are :", user.appointmnets);
    if (user) {
      console.log("User is:", user);
      // setRegistrationNo(user.registrationnumber);
      console.log("These are the appoinemts:", user.appointmnets);
      setdoctorprovidedAllAppointments(user.appointmnets)
      setAppointmentsLoaded(true);
      console.log("All the appointments:", pAllAppointments.length);
    }

  }
  useEffect(() => {
    console.log("This is load is going");
    getTheList();
  }, [])
  useEffect(() => {
    console.log("This is the main thing to be updated");

    getTheList();

  }, [user])
  return (
    <>
      <PatientHeader />
      <div className="overflow-x-auto flex items-center justify-center">

        <div className='w-5/6'>
          <div className='mt-10 flex justify-between'>
            <h1 className="text-3xl font-semibold text-center text-teal-600">Appointment List</h1>

          </div>
          {
            !appointmentsLoaded ? <ShimmerTable /> :
              appointmentsLoaded && pAllAppointments.length == 0 ? (<h1>There are no appointment</h1>) : (<table className="min-w-4xl bg-white shadow-lg rounded mt-10">
                <thead className='border'>
                  <tr className="text-left  text-teal-600">
                    <th className="py-3 px-4">Appointment ID</th>
                    <th className="py-3 px-4">Doctor Name</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Problem</th>

                    <th className="py-3 px-4">Details</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {pAllAppointments.map(appointment => (
                    <tr key={appointment._id}>
                      <td className="border-b py-3 px-4">{appointment.appointmentId}</td>
                      <td className="border-b py-3 px-4">{appointment.doctorName?.firstname} {appointment.doctorName?.lastname}</td>
                      <td className="border-b py-3 px-4">{new Date(appointment.appointmentDate).getDate() + "/" + (parseInt(new Date(appointment.appointmentDate).getMonth()) + 1) + "/" + new Date(appointment.appointmentDate).getFullYear()}</td>
                      <td className="border-b py-3 px-4">{appointment.time}</td>
                      <td className="border-b py-3 px-4 wrap-text">{appointment.problem}</td>

                      <td className="border-b py-3 px-4 underline text-sm hover:text-blue-600"><NavLink to={'appointmentdetails/' + appointment.appointmentId}>view more</NavLink></td>
                    </tr>
                  ))}
                </tbody>
              </table>)
          }

        </div>
      </div>
    </>
  )
}

export default AllAppointments