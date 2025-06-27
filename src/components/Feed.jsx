import { ChatBubbleLeftEllipsisIcon, HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

export const Feed = (props) => {
    const likeApi = "https://safespace-s4hu.onrender.com/user/like";
    const dislikeApi = "https://safespace-s4hu.onrender.com/user/dislike";
    const commentApi = "https://safespace-s4hu.onrender.com/user/comment";
    const getCommentsApi = "https://safespace-s4hu.onrender.com/user/getComments";
    const [reportId] = useState(props.id);
    const username = localStorage.getItem("username");
    const [like, setLike] = useState(props.likes.length);
    const [dislike, setDislike] = useState(props.dislikes.length);
    const [comment, setComment] = useState(props.comments.length);
    const REPORTS_API = "https://safespace-s4hu.onrender.com/user/viewReport";
    const [reports, setReports] = useState([]);

    // Modal and comment states
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loadingComments, setLoadingComments] = useState(false);
    const [sending, setSending] = useState(false);



    const handleLike = async (e) => {
        e.preventDefault()
        try {
            const payload = { username, reportId };
            const { data } = await axios.post(likeApi, payload);
            setLike(data.length);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDislike = async (e) => {
        try {
            const payload = { username, reportId };
            const { data } = await axios.post(dislikeApi, payload);
            setDislike(data.length);
        } catch (error) {
            console.log(error);
        }
    };

    const openCommentModal = async () => {
        setIsCommentModalOpen(true);
        setLoadingComments(true);
        try {
            const { data } = await axios.post(getCommentsApi, { reportId });
            setComments(data.comments || []);
        } catch (error) {
            setComments([]);
        }
        setLoadingComments(false);
    };

    const handleSendComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setSending(true);
        try {
            const payload = {
                author: username,
                reportId,
                comment: newComment
            };
            const { data } = await axios.post(commentApi, payload);
            setComments(data.comments || []);
            setComment(data.comments.length);
            setNewComment("");
        } catch (error) {
            console.error("Error sending comment:", error);
            alert("Failed to send comment. Please try again.");
        }
        setSending(false);
    };

    return (
        <>
            <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-0 mt-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 transition hover:shadow-2xl flex flex-col max-w-md">
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
                        {props.title}
                    </p>
                </div>
                {/* Actions */}
                <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 rounded-b-2xl">
                    <button onClick={handleLike} className="flex items-center gap-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 px-3 py-1 rounded transition font-medium focus:outline-none">
                        <HandThumbUpIcon className="h-5 w-5" />
                        <span className="text-sm">{like} Like</span>
                    </button>
                    <button onClick={handleDislike} className="flex items-center gap-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 px-3 py-1 rounded transition font-medium focus:outline-none">
                        <HandThumbDownIcon className="h-5 w-5" />
                        <span className="text-sm">{dislike} Dislike</span>
                    </button>
                    <button
                        onClick={openCommentModal}
                        className="flex items-center gap-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1 rounded transition font-medium focus:outline-none"
                    >
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                        <span className="text-sm">{comment} Comment</span>
                    </button>
                </div>
            </div>

            {/* Comment Modal */}
            {isCommentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-lg mx-auto p-6 z-10">
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
                            onClick={() => setIsCommentModalOpen(false)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">Comments</h2>
                        <div className="max-h-64 overflow-y-auto mb-4 space-y-3">
                            {loadingComments ? (
                                <div className="text-center text-gray-500">Loading...</div>
                            ) : comments.length === 0 ? (
                                <div className="text-center text-gray-400">No comments yet.</div>
                            ) : (
                                comments.map((c, idx) => (
                                    <div key={idx} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center font-bold text-blue-700 dark:text-blue-200">
                                            {c.username ? c.username[0].toUpperCase() : "U"}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800 dark:text-gray-200">{c.username}</div>
                                            <div className="text-gray-600 dark:text-gray-300 text-sm">{c.comment}</div>
                                            <div className="text-xs text-gray-400 mt-1">{c.time ? new Date(c.time).toLocaleString() : ""}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <form onSubmit={handleSendComment} className="flex gap-2">
                            <input
                                type="text"
                                className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                disabled={sending}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
                                disabled={sending || !newComment.trim()}
                            >
                                {sending ? "Sending..." : "Send"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
