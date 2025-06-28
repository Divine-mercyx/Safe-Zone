import React, {useEffect, useState} from "react";
import axios from "axios";
import {ChatBubbleLeftEllipsisIcon, HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/outline/index.js";

export const Inbox = (props) => {
    const agreeApi = "https://safespace-s4hu.onrender.com/user/confirm";
    const disagreeApi = "https://safespace-s4hu.onrender.com/user/deny";
    const { inboxes, setIsInboxOpen, setInboxes } = props;
    let url;
    console.log(inboxes);

    const fetchUrl = (picture) => {
         url = picture
            ? `data:image/jpeg;base64,${picture}`
            : null;
         return url;
    }

    const handleAgree = async (reportId) => {
        try {
            const payload = {
                reportId: reportId,
                username: localStorage.getItem("username"),
            };
            await axios.post(agreeApi, payload);
            setInboxes(prevInboxes => prevInboxes.filter(inbox => inbox.reportId !== reportId));
        } catch (error) {
            console.error("Error agreeing to inbox:", error);
            alert("Error agreeing to inbox:");
        }
    }

    const handleDisagree = async (reportId) => {
        try {
            const payload = {
                reportId: reportId,
                username: localStorage.getItem("username"),
            };
            await axios.post(disagreeApi, payload);
            setInboxes(prevInboxes => prevInboxes.filter(inbox => inbox.reportId !== reportId));
        } catch (error) {
            console.error("Error agreeing to inbox:", error);
            alert("Error agreeing to inbox:");
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10">
                <button
                    style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
                    className="text-3xl text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
                    onClick={() => setIsInboxOpen(false)}
                    aria-label="Close"
                    type="button"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold  text-gray-800 dark:text-white mb-6">View Inbox</h2>
                { props.inboxes.length === 0 ? (<p className="text-center text-gray-500">no inbox found</p>) :
                    (inboxes.map((inbox, index) => (
                        <div key={index} className="items-start gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        {/*    <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center font-bold text-blue-700 dark:text-blue-200">*/}
                        {/*        {inbox.author ? c.author[0].toUpperCase() : "U"}*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        /!*<div className="font-semibold text-gray-800 dark:text-gray-200">{c.author}</div>*!/*/}
                        {/*        <div className="text-gray-600 dark:text-gray-300 text-sm">{inbox.title}</div>*/}
                        {/*        /!*<div className="text-xs text-gray-400 mt-1">{c.time ? new Date(c.time).toLocaleString() : ""}</div>*!/*/}
                        {/*    </div>*/}
                        {/*    <br />*/}
                        {/*    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 rounded-b-2xl">*/}
                        {/*        <button className="flex items-center gap-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 px-3 py-1 rounded transition font-medium focus:outline-none">*/}
                        {/*            <HandThumbUpIcon className="h-5 w-5" />*/}
                        {/*            <span className="text-sm"> Like</span>*/}
                        {/*        </button>*/}
                        {/*        <button className="flex items-center gap-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 px-3 py-1 rounded transition font-medium focus:outline-none">*/}
                        {/*            <HandThumbDownIcon className="h-5 w-5" />*/}
                        {/*            <span className="text-sm"> Dislike</span>*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                            <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-0 mt-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 transition hover:shadow-2xl flex flex-col max-w-md">
                                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 rounded-t-2xl">
                                    <div className="flex-1">
                                        {/*<h3 className="text-gray-900 dark:text-white font-semibold text-base">{props.username}</h3>*/}
                                        <p className="text-gray-400 text-xs">{inbox.time}</p>
                                    </div>
                                </div>

                                <div className="px-6 py-4">
                                    <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                                        {inbox.title}
                                    </p>
                                </div>
                                {fetchUrl(inbox.picture) && (
                                    <div className="flex justify-center bg-gray-100 w-full dark:bg-gray-800">
                                        <img src={fetchUrl(inbox.picture)} alt="Report" className="rounded-lg max-h-48 w-full object-cover border border-gray-200 dark:border-gray-700 m-4" />
                                    </div>
                                )}
                                <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 rounded-b-2xl">
                                    <button onClick={() => handleAgree(inbox.reportId)} className="flex items-center gap-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 px-3 py-1 rounded transition font-medium focus:outline-none">
                                        <HandThumbUpIcon className="h-5 w-5" />
                                        <span className="text-sm">Agree</span>
                                    </button>
                                    <button onClick={() => handleDisagree(inbox.reportId)} className="flex items-center gap-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 px-3 py-1 rounded transition font-medium focus:outline-none">
                                        <HandThumbDownIcon className="h-5 w-5" />
                                        <span className="text-sm">Disagree</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
