import React from "react";
import { useAuthStore } from "../store/authStore.js";
import axios from "axios";

export const MakeReport = (props) => {
    const [reportType, setReportType] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [imageFile, setImageFile] = React.useState(null);
    const [imagePreview, setImagePreview] = React.useState(null);
    const [loading, setLoading] = React.useState(false); // Loader state
    const api = "https://safespace-s4hu.onrender.com/user/uploadImage";
    const api2 = "https://safespace-s4hu.onrender.com/user/createReport";
    const [isEmergency, setIsEmergency] = React.useState(false);

    const latitude = useAuthStore(state => state.latitude);
    const longitude = useAuthStore(state => state.longitude);
    const username = localStorage.getItem("username");

    const reports = ["FLOOD", "POWER OUTAGE", "FIRE", "THEFT", "VIOLENT CRIME", "TRAFFIC", "EMERGENCY", "OTHER"]

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file || null);
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!imageFile) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("image", imageFile);
        console.log(latitude, longitude);
        try {
            let blobId;
            if (imageFile) {
                const {data} = await axios.post(api, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                blobId = data
            }

            console.log(blobId)
            if (reportType === "Emergency Report") {
                setIsEmergency(true);
            }
            const payload = {
                title: title,
                latitude: latitude,
                longitude: longitude,
                type: reportType,
                username: username,
                time: new Date().toISOString(),
                pictureId: blobId || "dog",
                isEmergency: isEmergency,
            }
            console.log(payload)

            await axios.post(api2, payload);
            alert("Report submitted successfully!");

        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Failed to submit report. Please try again.");
        }
        setLoading(false);
        props.setIsModalOpen(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <form
                onSubmit={handleSubmit}
                className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10"
            >
                <button
                    style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
                    className="text-3xl text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
                    onClick={() => props.setIsModalOpen(false)}
                    aria-label="Close"
                    type="button"
                    disabled={loading}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Make a Report</h2>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {reports.map((report) => (
                        <button
                            key={report}
                            type="button"
                            onClick={() => setReportType(report)}
                            className={`px-4 py-2 rounded-full border transition text-sm font-medium focus:outline-none ${reportType === report ? "bg-blue-600 text-white border-blue-600 shadow" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 dark:hover:text-white"}`}
                            disabled={loading}
                        >
                            {report}
                        </button>
                    ))}
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Title</label>
                    <input
                        id="title"
                        name="title"
                        style={{ fontSize: '15px' }}
                        placeholder="Enter a title for your report"
                        type="text"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                        disabled={loading}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Attach Image</label>
                    <input
                        id="image-upload"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    />
                </div>
                {imagePreview && (
                    <div className="mb-4 flex justify-center">
                        <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg border border-gray-300 dark:border-gray-700 shadow" />
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        "Make Report"
                    )}
                </button>
            </form>
        </div>
    );
};
