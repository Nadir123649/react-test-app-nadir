import React, { useState } from "react";
import { FaCopy } from "react-icons/fa"; // Importing the copy icon
import { useDrag, useDrop } from "react-dnd"; // Importing necessary hooks from react-dnd

const ItemType = "FILE_ITEM";

// FileItem Component to handle the drag and drop functionality
const FileItem = ({ fileData, index, moveFile, copyFileUrl }) => {
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
        const fileUrl = window.URL.createObjectURL(fileData.file);
        copyFileUrl(fileUrl); // Copy the file URL to clipboard
    };

    return (
        <tr ref={(node) => drag(drop(node))} className="file-item">
            <td>{fileData.file.name}</td>
            <td>
                <input
                    type="text"
                    className="tag-input"
                    placeholder="Add tags"
                    onBlur={(e) => fileData.addTag(e.target.value, index)}
                />
            </td>
            <td>
                <FaCopy
                    onClick={handleCopyUrl}
                    className="copy-icon"
                    title="Copy URL"
                />
            </td>
        </tr>
    );
};

const FileUpload = () => {
    const [files, setFiles] = useState([]);

    // Function to reorder files based on drag and drop (handle priorities)
    const moveFile = (fromIndex, toIndex) => {
        const updatedFiles = [...files];
        const [movedFile] = updatedFiles.splice(fromIndex, 1);
        updatedFiles.splice(toIndex, 0, movedFile);
        updatedFiles.forEach((file, index) => {
            file.priority = index + 1; // Update priority after reorder
        });
        setFiles(updatedFiles);
    };

    // Handle file upload
    const handleFileUpload = (event) => {
        const newFiles = event.target.files;
        const fileArray = [...files];
        for (let file of newFiles) {
            fileArray.push({ file, tags: [], priority: fileArray.length + 1 });
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

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        const fileArray = [...files];
        for (let file of droppedFiles) {
            fileArray.push({ file, tags: [], priority: fileArray.length + 1 });
        }
        setFiles(fileArray);
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Allows drop to happen
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
                console.log("Files uploaded successfully:", data);
            })
            .catch((error) => {
                console.error("Error uploading files:", error);
            });
    };

    return (
        <div className="file-upload-container">
            <h1>File Upload and Tagging</h1>
            <div
                className="drag-drop-area"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <p>Drag and drop files here</p>
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    multiple
                    className="file-input"
                />
            </div>

            <table className="file-upload-table">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Tags</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
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
                        <tr>
                            <td colSpan="3">No files uploaded yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button onClick={handleApiCall}>Submit Files</button>
        </div>
    );
};

export default FileUpload;
