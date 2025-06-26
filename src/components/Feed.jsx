import {ChatBubbleLeftEllipsisIcon, HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/outline/index.js";
import React from "react";

export const Feed = (props) => {
    return (
        <div className="bg-gray-900 p-4 w-160 mt-7 rounded-lg shadow border-1 border-gray-700 hover:shadow-md transition flex flex-col justify-between">
            <div className="flex w-full">
                <div className=" h-10 w-1/12">
                    <div className="w-9 h-9 rounded-full border-1 border-blue-400 bg-gray-600 mb-4"></div>
                </div>
                <div className="h-9 w-2/12 flex items-center justify-centr">
                    <h3 className="text-white font-semibold">{props.username}</h3>
                </div>
                <div className="h-9 w-9/12 flex items-center justify-cente">
                    <p className="text-gray-400 text-end text-sm">
                        12:34 thursday, 12 October 2023
                    </p>
                </div>
            </div>
            <div className="w-full mb-6 mt-4">
                <h1 className="text-gray-300 font-medium">
                    im reporting a suspicious activity near my location, please check it out, also i have attached a photo of the activity.
                </h1>
            </div>
            <div className="w-full flex mt-auto">
                <HandThumbUpIcon className="h-6 w-6 text-green-400 cursor-pointer hover:text-green-500 transition duration-200 mr-4" />
                <HandThumbDownIcon className="h-6 w-6 text-red-400 cursor-pointer hover:text-red-500 transition duration-200 mr-4" />
                <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-blue-400 cursor-pointer hover:text-blue-500 transition duration-200" />
            </div>
        </div>
    )
}
