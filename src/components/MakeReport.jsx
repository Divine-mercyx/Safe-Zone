import React from "react";

export const MakeReport = (props) => {
    const [reportType, setReportType] = React.useState("");
    const [imagePreview, setImagePreview] = React.useState(null);

    const reports = [
        "Flood Report",
        "Power Outage Report",
        "Fire Report",
        "Theft Report",
        "Violent Crime Report",
        "Traffic Report",
        "Emergency Report",
        "other"
    ];

    const handleClick = (report) => {
        setReportType(report);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10">
                <button
                    style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
                    className="text-3xl text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
                    onClick={() => props.setIsModalOpen(false)}
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Make a Report</h2>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {reports.map((report, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(report)}
                            className={`px-4 py-2 rounded-full border transition text-sm font-medium focus:outline-none ${reportType === report ? "bg-blue-600 text-white border-blue-600 shadow" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 dark:hover:text-white"}`}
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
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
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
                    />
                </div>
                {imagePreview && (
                    <div className="mb-4 flex justify-center">
                        <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg border border-gray-300 dark:border-gray-700 shadow" />
                    </div>
                )}
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow">
                    Make Report
                </button>
            </div>
        </div>
    );
};
