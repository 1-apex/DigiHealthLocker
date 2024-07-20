// import React from 'react'
// import { useState,useEffect } from 'react';

// const useAppointmentList = () => {
//     const [allappoinments,setAllAppointments] = useState([]);
//     useEffect(()=>{
//         //console.log("useEffect")
//         getAppointments();
//     },[]);

//     async function getAppointments(){
//         const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.7049873&lng=74.24325270000001&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
//         const json = await data.json();
//         console.log(json);
//         setAllAppointments(json);
//         // setFilterdRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
//     }

//     return allappoinments;
// }

const doctorAllAppointments = [
    {
      "appointment_id": "APPT001",
      "aadhar_no": "123456789011",
      "registration_no":"2525252525",
      "patient_name":"Vedang",
      "hospital_name":"ABC",
      "department": "Cardiology",
      "appointment_date": "2024-03-17",
      "time_slot": "09:00 AM - 10:00 AM",
      "problem": "Chest pain and shortness of breath",
      "status": "Accepted"
    },
    {
      "appointment_id": "APPT002",
      "aadhar_no": "123456789012",
      "registration_no":"2525252525",
      "patient_name":"Vedang2",
      "hospital_name":"ABC",
      "department": "Orthopedics",
      "appointment_date": "2024-03-18",
      "time_slot": "10:30 AM - 11:30 AM",
      "problem": "Joint pain and difficulty walking",
      "status": "Rejected"
    },
    {
      "appointment_id": "APPT003",
      "aadhar_no": "123456789013",
      "registration_no":"2525252525",
      "patient_name":"Vedang3",
      "hospital_name":"ABC",
      "department": "Dermatology",
      "appointment_date": "2024-03-19",
      "time_slot": "01:00 PM - 02:00 PM",
      "problem": "Skin rash and itching",
      "status": "Accepted"
    },
    {
      "appointment_id": "APPT004",
      "aadhar_no": "123456789014",
      "registration_no":"2525252525",
      "patient_name":"Vedang4",
      "hospital_name":"ABC",
      "department": "Ophthalmology",
      "appointment_date": "2024-03-20",
      "time_slot": "03:30 PM - 04:30 PM",
      "problem": "Blurred vision and eye pain",
      "status": "Accepted"
    },
    {
      "appointment_id": "APPT005",
      "aadhar_no": "123456789015",
      "registration_no":"2525252525",
      "patient_name":"Vedang5",
      "hospital_name":"ABC",
      "department": "Neurology",
      "appointment_date": "2024-03-21",
      "time_slot": "11:00 AM - 12:00 PM",
      "problem": "Headaches and dizziness",
      "status": "Pending"
    },
    {
      "appointment_id": "APPT006",
      "aadhar_no": "123456789016",
      "registration_no":"2525252525",
      "patient_name":"Vedang6",
      "hospital_name":"ABC",
      "department": "Gastroenterology",
      "appointment_date": "2024-03-22",
      "time_slot": "02:30 PM - 03:30 PM",
      "problem": "Stomach pain and bloating",
      "status": "Rejected"
    }
  ]

  export default doctorAllAppointments;
