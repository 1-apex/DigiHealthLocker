import React, { useState } from 'react';
import logo from '../../../assets/images/DigiHealthlockerlogo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from '../../../Store/AuthClient';

const DoctorLogin = () => {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const [doctorLog, setDoctorLog] = useState({
    registrationnumber: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name,value);
    setDoctorLog({ ...doctorLog, [name]: value });
  }
  const singToBack = async (e) => {
    e.preventDefault();
    try {
      const resopnce = await fetch("/api/dlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(doctorLog)
      });
      const data = await resopnce.json();


      console.log("The resposnce will be:", resopnce);
      console.log("The data is:", data);
      if (resopnce.ok) {
        // const data = await resopnce.json();
        if (!data) {
          console.log("Data not find as responce");
          return;
        }


        storeTokenInLS(data.token);

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

        console.log("The data we needed", data);
        navigate("/doctor/dashboard");
        return;
      }
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
    } catch (err) {
      console.log(err);
      toast.error("Frontend Error", {
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
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <NavLink to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="h-20 mx-auto w-56" src={logo} alt="Logo" />
        </NavLink>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" >
              <div>
                <label htmlFor="regNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Registration Number</label>
                <input type="number" name="registrationnumber" id="regNo" value={doctorLog.regNo} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Enter your registration number" required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" value={doctorLog.password} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" required="" />
              </div>

              <button type="submit" className="mt-3 w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800" onClick={singToBack}>Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet? <NavLink to="/doctor/register" className="font-medium text-teal-600 hover:underline dark:text-teal-500">Sign up</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorLogin;
