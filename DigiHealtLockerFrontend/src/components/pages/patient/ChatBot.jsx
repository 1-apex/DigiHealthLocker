import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import 'tailwindcss/tailwind.css';
import './chatbot.css';
import PatientHeader from './PatientHeader'
import { toast } from 'react-toastify';
import { IoSend } from "react-icons/io5";
import { BsRobot } from "react-icons/bs";

import img1 from '../../../assets/images/png-transparent-cartoon-hospital-medical-medical-mark-icon-thumbnail-removebg-preview.png';
import img2 from '../../../assets/images/pngtree-hand-painted-medical-icon-medical-png-image_3774841-removebg-preview.png'


const socket = io('http://localhost:5000');

const ChatBot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [feedback, setFeedback] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {

        socket.on('py_bot_response', (data) => {


            setIsTyping(false);
            addMessageToUI(false, data);
        });

        // socket.on('feedback-message', (data) => {
        //     setFeedback(data.feedback);
        // });

        return () => {
            socket.off('update_bot_response');
        };
    }, []);
    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Scroll to bottom whenever messages update

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    // useEffect(() => {

    //     socket.on('connect', () => {
    //         console.log('Connected to Python server and enjoy');
    //     });
    // }, [])


    const sendMessage = () => {
        if (message === '') {
            toast.error("Enter message", {
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
        };

        const data = {
            originalSocketId: socket.id,
            message: message,

        };

        socket.emit('py_client_message', data);
        addMessageToUI(true, data);
        setIsTyping(true);
        setMessage('');
    };

    const addMessageToUI = (isOwnMessage, data) => {
        setFeedback('');
        setMessages((prevMessages) => [
            ...prevMessages,
            { isOwnMessage: isOwnMessage, ...data }
        ]);
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    return (
        <>
            <PatientHeader />
            <div className="flex justify-between items-center min-h-screen bg-gray-200">
                <img className='h-40 opacity-70' src={img1} alt='health-related-img1' />
                <div className='mr-32 mb-36'>
                    <img className='ml-12 h-32 mb-5 opacity-70' src={img2} alt='health-related-img2' />
                    <h1 className="text-5xl font-bold text-teal-800">DigiHealthLocker</h1>
                    <h1 className="text-4xl font-bold mt-4 text-teal-700">ChatBot</h1>
                    <p className='font-bold mt-4 text-gray-600'>Bridging the Gap Between You and Your Doctor</p>
                </div>
                <div className=''>
                <div className="border-8 border-gray-300 rounded-2xl overflow-hidden w-full max-w-md bg-white shadow-lg mr-36 mt-5">
                    <div className="flex items-center p-4 bg-gray-200 text-gray-700 font-bold">
                        <BsRobot size={24} />
                        <p className='ml-2 text-2xl'>E-Doc</p>
                    </div>

                    <ul className="flex flex-col bg-gray-100 h-96 overflow-y-auto p-4" id="message-container">
                        <li className="self-start p-3 mb-3 bg-white rounded-2xl shadow-sm max-w-xs text-teal-800">
                            <p className=''>Hi, I am EDoc - DigiHealthLocker Bot assistant. How can I assist you today?</p>
                        </li>

                        {messages.map((msg, index) => (
                            <li
                                key={index}
                                className={`p-3 mb-3 rounded-2xl shadow-sm max-w-xs ${msg.isOwnMessage ? 'self-end bg-teal-800 text-white' : 'self-start bg-white'}`}
                            >
                                <p>{msg.message}</p>
                            </li>
                        ))}


                        {isTyping && (

                            // <li className="self-start p-3 mb-3 text-sm italic text-teal-800 bg-gray-100 rounded-2xl">
                            //     E-Doc is typing...
                            // </li>

                            <li class="flex items-center">
                                <div role="status">
                                    <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <span className='italic text-sm'>E-Doc is typing...</span>
                            </li>
                        )}

                        <div ref={messagesEndRef} />
                    </ul>


                    <form className="flex justify-between p-4 bg-white border-t" id="message-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="message"
                            id="message-input"
                            className="flex-grow h-12 p-3 text-lg border-none outline-none bg-gray-100"
                            placeholder="Ask me about any medicine..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}

                        />
                        <div className="w-px h-12 bg-gray-200 mx-2"></div>
                        <button type="submit" className="h-12 px-6 text-lg bg-gray-100 border-none cursor-pointer">
                            <IoSend size={24} /><span><i className="fas fa-paper-plane"></i></span>
                        </button>
                    </form>
                </div>
                </div>
            </div >
        </>

    );
};

export default ChatBot;
