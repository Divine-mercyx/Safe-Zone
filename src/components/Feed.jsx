import { ChatBubbleLeftEllipsisIcon, HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import React from "react";

export const Feed = (props) => {
    return (
        <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-0 mt-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 transition hover:shadow-2xl flex flex-col max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 rounded-t-2xl">
                <div className="w-12 h-12 rounded-full border-2 border-blue-400 bg-gradient-to-tr from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700 flex items-center justify-center text-lg font-bold text-blue-600 dark:text-blue-300 shadow">
                    {props.username ? props.username[0].toUpperCase() : "U"}
                </div>
                <div className="flex-1">
                    <h3 className="text-gray-900 dark:text-white font-semibold text-base">{props.username}</h3>
                    <p className="text-gray-400 text-xs">12:34 Thursday, 12 October 2023</p>
                </div>
            </div>
            {/* Optional image */}
            {props.image && (
                <div className="flex justify-center bg-gray-100 dark:bg-gray-800">
                    <img src={props.image} alt="Report" className="rounded-lg max-h-48 object-cover border border-gray-200 dark:border-gray-700 m-4" />
                </div>
            )}
            {/* Content */}
            <div className="px-6 py-4">
                <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                    I'm reporting a suspicious activity near my location. Please check it out. Also, I have attached a photo of the activity.
                </p>
            </div>
            {/* Actions */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 rounded-b-2xl">
                <button className="flex items-center gap-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 px-3 py-1 rounded transition font-medium focus:outline-none">
                    <HandThumbUpIcon className="h-5 w-5" />
                    <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center gap-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 px-3 py-1 rounded transition font-medium focus:outline-none">
                    <HandThumbDownIcon className="h-5 w-5" />
                    <span className="text-sm">Dislike</span>
                </button>
                <button className="flex items-center gap-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1 rounded transition font-medium focus:outline-none">
                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                    <span className="text-sm">Comment</span>
                </button>
            </div>
        </div>
    );
};
