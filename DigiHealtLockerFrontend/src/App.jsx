import React, { Suspense, lazy } from "react";
import Home from "./components/Home";
import { Route, BrowserRouter, Routes, } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Error from "./components/Error";
import PatientLogin from "./components/pages/patient/PatientLogin"
import PatientRegister from "./components/pages/patient/PatientRegister"
import MainComponet from "./components/MainComponet";
import PatientDashboard from "./components/pages/patient/PatientDashboard";
import PatientProfile from "./components/pages/patient/PatientProfile";
import AppointmentDetails from "./components/pages/patient/AppointmentDetails";
import AllAppointments from "./components/pages/patient/AllAppointments";
import PatientInsurance from "./components/pages/patient/PatientInsurance";
import PatientReport from "./components/pages/patient/PatientReport";
import DoctorLogin from "./components/pages/doctor/DoctorLogin";
import DoctorRegister from "./components/pages/doctor/DoctorRegister";
import DoctorDashboard from "./components/pages/doctor/DoctorDashboard";
import Loader from "./components/Loader";
import DoctorAppointments from "./components/pages/doctor/DoctorAppointments";
import DoctorProfile from "./components/pages/doctor/DoctorProfile";
import DoctorUpload from "./components/pages/doctor/DoctorUpload";
import AddAppointment from "./components/pages/doctor/AddAppointment";
import DoctorAppointmentDetails from "./components/pages/doctor/DoctorAppointmentDetails";
import ChatBot from "./components/pages/patient/ChatBot";
import Logout from "./components/Logout";
// const PatientLogin = lazy(() => import("./components/pages/patient/PatientLogin"));
// const PatientRegister = lazy(() => import("./components/pages/patient/PatientRegister"));

function App() {

  return (
    <>
      <Routes>
        <Route path="/" exact element={<MainComponet />} >
          <Route index element={<Home />} />
          <Route path="/patient/login" element={<Suspense fallback={<Loader />}><PatientLogin /></Suspense>} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/doctor/register" element={<DoctorRegister />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route path="/patient/appointments" element={<AllAppointments />} />
          <Route path="/patient/appointments/appointmentdetails/:id" element={<AppointmentDetails />} />
          {/* <Route path="/patient/appointments" exact element={<PatientAppointments />}>
            <Route path="allappointments" element={<AllAppointments />} />
          </Route> */}
          <Route path="/patient/insurance" element={<PatientInsurance />} />
          <Route path="/patient/report" element={<PatientReport />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />

          {/* <Route path="/doctor/appointments/addappointment" element={<AddAppointment/>} />
          <Route path="/doctor/appointments/appointmentdetails/:aadhar_no/:registration_no" element={<DoctorAppointmentDetails/>} />
          <Route path="/doctor/profile" element={<DoctorProfile/>} />
          <Route path="/doctor/upload" element={<DoctorUpload/>} /> */}
          <Route path="/doctor/appointments/addappointment" element={<AddAppointment />} />
          <Route path="/doctor/appointments/appointmentdetails/:id" element={<DoctorAppointmentDetails />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route path="/doctor/upload" element={<DoctorUpload />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/patient/chatbot" element={<ChatBot />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
    </>
  );
}

export default App;