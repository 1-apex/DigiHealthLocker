import React, { useEffect, useState } from 'react'
import DoctorHeader from './DoctorHeader'
import allAppointments from '../../../utils/allAppointments'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../Store/AuthClient'
import './term.css'
import { ShimmerTable } from '../../../utils/Shimmer'

const DoctorAppointments = () => {

  const { user } = useAuth();
  let [doctorAllAppointments, setdoctorAllAppointments] = useState([]);
  const [appointmentsLoaded, setAppointmentsLoaded] = useState(false);

  // const handleRegistrationChange = (e) => {
  //   setRegistrationNo(e.target.value);

  // };

  const getTheList = async () => {
    // doctorAllAppointments = await allAppointments(registrationNo);
    // console.log("The appoinments are :", user.appointmnets);
    if (user) {
      // setRegistrationNo(user.registrationnumber);
      setdoctorAllAppointments(user.appointmnets)
      console.log(doctorAllAppointments);
      setAppointmentsLoaded(true);
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
      <DoctorHeader />
      <div className="overflow-x-auto flex items-center justify-center">
        <div className='w-5/6'>
          <div className='mt-10 flex justify-between'>
            <h1 className="text-3xl font-semibold text-center text-teal-600">Appointment List</h1>
            <NavLink to="/doctor/appointments/addappointment">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:bg-teal-600"
              >
                Add Appointment
              </button></NavLink>
          </div>
          {
            !appointmentsLoaded ? <ShimmerTable /> :
              appointmentsLoaded && doctorAllAppointments.length === 0 ? (<div><h1 className='text-xl mt-10 font-semibold text-gray-500'>No Appointments to show !</h1></div>) : (
                <div className='flex items-center justify-center'>
                  <table className="w-full bg-white shadow-lg rounded mt-10">
                    <thead className='border'>
                      <tr className="text-left  text-teal-600">
                        {/* <th className="py-3 px-4">Appointment ID</th> */}
                        <th className="py-3 px-4 min-w-xs">Patient Name</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Time</th>
                        <th className="py-3 px-4 min-w-xs">Problem</th>
                        {/* <th className="py-3 px-4">Status</th> */}
                        <th className="py-3 px-4">Details</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {doctorAllAppointments.map(appointment => (
                        <tr key={appointment._id}>
                          {/* <td className="border-b py-3 px-4">{appointment.appointment_id}</td> */}
                          <td className="border-b border-l py-3 px-4 min-w-xs style={{overflowWrap: 'break-word'}}">{appointment.patientName}</td>
                          <td className="border-b py-3 px-4">{new Date(appointment.appointmentDate).getDate() + "/" + (parseInt(new Date(appointment.appointmentDate).getMonth()) + 1) + "/" + new Date(appointment.appointmentDate).getFullYear()}</td>
                          <td className="border-b py-3 px-4">{appointment.time}</td>
                          <td className="border-b py-3 px-4 min-w-xs wrap-text style={{overflowWrap: 'break-word'}}">{appointment.problem}</td>
                          <td className="border-b border-r py-3 px-4 underline text-sm hover:text-blue-600"><NavLink to={'appointmentdetails/' + appointment.appointmentId}>view more</NavLink></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>)
          }

        </div>
      </div >
    </>
  )
}

export default DoctorAppointments