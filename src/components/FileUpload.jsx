import React, { useState } from "react";
import { FaCopy } from "react-icons/fa"; // Importing the copy icon
import { useDrag, useDrop } from "react-dnd"; // Importing necessary hooks from react-dnd

const ItemType = "FILE_ITEM";

const FileItem = ({ fileData, index, moveFile, copyFileUrl }) => {
    const [, drag] = useDrag(() => ({
        type: ItemType,
        item: { index },
    }));

    const [, drop] = useDrop(() => ({
        accept: ItemType,
        hover: (item) => {
            if (item.index !== index) {
                moveFile(item.index, index);
                item.index = index;
            }
        },
    }));

    const handleCopyUrl = () => {
        const fileUrl = window.URL.createObjectURL(fileData.file);
        copyFileUrl(fileUrl); // Copy the file URL to clipboard
    };

    // Check if fileData and fileData.file are defined
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
                    onBlur={(e) => fileData.addTag(e.target.value, index)}
                />
            </div>
        </div>
    );
};

const FileUpload = () => {
    const [files, setFiles] = useState([]);

    // Move file to reorder based on drag and drop
    const moveFile = (fromIndex, toIndex) => {
        const updatedFiles = [...files];
        const [movedFile] = updatedFiles.splice(fromIndex, 1);
        updatedFiles.splice(toIndex, 0, movedFile);
        setFiles(updatedFiles);
    };

    const handleFileUpload = (event) => {
        const newFiles = event.target.files;
        const fileArray = [...files];

        // Adding files to the fileArray without priority, just tags
        for (let file of newFiles) {
            fileArray.push({ file, tags: [] });
        }
        setFiles(fileArray);
    };

    const addTag = (tag, index) => {
        const updatedFiles = [...files];
        if (tag) {
            updatedFiles[index].tags.push(tag);
            setFiles(updatedFiles);
        }
    };

    const copyFileUrl = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert("File URL copied to clipboard!");
        });
    };

    // Function to prepare payload and send API request
    const handleApiCall = () => {
        // Prepare FormData payload
        const formData = new FormData();
        files.forEach((fileData, index) => {
            formData.append(`file-${index}`, fileData.file); // appending file
            formData.append(`tags-${index}`, JSON.stringify(fileData.tags)); // appending tags
        });

        // Example API request (you can replace with your actual API endpoint)
        fetch("https://your-api-endpoint.com/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
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
                    <div>No files uploaded yet.</div>
                )}
            </div>
            <button onClick={handleApiCall}>Submit Files</button>
        </div>
    );
};

export default FileUpload;
