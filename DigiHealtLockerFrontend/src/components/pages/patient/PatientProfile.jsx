import React, { useEffect, useRef, useState } from 'react';
import logo from '../../../assets/images/DigiHealthlockerlogo.png';
import PatientHeader from './PatientHeader';

const Profile = () => {
  const registrationData = {
    firstName: 'Tejas',
    middleName: 'Tanaji',
    lastName: 'Pundpal',
    aadharNo: '123456789123',
    mobileNo: '1234567890'
  };

  const userDataRef = useRef({
    ...registrationData,
    age: '',
    occupation: '',
    annualIncome: '',
    weight: '',
    height: '',
    isDrinker: false,
    isSmoker: false,
    gender: 'Male',
    hasSugarProblem: false,
    hasHeartProblem: false,
    hasAsthmaProblem: false,
    physicalActivity: '',
    otherDiseases: '',
    disc: '',
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
      <PatientHeader />
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
            <label className="block text-sm font-semibold mb-1">Aadhar No.</label>
            <input
              type="text"
              name="aadharNo"
              value={userData.aadharNo}
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
            <label className="block text-sm font-semibold mb-1">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={userData.occupation}
              onChange={handleInputChange}
              placeholder='Enter Occupation'
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Annual Income</label>
            <input
              type="text"
              name="annualIncome"
              value={userData.annualIncome}
              onChange={handleInputChange}
              placeholder='Enter Annual Income'
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Weight (kg)</label>
            <input
              type="text"
              name="weight"
              value={userData.weight}
              onChange={handleInputChange}
              placeholder='Enter Weight'
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Height (cm)</label>
            <input
              type="text"
              name="height"
              value={userData.height}
              onChange={handleInputChange}
              placeholder='Enter Height'
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Drinker</label>
            <select
              name="isDrinker"
              value={userData.isDrinker}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Smoker</label>
            <select
              name="isSmoker"
              value={userData.isSmoker}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Gender</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            >
              <option value="Male">Male</option>
              <option value="Female"></option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Has Sugar Problem</label>
            <select
              name="hasSugarProblem"
              value={userData.hasSugarProblem}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Has Heart Problem</label>
            <select
              name="hasHeartProblem"
              value={userData.hasHeartProblem}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Has Asthma Problem</label>
            <select
              name="hasAsthmaProblem"
              value={userData.hasAsthmaProblem}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div><div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Physical Activities in which you are active</label>
            <input
              type="text"
              name="physicalActivity"
              value={userData.physicalActivity}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Any Other Diseases</label>
            <input
              type="text"
              name="otherDiseases"
              value={userData.otherDiseases}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Description of Disease you have</label>
            <textarea
              name="disc"
              value={userData.disc}
              onChange={handleInputChange}
              placeholder="Enter disease description"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500 h-32 resize-none"
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

export default Profile;
