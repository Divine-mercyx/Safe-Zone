import React, { useEffect, useState } from "react";
import {
    UserIcon, DocumentTextIcon, ArrowRightOnRectangleIcon, MapPinIcon,
    ChevronDownIcon, ChevronUpIcon, BellIcon, InboxIcon
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Feed } from "../../components/Feed.jsx";
import { Element, Link as ScrollLink } from "react-scroll";
import {useAuthStore} from "../../store/authStore.js";
import {MakeReport} from "../../components/MakeReport.jsx";
import {useNavigate} from "react-router-dom";

export const Dashboard = () => {
    const username = localStorage.getItem("username") || "Phoenix";
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const api = "https://35b50a5a-99ec-42d5-ab71-b01c2f09f63d.mock.pstmn.io/locations";
    const [locations, setLocations] = useState([]);
    const [reportsOpen, setReportsOpen] = useState(false);
    const [viewLocation, setViewLocation] = useState("current");
    const [feeds, setFeeds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const clearToken = useAuthStore(state => state.clearToken);
    const token = useAuthStore(state => state.token);
    const navigate = useNavigate();






    const getGreeting = (name) => {
        const hour = new Date().getHours();
        if (hour < 12) return `Good morning, ${name}`;
        if (hour < 18) return `Good afternoon, ${name}`;
        return `Good evening, ${name}`;
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const { data } = await axios.get(api);
                setLocations(["current", ...data.locations]);
            } catch (error) {
                console.error("Failed to fetch locations:", error);
            }
        };
        fetchLocations();
        if (!token) {navigate("/login");}
    }, [token, navigate]);

    const handleViewLocationChange = (location) => {
        setViewLocation(location);
    };

    const logout = () => {
        clearToken();
        localStorage.removeItem("username");
        window.location.href = "/login";
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-tr bg-black">
            {/* Sidebar */}
            <button
                className="md:hidden absolute top-4 left-4 z-30 p-2 rounded bg-gray-800 shadow"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
            >
                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div
                className={`
                    fixed md:static z-20 top-0 left-0 h-screen w-64 md:w-72
                    transition-transform duration-200
                    border-r-1 border-gray-800
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                    flex flex-col bg-gray-950 shadow-lg
                `}
            >
                <div className="flex items-center gap-3 p-6">
                    <span className="bg-gray-800 rounded-full p-2">
                        <UserIcon className="h-8 w-8 text-blue-400" />
                    </span>
                    <span className="text-white font-extrabold text-2xl tracking-wide">SafeSpace</span>
                </div>
                <nav className="flex-1 px-4 flex flex-col gap-3">
                    <div>
                        <button
                            type="button"
                            onClick={() => setReportsOpen(open => !open)}
                            className="flex items-center justify-between w-full text-gray-200 rounded-lg py-2 px-4 font-medium transition hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md"
                        >
                            <span className="flex items-center gap-3">
                                <DocumentTextIcon className="h-5 w-5" /> Reports
                            </span>
                            {reportsOpen ? (
                                <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                                <ChevronDownIcon className="h-4 w-4" />
                            )}
                        </button>
                        {reportsOpen && (
                            <div className="ml-8 mt-2 flex flex-col gap-2">
                                {locations.map(location => (
                                    <a
                                        onClick={() => handleViewLocationChange(location)}
                                        key={location.id || location}
                                        href="#"
                                        className="flex items-center gap-2 text-gray-300 rounded py-1 px-3 hover:bg-gray-800 transition"
                                    >
                                        <DocumentTextIcon className="h-4 w-4" /> {location}
                                    </a>
                                ))}
                            </div>
                        )}
                        <ScrollLink
                            to="feedSection"
                            smooth={true}
                            duration={500}
                            offset={-80}
                            className="flex items-center gap-3 text-gray-200 rounded-lg py-2 px-4 font-medium transition hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md mt-auto cursor-pointer"
                        >
                            <MapPinIcon className="h-4 mr-1 w-4" /> Go to Feed
                        </ScrollLink>
                        <a onClick={(e) => setIsModalOpen(true)} className="flex items-center gap-3 text-gray-200 rounded-lg py-2 px-4 font-medium transition hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md mt-auto">
                            <MapPinIcon className="h-4 mr-1 w-4" /> Make Report
                        </a>
                        <a href="#" className="flex items-center gap-3 text-gray-200 rounded-lg py-2 px-4 font-medium transition hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md mt-auto">
                            <BellIcon className="h-4 mr-1 w-4" /> Notifications
                        </a>
                        <a href="#" className="flex items-center gap-3 text-gray-200 rounded-lg py-2 px-4 font-medium transition hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md mt-auto">
                            <InboxIcon className="h-4 mr-1 w-4" /> Inbox
                        </a>
                        <a href="#" onClick={() => logout()} className="flex items-center gap-3 text-gray-200 rounded-lg py-2 px-4 font-medium transition hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md mt-auto">
                            <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
                        </a>
                    </div>
                </nav>
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-10 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-6 h-screen overflow-y-auto">
                <div className="w-full bg-black shadow rounded-lg p-8">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        {getGreeting(username)}
                    </h1>
                    <p className="text-gray-300 mb-6">
                        <span className="font-semibold">Hint: </span>you can manage your reports and locations.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 mb-6 gap-6">
                        <div style={{ backgroundImage: "url('src/assets/download.jpeg')",  backgroundPosition: 'center', backgroundRepeat: "no-repeat", backgroundSize: "cover"}} className="bg-orage-900 h-70 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between">
                            <div className="w-full bg-gray-700 p-4 rounded-t-lg h-40 mt-auto opacity-75">
                                <h1 className="text-white font-medium">
                                    im reporting a suspicious activity near my location, please check it out, also i have attached a photo of the activity.
                                </h1>
                            </div>
                        </div>

                        <div style={{ backgroundImage: "url('src/assets/images.jpeg')",  backgroundPosition: 'center', backgroundRepeat: "no-repeat", backgroundSize: "cover"}} className="bg-orage-900 h-70 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between">
                            <div className="w-full bg-blue-700 p-4 rounded-t-lg h-40 mt-auto opacity-75">
                                <h1 className="text-white font-medium">
                                    im reporting a suspicious activity near my location, please check it out, also i have attached a photo of the activity.
                                </h1>
                            </div>
                        </div>

                        <div style={{ backgroundImage: "url('src/assets/flood.jpeg')",  backgroundPosition: 'center', backgroundRepeat: "no-repeat", backgroundSize: "cover"}} className="bg-orage-900 h-70 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between">
                            <div className="w-full bg-violet-700 p-4 rounded-t-lg h-40 mt-auto opacity-75">
                                <h1 className="text-white font-medium">
                                    im reporting a suspicious activity near my location, please check it out, also i have attached a photo of the activity.
                                </h1>
                            </div>
                        </div>

                    </div>

                    <Element name="feedSection">
                        <h1 className="text-2xl font-bold text-white mb-4">
                            Report Feed <span style={{ fontSize: "15px" }} className="text-gray-400 ml-5 font-medium"><span className="text-green-400 text-2xl">. </span>near your {viewLocation}</span>
                        </h1>
                        <div className="border-t-1 border-gray-800 w-full"></div>
                        { feeds.length > 0 ? (
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {feeds.map((feed, index) => (
                                    <Feed key={index} username={feed.username} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-center mt-7">No reports available for {viewLocation}.</p>
                        ) }

                        {/*<div className="flex w-full">*/}
                        {/*    <Feed username={username} />*/}
                        {/*    <Feed username={username} />*/}
                        {/*    <Feed username={username} />*/}
                        {/*    <Feed username={username} />*/}
                        {/*    <Feed username={username} />*/}
                        {/*    <Feed username={username} />*/}
                        {/*</div>*/}
                    </Element>
                </div>
            </div>


            {isModalOpen && (
                <MakeReport setIsModalOpen={setIsModalOpen}  />
            )}
        </div>
    );
};
