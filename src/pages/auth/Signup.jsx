import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import {useAuthStore} from "../../store/authStore.js";

// Address input with label and autocomplete
const AddressInput = ({
                          labelValue,
                          onLabelChange,
                          addressValue,
                          onAddressChange,
                          onSelectSuggestion,
                          suggestions,
                          onInputChange,
                          placeholder,
                      }) => (
    <div className="mb-4 relative flex gap-2 items-start">
        <input
            value={labelValue}
            onChange={onLabelChange}
            placeholder="Label (e.g. Home, Work)"
            className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="w-2/3 relative">
            <input
                value={addressValue}
                onChange={onInputChange}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-20 max-h-60 overflow-y-auto">
                    {suggestions.map((s) => (
                        <button
                            key={s.place_id}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-blue-100 focus:bg-blue-200 transition"
                            onClick={() => onSelectSuggestion(s)}
                        >
                            {s.description}
                        </button>
                    ))}
                </div>
            )}
        </div>
    </div>
);

export const Signup = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const signupApi = "https://safespace-s4hu.onrender.com/user/signUp";
    const locationChangingApi = "https://safespace-s4hu.onrender.com/user/updateLocation";
    const setToken = useAuthStore((state) => state.setToken);
    const navigate = useNavigate();
    const token = useAuthStore(state => state.token);

    const [addresses, setAddresses] = useState([
        { label: "", address: "", lat: null, lng: null, suggestions: [] },
    ]);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }, []);

    // Handle label change
    const handleLabelChange = (idx, e) => {
        const newAddresses = [...addresses];
        newAddresses[idx].label = e.target.value;
        setAddresses(newAddresses);
    };

    // Handle address input change (autocomplete)
    const handleAddressInputChange = (idx, e) => {
        const input = e.target.value;
        const newAddresses = [...addresses];
        newAddresses[idx].address = input;

        if (!input) {
            newAddresses[idx].suggestions = [];
            setAddresses(newAddresses);
            return;
        }

        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
            {
                input,
                types: ["address"],
                componentRestrictions: { country: "ng" },
            },
            (predictions) => {
                newAddresses[idx].suggestions = predictions || [];
                setAddresses([...newAddresses]);
            }
        );
    };

    // Handle suggestion select
    const handleSelectSuggestion = (idx, suggestion) => {
        const newAddresses = [...addresses];
        newAddresses[idx].address = suggestion.description;
        newAddresses[idx].suggestions = [];
        if (window.google && window.google.maps) {
            const service = new window.google.maps.places.PlacesService(
                document.createElement("div")
            );
            service.getDetails(
                { placeId: suggestion.place_id },
                (place, status) => {
                    if (
                        status === window.google.maps.places.PlacesServiceStatus.OK &&
                        place.geometry &&
                        place.geometry.location
                    ) {
                        newAddresses[idx].lat = place.geometry.location.lat();
                        newAddresses[idx].lng = place.geometry.location.lng();
                        setAddresses([...newAddresses]);
                    }
                }
            );
        }
    };

    // Add new address input
    const handleAddAddress = () => {
        if (addresses.length === 2) {
            return;
        }
        setAddresses([
            ...addresses,
            { label: "", address: "", lat: null, lng: null, suggestions: [] },
        ]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }

        const signupPayload = {
            name: formData.username,
            password: formData.password,
            locations: addresses.map(({ label, address, lat, lng }) => ({
                name: label,
                latitude: lat,
                longitude: lng,
            })),
        };

        try {
            const {data} = await axios.post(signupApi, signupPayload);
            setToken(data.token);
            localStorage.setItem("username", formData.username);
            if (latitude && longitude) {
                console.log(latitude, longitude);
                console.log(data.token)
                await axios.post(
                    locationChangingApi,
                    {latitude, longitude},
                    {
                        headers: {
                            Authorization: `Bearer ${data.token}`
                        }
                    }
                );
            }
        } catch (error) {
            if (error.response) {
                console.error("Backend error:", error.response.data); // <-- Add this
                alert(error.response.data.message || "Signup failed. Please try again.");
            } else {
                console.error("Error during signup:", error);
                alert("Signup failed. Please try again.");
            }
        }
    };

    return (
        <div className="flex">
            {/* Left panel */}
            <div className="w-1/2 mb-4 h-screen bg-[#2855d3] p-4">
                <div className="mt-100 mb-17 w-80">
                    <h1 className="text-center text-blue-50 font-bold text-3xl mb-4">
                        Safe Zone
                    </h1>
                    <p className="text-center text-blue-100 text-1xl mb-4">
                        Report. Validate. Stay Safe.
                    </p>
                </div>
                <div className="pl-15 w-80 mb-4">
                    <h1 className="text-blue-50 text-1xl font-semibold">
                        Community-Driven
                    </h1>
                    <p className="text-blue-100 text-sm">
                        Built by and for African Communities
                    </p>
                </div>
                <div className="pl-15 w-80 mb-10">
                    <h1 className="text-blue-50 text-1xl font-semibold">
                        Secure and anonymous
                    </h1>
                    <p className="text-blue-100 text-sm">
                        Your safety and privacy are our priority
                    </p>
                </div>
                <div className="pl-15 w-110 mb-4">
                    <p className="text-blue-100 text-sm">
                        Empowering communities through safe incident reporting
                    </p>
                </div>
            </div>

            {/* Right panel */}
            <div className="w-1/2 h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="shadow rounded p-6 bg-gray-100 w-110 mx-auto mt-20">
                    <h1 id="welcome" className="font-semibold mb-1 text-center">
                        Join SafeZone
                    </h1>
                    <p
                        id="welcomeText"
                        className="text-gray-500 text-center mb-3"
                    >
                        Create your account to start reporting incidents
                    </p>
                    <div className="w-full bg-amber-100 p-2 mb-4 border-1 border-amber-400 rounded opacity-60">
                        <p id="welcomeText" className="text-center text-gray-900">
              <span className="text-medium text-amber-600">
                Badge holders:
              </span>{" "}
                            Login for enhanced verification features.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                id="username"
                                name="username"
                                style={{ fontSize: "14px" }}
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
                                style={{ fontSize: "14px" }}
                                placeholder="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                id="confirm-password"
                                name="confirmPassword"
                                style={{ fontSize: "14px" }}
                                placeholder="confirm password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                type="button"
                                style={{ fontSize: "14px" }}
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-[#2855d3] text-white p-2 rounded hover:bg-blue-700 transition duration-200"
                            >
                                Next
                            </button>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-3 bg-gray-100 text-gray-500 text-sm">
                or
              </span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>
                        <div className="mb-8">
                            <button
                                type="button"
                                style={{ fontSize: "14px" }}
                                className="w-full bg-gray-100 text-gray-600 p-2 rounded border border-gray-300 hover:bg-gray-100 transition duration-200"
                            >
                                Sign in with Google
                            </button>
                        </div>
                        <div className="mb-13">
                            <p
                                style={{ fontSize: "14px" }}
                                className="text-center text-gray-700"
                            >
                                Already have an account?{" "}
                                <Link to="/login" className="text-blue-600 hover:underline">
                                    Login
                                </Link>
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

            {/* Modal for addresses */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className="relative bg-white p-6 rounded shadow-lg w-190 z-10">
                        <h2 className="text-xl font-semibold mb-4">Enter your addresses</h2>
                        {addresses.map((addr, idx) => (
                            <AddressInput
                                key={idx}
                                labelValue={addr.label}
                                onLabelChange={(e) => handleLabelChange(idx, e)}
                                addressValue={addr.address}
                                onAddressChange={(e) => handleAddressInputChange(idx, e)}
                                onInputChange={(e) => handleAddressInputChange(idx, e)}
                                onSelectSuggestion={(s) => handleSelectSuggestion(idx, s)}
                                suggestions={addr.suggestions}
                                placeholder="Enter address"
                            />
                        ))}
                        <button
                            type="button"
                            onClick={handleAddAddress}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
                        >
                            <PlusIcon className="h-5 w-5" /> Add another address
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full bg-[#2855d3] text-white p-2 rounded hover:bg-blue-700 transition duration-200"
                        >
                            Create Account
                        </button>
                        <button
                            className="mt-4 bg-gray-300 px-4 py-2 rounded"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
