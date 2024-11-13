import React, { useState } from "react";
import { FaCopy } from "react-icons/fa"; // Importing the copy icon
import { useDrag, useDrop } from "react-dnd"; // Importing necessary hooks from react-dnd

const ItemType = "FILE_ITEM";

// FileItem Component to handle the drag and drop functionality
const FileItem = ({ fileData, index, moveFile, copyFileUrl, addTag }) => {
    const [, drag] = useDrag(() => ({
        type: ItemType,
        item: { index },
    }));

    const [, drop] = useDrop(() => ({
        accept: ItemType,
        hover: (item) => {
            if (item.index !== index) {
                moveFile(item.index, index); // Reorder files on drag hover
                item.index = index; // Update the index
            }
        },
    }));

    const handleCopyUrl = () => {
        if (fileData.url) {
            copyFileUrl(fileData.url); // Copy the live file URL to clipboard
        }
    };

    if (!fileData || !fileData.file) return null;

    return (
        <div ref={(node) => drag(drop(node))} className="file-item">
            <div className="file-name">{fileData.file.name}</div>
            <FaCopy
                onClick={handleCopyUrl}
                className="copy-icon"
                title="Copy URL"
            />
            <div className="file-details">
                <input
                    type="text"
                    className="tag-input"
                    placeholder="Add tags"
                    onBlur={(e) => addTag(e.target.value, index)} // Adding tags on blur
                />
            </div>
        </div>
    );
};

const FileUpload = () => {
    const [files, setFiles] = useState([]);

    // Function to reorder files based on drag and drop
    const moveFile = (fromIndex, toIndex) => {
        const updatedFiles = [...files];
        const [movedFile] = updatedFiles.splice(fromIndex, 1);
        updatedFiles.splice(toIndex, 0, movedFile);
        setFiles(updatedFiles);
    };

    // Handle file upload
    const handleFileUpload = (event) => {
        const newFiles = event.target.files;
        const fileArray = [...files];

        // Adding files to the fileArray without priority, just tags
        for (let file of newFiles) {
            fileArray.push({ file, tags: [], url: "" });
        }
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
                // Assuming the response contains the URLs of uploaded files
                const updatedFiles = files.map((fileData, index) => ({
                    ...fileData,
                    url: data.urls[index], // Assuming API returns an array of URLs
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
            <div className="file-upload-list">
                {files.length > 0 ? (
                    files.map((fileData, index) => (
                        <FileItem
                            key={index}
                            index={index}
                            fileData={{ ...fileData, addTag }}
                            moveFile={moveFile}
                            copyFileUrl={copyFileUrl}
                        />
                    ))
                ) : (
                    <div className="mt-3">No files uploaded yet.</div>
                )}
            </div>
            <button onClick={handleApiCall}>Submit Files</button>
        </div>
    );
};

export default FileUpload;
