import React, { useState } from 'react';
import PatientHeader from './PatientHeader';

const userData = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  gender: 'Male',
  hasSugarProblem: false,
  hasHeartProblem: true,
  hasAsthmaProblem: false,
  otherDiseases: 'None',
  disc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonummy.',
  profileImage: null // You can provide a placeholder image URL here if needed
};

const InsurancePage = () => {
  const [income, setIncome] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [eligiblePlans, setEligiblePlans] = useState([]);

  const checkEligibility = () => {
    
    const isEligible = userData.age > 18 && userData.age < 60 && income > 20000 && employmentStatus === 'Employed';

    if (isEligible) {
      setEligiblePlans(['Plan A', 'Plan B']);
    } else {
      setEligiblePlans([]);
    }
  };

  return (
    <>
    <PatientHeader/>
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-4 text-center">Insurance Plans</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Income (per year)</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Employment Status</label>
          <select
            value={employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-500"
          >
            <option value="">Select</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={checkEligibility}
          className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
        >
          Check Eligibility
        </button>
      </div>
      {eligiblePlans.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Eligible Insurance Plans:</h3>
          <ul className="list-disc list-inside">
            {eligiblePlans.map((plan, index) => (
              <li key={index} className="text-gray-800">{plan}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export default InsurancePage;
