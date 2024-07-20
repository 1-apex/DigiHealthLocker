import React from 'react';
import { LineChart, Line,BarChart,Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PatientHeader from './PatientHeader';

const PatientReport = () => {
    const patientData = [
        { date: '2023-01-01', sugarLevel: 120 },
        { date: '2023-01-02', sugarLevel: 130 },
        { date: '2023-01-03', sugarLevel: 125 },
        { date: '2023-01-04', sugarLevel: 140 },
        { date: '2023-01-05', sugarLevel: 135 },
    ];

    const patientData1 = [
        { date: '2023-01-01', sugarLevel: 120, bloodPressure: { systolic: 120, diastolic: 80 } },
        { date: '2023-01-02', sugarLevel: 130, bloodPressure: { systolic: 122, diastolic: 82 } },
        { date: '2023-01-03', sugarLevel: 125, bloodPressure: { systolic: 125, diastolic: 85 } },
        { date: '2023-01-04', sugarLevel: 140, bloodPressure: { systolic: 130, diastolic: 88 } },
        { date: '2023-01-05', sugarLevel: 135, bloodPressure: { systolic: 128, diastolic: 84 } },
    ];

    return (
        <>
            <PatientHeader />
            <div>
                <div className="max-w-4xl mx-auto mt-8 p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Patient Sugar Level</h2>
                    <div className="w-full h-80 mt-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={patientData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis ticks={[25, 50, 75, 100, 125, 150]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="sugarLevel" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="mx-auto mt-8 p-6">
                    <div className="flex">
                        <div className="w-1/2 pr-4">
                            <h3 className="text-xl font-semibold mb-2 text-center">Blood Sugar Level</h3>
                            <div className="w-full h-80">
                                <ResponsiveContainer>
                                    <LineChart data={patientData1}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="sugarLevel" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="w-1/2 pl-4">
                            <h3 className="text-xl font-semibold mb-2 text-center">Blood Pressure</h3>
                            <div className="w-full h-80">
                                <ResponsiveContainer>
                                    <BarChart data={patientData1}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="bloodPressure.systolic" fill="#82ca9d" />
                                        <Bar dataKey="bloodPressure.diastolic" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientReport;
