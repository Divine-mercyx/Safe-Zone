import { ChatBubbleLeftEllipsisIcon, HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline/index.js";
import React from "react";

export const Feed = (props) => {
    return (
        <div className="bg-white dark:bg-gray-900 p-6 w-150 mt-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition hover:shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full border-2 border-blue-400 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg font-bold text-blue-500">
                    {/* Optionally, show first letter of username */}
                    {props.username ? props.username[0].toUpperCase() : "U"}
                </div>
                <div className="flex-1">
                    <h3 className="text-gray-900 dark:text-white font-semibold text-base">{props.username}</h3>
                    <p className="text-gray-400 text-xs">12:34 Thursday, 12 October 2023</p>
                </div>
            </div>
            <div className="mb-2">
                <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                    I'm reporting a suspicious activity near my location. Please check it out. Also, I have attached a photo of the activity.
                </p>
            </div>
            {/* Optionally, show an image if available: */}
            {/* {props.image && (
                <div className="mb-2 flex justify-center">
                    <img src={props.image} alt="Report" className="rounded-lg max-h-48 object-cover border border-gray-200 dark:border-gray-700" />
                </div>
            )} */}
            <div className="flex items-center gap-6 mt-2">
                <button className="flex items-center gap-1 text-green-500 hover:text-green-600 transition font-medium focus:outline-none">
                    <HandThumbUpIcon className="h-6 w-6" />
                    <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center gap-1 text-red-500 hover:text-red-600 transition font-medium focus:outline-none">
                    <HandThumbDownIcon className="h-6 w-6" />
                    <span className="text-sm">Dislike</span>
                </button>
                <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition font-medium focus:outline-none">
                    <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
                    <span className="text-sm">Comment</span>
                </button>
            </div>
        </div>
    );
};
