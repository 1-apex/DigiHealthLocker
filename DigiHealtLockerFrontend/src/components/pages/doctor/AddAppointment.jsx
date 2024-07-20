import React, { useState, useRef } from 'react';
import DoctorHeader from './DoctorHeader';
import { useAuth } from '../../../Store/AuthClient';
import { toast } from 'react-toastify';

function AddAppointments() {

  // const [formData, setFormData] = useState({
  //   registrtionNumber: user ? user.registrationnumber : '',
  //   patientAadharNo: '',
  //   department: '',
  //   appointmentDate: '',
  //   timeSlot: '',
  //   problem: '',
  // });

  const registrtionNumberRef = useRef('');
  const patientAadharNoRef = useRef('');
  const departmentRef = useRef('');
  const appointmentDateRef = useRef('');
  const timeSlotRef = useRef('');
  const problemRef = useRef('');
  const { user } = useAuth();
  console.log("The user will be", user);
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission (e.g., send data to server)
      const formData = {
        registrtionNumber: registrtionNumberRef.current.value,
        patientAadharNo: patientAadharNoRef.current.value,
        department: departmentRef.current.value,
        appointmentDate: appointmentDateRef.current.value,
        timeSlot: timeSlotRef.current.value,
        problem: problemRef.current.value,
      };
      console.log(formData);
      // console.log(formData);

      const respose = await fetch("/api/dAddAppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)


      })
      // if(!respose.ok){
      //   return console.log()
      // }
      const data = await respose.json();
      if (respose.status == 200) {
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      } else {
        toast.error(data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      console.log(data);

    } catch (e) {
      toast.error("Frontend errors !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(e);
    }

  };

  return (
    <>
      <DoctorHeader />
      <div className="container mx-auto mt-5">
        <h1 className="text-3xl font-semibold text-center mb-8 text-teal-600">Add Appointment</h1>
        <form className="max-w-4xl mx-auto">
          <div className="mb-4 flex flex-wrap">
            <div className="w-full md:w-1/2 md:pl-2 mb-3">
              <label htmlFor="registrtionNumber" className="block text-gray-700">Your Registration Number</label>
              <input
                type="text"
                id="registrtionNumbers"
                name="registrtionNumber"
                ref={registrtionNumberRef}
                value={user ? `${user.registrationnumber}` : ""}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
                disabled
              />
            </div>

            {/* <div className="w-full md:w-1/2 md:pl-2 mb-3">
              <label htmlFor="hospitalName" className="block text-gray-700">Hospital Name</label>
              <input
                type="text"
                id="hospitalName"
                name="hospitalName"
                value={user ? user.hostpitalname : formData.hospitalName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
                disabled
              />
            </div> */}

            {/* <div className="w-full md:w-1/2 md:pl-2 mb-3">
              <label htmlFor="patientName" className="block text-gray-700">Patient Name</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
              />
            </div> */}
            <div className="w-full md:w-1/2 md:pl-2 mb-3">
              <label htmlFor="patientAadharNo" className="block text-gray-700">Patient Aadhar Number</label>
              <input
                type="text"
                id="patientAadharNo"
                name="patientAadharNo"
                // value={formData.patientAadharNo}
                ref={patientAadharNoRef}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div className="w-full md:w-1/2 md:pl-2 mb-3">
              <label htmlFor="department" className="block text-gray-700">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                // value={formData.department}
                ref={departmentRef}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2 mb-3">
              <label htmlFor="appointmentDate" className="block text-gray-700">Appointment Date</label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                // value={formData.appointmentDate}
                ref={appointmentDateRef}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2 mb-3">
              <label htmlFor="timeSlot" className="block text-gray-700">Time Slot</label>
              <input
                type="time"
                id="timeSlot"
                name="timeSlot"
                // value={formData.timeSlot}
                ref={timeSlotRef} s
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label htmlFor="problem" className="block text-gray-700">Health Issue Description</label>
              <textarea
                id="problem"
                name="problem"
                // value={formData.problem}
                ref={problemRef}
                rows="4"
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
              ></textarea>
            </div>
          </div>
          <div className="mb-4 ml-2">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:bg-teal-600"
              onClick={handleSubmit}
            >
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddAppointments;
