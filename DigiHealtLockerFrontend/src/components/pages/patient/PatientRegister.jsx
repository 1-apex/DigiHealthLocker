import React, { useState } from 'react';
import logo from '../../../assets/images/DigiHealthlockerlogo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Store/AuthClient';
import { toast } from 'react-toastify';

const PatientRegister = () => {
  const [userReg, setUserReg] = useState({
    firstname: "",
    middelname: "",
    lastname: "",
    email: "",
    aadharcardnumber: "",
    phonenumber: "",
    password: "",
    cpassword: ""
  });
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name,value);
    setUserReg({ ...userReg, [name]: value });
  }

  const registerPaitent = async (e) => {
    e.preventDefault();
    try {
      console.log("The data to send to backend", userReg);
      const response = await fetch("/api/pregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userReg)
      });
      const data = await response.json();
      if (!data.result) {
        console.log(data.message);
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
        return
      }
      console.log("Registrtion done");
      toast.success("registration successful!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });

      console.log(data.message);
      storeTokenInLS(data.token);

      navigate("/patient/dashboard");
    } catch (e) {
      toast.error("Frontend error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      console.log(e);
    }

  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <NavLink to="/" className="flex items-center mt-6 mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="h-20 mx-auto w-56" src={logo} alt="Logo" />
        </NavLink>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an Account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                  <input type="text" id="firstname" name="firstname" value={userReg.firstName} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Enter your first name" required="" />
                </div>
                <div>
                  <label htmlFor="middleName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle Name</label>
                  <input type="text" id="middlename" name="middelname" value={userReg.middelname} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Enter your middle name" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                  <input type="text" id="lastName" name="lastname" value={userReg.lastname} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Enter your last name" />
                </div>
                <div>
                  <label htmlFor="aadharNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Aadhar Number</label>
                  <input type="text" id="aadharNo" name="aadharcardnumber" value={userReg.aadharNo} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Enter your Aadhar number" />
                </div>
                <div>
                  <label htmlFor="mobileNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
                  <input type="text" id="mobileNo" name="phonenumber" value={userReg.mobileNo} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Enter your mobile number" />
                </div>
                <div>
                  <label htmlFor="mobileNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" id="email" name="email" value={userReg.email} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Enter your email " />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" id="password" name="password" value={userReg.password} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Enter your password" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                  <input type="password" id="confirmPassword" name="cpassword" value={userReg.cpassword} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Confirm your password" />
                </div>
              </div>

              {/* <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-teal-600 dark:ring-offset-gray-800" required="" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-teal-600 hover:underline dark:text-teal-500" href="#">Terms and Conditions</a></label>
                </div>
              </div> */}

              <button type="submit" onClick={registerPaitent} className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800" >Create an account</button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <NavLink to="/patient/login" className="font-medium text-teal-600 hover:underline dark:text-teal-500">Sign In here</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientRegister;
