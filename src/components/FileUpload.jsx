import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import Sortable from "react-sortablejs";

const FileUpload = () => {
    const [files, setFiles] = useState([]);

    // Handle file upload
    const handleFileUpload = (event) => {
        const newFiles = Array.from(event.target.files);
        const fileArray = [...files];

        // Adding files to the fileArray with tags and URL placeholder
        newFiles.forEach((file) => {
            fileArray.push({ file, tags: [], url: "" });
        });
        setFiles(fileArray);
    };

    // Function to add tags to files
    const addTag = (tag, index) => {
        const updatedFiles = [...files];
        if (tag) {
            updatedFiles[index].tags.push(tag);
            setFiles(updatedFiles);
        }
    };

    // Function to copy file URL to clipboard
    const copyFileUrl = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert("File URL copied to clipboard!");
        });
    };

    // Function to prepare and send the file data to an API
    const handleApiCall = () => {
        const formData = new FormData();
        files.forEach((fileData, index) => {
            formData.append(`file-${index}`, fileData.file); // append file to FormData
            formData.append(`tags-${index}`, JSON.stringify(fileData.tags)); // append tags to FormData
        });

        // Send FormData to an API endpoint
        fetch("https://your-api-endpoint.com/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response contains URLs of uploaded files
                const updatedFiles = files.map((fileData, index) => ({
                    ...fileData,
                    url: data.urls[index], // Update with real URLs from API
                }));
                setFiles(updatedFiles);
                console.log("Files uploaded successfully:", data);
            })
            .catch((error) => {
                console.error("Error uploading files:", error);
            });
    };

    return (
        <div className="file-upload-container">
            <h1>File Upload and Tagging</h1>
            <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                multiple
                className="file-input"
            />

            {/* Table for displaying files */}
            <table className="file-table">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Tags</th>
                        <th>Copy URL</th>
                    </tr>
                </thead>
                <Sortable
                    tag="tbody"
                    onChange={(order) => {
                        const orderedFiles = order.map((index) => files[index]);
                        setFiles(orderedFiles);
                    }}
                >
                    {files.map((fileData, index) => (
                        <tr key={index} data-id={index}>
                            <td>{fileData.file.name}</td>
                            <td>
                                <input
                                    type="text"
                                    className="tag-input"
                                    placeholder="Add tags"
                                    onBlur={(e) => addTag(e.target.value, index)}
                                />
                                {fileData.tags.map((tag, idx) => (
                                    <span key={idx} className="tag">{tag}</span>
                                ))}
                            </td>
                            <td>
                                {fileData.url && (
                                    <FaCopy
                                        onClick={() => copyFileUrl(fileData.url)}
                                        className="copy-icon"
                                        title="Copy URL"
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </Sortable>
            </table>

            <button onClick={handleApiCall}>Submit Files</button>
        </div>
    );
};

export default FileUpload;
