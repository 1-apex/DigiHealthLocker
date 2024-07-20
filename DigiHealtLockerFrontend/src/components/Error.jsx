import React, { useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";
const Error = () => {

    return (




        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="error-container text-center p-8 bg-white shadow-md rounded-md">
                    <h1 className="text-4xl font-bold text-red-600">Oops!😟</h1>
                    <h2 className="text-xl font-semibold mb-4">Something went wrong!</h2>
                </div>
            </div>
        </>



    );

};

export default Error;
