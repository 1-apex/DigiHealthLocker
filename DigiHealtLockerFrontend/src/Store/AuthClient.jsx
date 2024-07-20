import { createContext, useContext, useEffect, useState, } from "react";
import { useNavigate, useLocation } from 'react-router-dom';



export const AuthContext = createContext();
//cretaing the provider of the context api
/* tslint:disable:no-unused-variable */
export const AuthProvider = ({ children }) => {
    const location = useLocation();
    const [token, setToken] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("token");
        }
        return null;
    });
    const [user, setUser] = useState();
    const navigation = useNavigate();
    const arrayOfValidLocation = ["/", "/patient/login", "/patient/register", "/doctor/login", "/doctor/register"]

    //not accessible end for the doctor
    const arrayOfTheEndOfDoctor = ["/patient/dashboard", "/patient/profile", "/patient/appointments", "/patient/appointments/appointmentdetails/:appointmentId", "/patient/insurance", "/patient/report"]

    //not accessible end for the Patient 
    const arrOfTheEndOfPatient = ["/doctor/dashboard", "/doctor/appointments", "/doctor/appointments/addappointment", "/doctor/appointments/appointmentdetails/:aadhar_no/:registration_no", "/doctor/profile", "/doctor/upload"]


    const storeTokenInLS = (serevrToken) => {
        setToken(serevrToken);
        
        return localStorage.setItem("token", serevrToken);

    }
    const logoutUser = () => {
        setToken("");
        setUser(null);
        return localStorage.removeItem("token");
    }
    const authenticatUser = async () => {
        try {
            if (arrayOfValidLocation.includes(location.pathname)) {
                console.log("Authentocation is not required to all these ends")
                return;
            }
            const respose = await fetch('/api/user', {
                method: "GET",
                headers: {
                    "Authorization": `Barere ${token ? token : ""}`
                }
            });
            // if (respose.status != 200 && !arrayOfValidLocation.includes(location.pathname)) {

            //     console.log("Authetication is not valid");
            //     return navigation('/');


            // }
            const data = await respose.json();

            if (!data.result || respose.status != 200 && !arrayOfValidLocation.includes(location.pathname)) {
                // console.log("Authetication is not valid");
                // console.log("Login aging");
                console.log(data.message);
                // alert(data.message);

                // console.log(location.pathname);
                // if (location.pathname) {

                // }
                return navigation('/');
            } else if (!data.result && respose.status != 200 && arrayOfValidLocation.includes(location.pathname)) {
                console.log("login first")
                return;
            }

            if (data.user.registrationnumber && arrayOfTheEndOfDoctor.includes(location.pathname)) {
                console.log("You are accesing wrong ends");
                navigation('/doctor/dashboard');
            } else if (data.user.aadharcardnumber && arrOfTheEndOfPatient.includes(location.pathname)) {
                console.log("You are accesing wrong ends for patient");
                navigation('/patient/dashboard')
            }
            setUser(data.user);

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        authenticatUser();
    }, [location.pathname]);
    useEffect(() => {
        authenticatUser();
    }, []);





    return (
        <AuthContext.Provider value={{ storeTokenInLS, logoutUser, user }}>
            {children}
        </AuthContext.Provider >
    )
}
//Creating the consumer through which we can recive the comman data
export const useAuth = () => {
    const consumerFun = useContext(AuthContext);
    if (!consumerFun) {
        throw new Error("useAuth is using out of the auth provider");
    }
    return consumerFun;
}
