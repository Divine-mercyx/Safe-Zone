import './style.css'
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useAuthStore} from "../../store/authStore.js";

export const Login = () => {
    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);
    const setToken = useAuthStore(state => state.setToken);
    const api = "https://safespace-s4hu.onrender.com/user/login";
    //
    // useEffect(() => {
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition(
    //             position => {
    //                 setLatitude(position.coords.latitude);
    //                 setLongitude(position.coords.longitude);
    //             },
    //             error => {
    //                 console.error(error);
    //             }
    //         );
    //     } else {
    //         console.error("Geolocation is not supported by this browser.");
    //     }
    // }, []);

    const userData = {
        username: '',
        password: ''
    }
    const [formData, setFormData] = React.useState(userData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(api, formData);
            setToken(data.token);
            localStorage.setItem("username", formData.username);
            setFormData({username: "", password: ""});
        } catch (error) {
            console.error(error);
            alert("Login failed. Please check your credentials and try again.");
        }
    }

    return (
        <div className="flex">
            <div className="w-1/2 mb-4 h-screen bg-[#2855d3] p-4">
                <div className="mt-100 mb-17 w-80">
                    <h1 className="text-center text-blue-50 font-bold text-3xl mb-4">Safe Zone</h1>
                    <p className="text-center text-blue-100 text-1xl mb-4">Report. Validate. Stay Safe.</p>
                </div>

                <div className="pl-15 w-80 mb-4">
                    <h1 className="text-blue-50 text-1xl font-semibold">Community-Driven</h1>
                    <p className="text-blue-100 text-sm">Built by and for African Communities</p>
                </div>

                <div className="pl-15 w-80 mb-10">
                    <h1 className="text-blue-50 text-1xl font-semibold">Secure and anonymous</h1>
                    <p className="text-blue-100 text-sm">Your safety and privacy are our priority</p>
                </div>

                <div className="pl-15 w-110 mb-4">
                    <p className="text-blue-100 text-sm">Empowering communities through safe incidet reporting</p>
                </div>


            </div>
            <div className="w-1/2 h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="shadow rounded p-6 bg-gray-100  w-110 mx-auto mt-20">
                    <h1 id="welcome" className="font-semibold mb-1 text-center">Welcome Back</h1>
                    <p id="welcomeText" className="text-gray-500 text-center mb-3">Sign in to access your secure dashboard</p>
                    <div className="w-full bg-amber-100 p-2 mb-4 border-1 border-amber-400 rounded opacity-60">
                        <p id="welcomeText" className="text-center text-gray-900">
                            <span className="text-medium text-amber-600">Badge holders:</span> Login for enhanced varification features.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                id="username"
                                name="username"
                                style={{ fontSize: '14px' }}
                                placeholder="username"
                                type="text"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                id="password"
                                name="password"
                                style={{ fontSize: '14px' }}
                                placeholder="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <p className="text-blue-600 text-right text-sm">
                                Forgot your password?
                            </p>
                        </div>

                        <div className="mb-4">
                            <button style={{ fontSize: '14px' }} className="w-full bg-[#2855d3] text-white p-2 rounded hover:bg-blue-700 transition duration-200">
                                Sign In
                            </button>
                        </div>

                        <div className="flex items-center mb-4">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-3 bg-gray-100 text-gray-500 text-sm">or</span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        <div className="mb-8">
                            <button style={{ fontSize: '14px' }} className="w-full bg-gray-100 text-gray-600 p-2 rounded border border-gray-300 hover:bg-gray-100 transition duration-200">
                                Sign in with Google
                            </button>
                        </div>

                        <div className="mb-13">
                            <p style={{ fontSize: '14px' }} className="text-center text-gray-700">
                                Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Create Account</Link>
                            </p>
                        </div>

                        <div className="mb-4">
                            <p className="text-center text-gray-500 text-xs">
                                Your privacy and security are our commitment
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
