import React, { useState } from "react";
import { FaCopy } from "react-icons/fa"; // Importing the copy icon

const FileItem = ({ fileData, index, moveFile, copyFileUrl }) => {
    const handleCopyUrl = () => {
        const fileUrl = window.URL.createObjectURL(fileData.file);
        copyFileUrl(fileUrl); // Copy the file URL to clipboard
    };

    return (
        <div className="file-item">
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
                <p className="priority">Priority: {fileData.priority}</p>
            </div>
        </div>
    );
};

const FileUpload = () => {
    const [files, setFiles] = useState([]);

    const moveFile = (fromIndex, toIndex) => {
        const updatedFiles = [...files];
        const [movedFile] = updatedFiles.splice(fromIndex, 1);
        updatedFiles.splice(toIndex, 0, movedFile);
        updatedFiles.forEach((file, index) => (file.priority = index + 1));
        setFiles(updatedFiles);
    };

    const handleFileUpload = (event) => {
        const newFiles = event.target.files;
        const fileArray = [...files];
        for (let file of newFiles) {
            fileArray.push({ file, tags: [], priority: fileArray.length + 1 });
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

    // Drag and Drop handler
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

    return (
        <div className="file-upload-container">
            <h1>File Upload and Tagging</h1>
            <div
                className="drag-drop-area"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <p>Drag and drop files here</p>
            </div>
            <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                multiple
                className="file-input"
            />
            <div className="file-upload-list">
                {files.map((fileData, index) => (
                    <FileItem
                        key={index}
                        index={index}
                        fileData={{ ...fileData, addTag }}
                        moveFile={moveFile}
                        copyFileUrl={copyFileUrl}
                    />
                ))}
            </div>
            <button>Submit Files</button>
        </div>
    );
};

export default FileUpload;
