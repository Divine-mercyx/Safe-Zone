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
            <div className="relative bg-gray-950 border-1 border-gray-700 p-6 rounded shadow-lg w-190 z-10">
                { reports.map((report, index) => (
                    <button key={index} onClick={() => handleClick(report)} className={`py-4 ${ reportType === report ? "bg-blue-500 text-white hover:border-blue-400" : "bg-black text-white" } text-sm mr-3 mb-3 pl-6 pr-6 border-1 border-white hover:border-blue-400 rounded-full hover:bg-blue-500 hover:text-white`}>
                        { report }
                    </button>
                )) }
                <div className="mb-4">
                    <input
                        id="title"
                        name="title"
                        style={{ fontSize: '14px' }}
                        placeholder="enter a title for your report"
                        type="text"
                        required
                        className="w-full p-4 border mt-4 border-gray-300 rounded-full focus:outline-none focus:ring-2 text-white focus:ring-blue-500"
                    />
                </div>
                {/* Image upload input */}
                <div className="mb-4">
                    <label htmlFor="image-upload" className="block text-sm font-medium text-gray-200 mb-2">Attach Image</label>
                    <input
                        id="image-upload"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {imagePreview && (
                    <div className="mb-4 flex justify-center">
                        <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg border border-gray-700 shadow" />
                    </div>
                )}
                <br />
                <button
                    className="mt-4 text-4xl text-white px-4 py-2 rounded"
                    onClick={() => props.setIsModalOpen(false)}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};
