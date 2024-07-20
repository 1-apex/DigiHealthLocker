import React, { useState } from 'react';
import logo from '../../../assets/images/DigiHealthlockerlogo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Store/AuthClient';
import { toast } from 'react-toastify';

const PatientLogin = () => {
  const [userLog, setUserLog] = useState({
    aadharcardnumber: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name,value);
    setUserLog({ ...userLog, [name]: value });
  }
  const loginToWeb = async (e) => {
    e.preventDefault();
    try {
      console.log("login data sending to the backend:", userLog);
      const resopnce = await fetch("/api/plogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userLog)
      });
      const data = await resopnce.json();
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
        return;
      }

      console.log(data.message);
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
      storeTokenInLS(data.token);
      navigate("/patient/dashboard")
    } catch (e) {
      console.log(e);

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
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="aadhar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Aadhar Number</label>
                <input type="number" name="aadharcardnumber" id="aadharcardnumber" value={userLog.aadharcardnumber} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Aadhar Number" required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" value={userLog.password} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" required="" />
              </div>

              <button type="submit" className="mt-2 w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800" onClick={loginToWeb}>Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <NavLink to="/patient/register" className="font-medium text-teal-600 hover:underline dark:text-teal-500">Sign up</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientLogin;
