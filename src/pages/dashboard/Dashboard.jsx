import React, { useEffect, useState } from "react";
import {
    UserIcon, DocumentTextIcon, ArrowRightOnRectangleIcon, MapPinIcon,
    ChevronDownIcon, ChevronUpIcon, BellIcon, InboxIcon
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Feed } from "../../components/Feed.jsx";
import { Element } from "react-scroll";
import { useAuthStore } from "../../store/authStore.js";
import { MakeReport } from "../../components/MakeReport.jsx";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const username = localStorage.getItem("username") || "Phoenix";
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const api = "https://safespace-s4hu.onrender.com/user/getLocations";
    const [locations, setLocations] = useState([]);
    const [reportsOpen, setReportsOpen] = useState(false);
    const [viewLocation, setViewLocation] = useState("current");
    const [news, setNews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const clearToken = useAuthStore(state => state.clearToken);
    const token = useAuthStore(state => state.token);
    const navigate = useNavigate();
    const apiKey = "5e598ee9ae7248339e9fe3f70efb26cf";
    const newsApi = `https://newsapi.org/v2/everything?q=crime&apiKey=${apiKey}`;

    const getGreeting = (name) => {
        const hour = new Date().getHours();
        if (hour < 12) return `Good morning, ${name}`;
        if (hour < 18) return `Good afternoon, ${name}`;
        return `Good evening, ${name}`;
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const { data } = await axios.get(api,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setLocations([...data.locations]);
            } catch (error) {
                console.error("Failed to fetch locations:", error);
            }
        };


        const fetchFeeds = async () => {
            try {
                const { data } = await axios.get(newsApi);
                setNews(data.articles.slice(4, 10));
            } catch (error) {
                console.error("Failed to fetch feeds:", error);
            }
        };
        fetchLocations();
        fetchFeeds();
        if (!token) navigate("/login");
    }, [token, navigate, newsApi]);


    const handleViewLocationChange = (location) => {
        setViewLocation(location);
    };

    const logout = () => {
        clearToken();
        localStorage.removeItem("username");
        window.location.href = "/login";
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800">
            {/* Sidebar */}
            <button
                className="md:hidden fixed top-4 left-4 z-40 p-2 rounded bg-gray-800 shadow"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
            >
                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div
                className={`
                    fixed md:static z-30 top-0 left-0 h-full w-64 md:w-72
                    transition-transform duration-200
                    border-r border-gray-800
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
                        <a href="#report"
                           className="flex items-center gap-3 text-gray-200 rounded-lg py-2 px-4 font-medium transition hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md mt-auto cursor-pointer"
                        >
                            <MapPinIcon className="h-4 mr-1 w-4" /> Go to Feed
                        </a>
                        <a onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 text-gray-200 rounded-lg py-2 px-4 font-medium transition hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md mt-auto cursor-pointer">
                            <MapPinIcon className="h-4 mr-1 w-4" /> Make Report
                        </a>
                        <a href="#" className="flex items-center gap-3 text-gray-200 rounded-lg py-2 px-4 font-medium transition hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md mt-auto">
                            <BellIcon className="h-4 mr-1 w-4" /> Notifications
                        </a>
                        <a href="#" className="flex items-center gap-3 text-gray-200 rounded-lg py-2 px-4 font-medium transition hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md mt-auto">
                            <InboxIcon className="h-4 mr-1 w-4" /> Inbox
                        </a>
                        <a href="#" onClick={logout} className="flex items-center gap-3 text-gray-200 rounded-lg py-2 px-4 font-medium transition hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md mt-auto">
                            <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
                        </a>
                    </div>
                </nav>
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col p-2 sm:p-4 md:p-8 h-screen overflow-y-auto">
                <div className="w-full bg-black/90 shadow rounded-lg p-4 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        {getGreeting(username)}
                    </h1>
                    <p className="text-gray-300 mb-6">
                        <span className="font-semibold">Hint: </span>you can manage your reports and locations.
                    </p>
                    {/* News Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10 gap-4 sm:gap-6">
                        {news.map((article, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundImage: `url(${article.urlToImage})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"
                                }}
                                className="bg-orange-900 min-h-[180px] rounded-xl shadow transition transform hover:scale-105 hover:brightness-110 hover:shadow-lg flex flex-col justify-end cursor-pointer duration-200 overflow-hidden"
                            >
                                <div className="w-full bg-gray-900/80 p-4 rounded-t-xl">
                                    <h1 className="text-white font-medium text-sm sm:text-base line-clamp-3">
                                        {article.description}
                                    </h1>
                                </div>
                            </div>
                        ))}
                        <button className="bg-gray-800 rounded-xl shadow p-4 flex items-center justify-center hover:bg-gray-700 transition duration-200 min-h-[180px]">
                            <span className="text-gray-400 text-sm">View More News</span>
                        </button>
                        <p id="report"></p>
                    </div>

                    {/* Feed Section */}
                    <Element name="feedSection">
                        <h1 className="text-2xl font-bold text-white mb-4">
                            Report Feed <span style={{ fontSize: "15px" }} className="text-gray-400 ml-5 font-medium"><span className="text-green-400 text-2xl">. </span>near your {viewLocation === "current" ? "current location" : viewLocation}</span>
                        </h1>
                        <div className="border-t border-gray-800 w-full"></div>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <Feed username={username} />
                            <Feed username={username} />
                            <Feed username={username} />
                            <Feed username={username} />
                            <Feed username={username} />
                            <Feed username={username} />
                        </div>
                    </Element>
                </div>
            </main>

            {isModalOpen && (
                <MakeReport setIsModalOpen={setIsModalOpen} />
            )}
        </div>
    );
};
