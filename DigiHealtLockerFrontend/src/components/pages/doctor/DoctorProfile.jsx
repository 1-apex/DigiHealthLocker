import React, { useEffect, useRef, useState } from 'react';
import logo from '../../../assets/images/DigiHealthlockerlogo.png';
import DoctorHeader from './DoctorHeader';

const DoctorProfile = () => {
  const registrationData = {
    firstName: 'Tejas',
    middleName: 'Tanaji',
    lastName: 'Pundpal',
    regNo: '123456789124',
    mobileNo: '1234567890'
  };

  const userDataRef = useRef({
    ...registrationData,
    age: '',
    speciality:'',
    profileImage: null
  });

  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(userDataRef.current);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserData(prevData => ({
      ...prevData,
      profileImage: file
    }));
  };

  const saveUserData = () => {
    console.log('User data saved:', userData);
    alert('User data saved successfully!');
  };

  return (
    <>
      <DoctorHeader/>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
        <div className="text-center mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profile-image-upload"
          />
          <label htmlFor="profile-image-upload">
            <img
              src={userData.profileImage ? URL.createObjectURL(userData.profileImage) : logo}
              alt="Profile"
              className="h-32 w-32 rounded-full mx-auto mb-4 cursor-pointer shadow-lg"
            />
          </label>
          <h2 className="text-3xl font-bold mb-4">Profile</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={userData.middleName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Registration No.</label>
            <input
              type="text"
              name="regNo"
              value={userData.regNo}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Mobile No.</label>
            <input
              type="text"
              name="mobileNo"
              value={userData.mobileNo}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Age</label>
            <input
              type="text"
              name="age"
              value={userData.age}
              onChange={handleInputChange}
              placeholder='Enter Age'
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Speciality</label>
            <input
              type="text"
              name="speciality"
              value={userData.speciality}
              onChange={handleInputChange}
              placeholder='Enter Speciality'
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              value={userData.experience}
              onChange={handleInputChange}
              placeholder='Enter Experience'
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={saveUserData}
            className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
