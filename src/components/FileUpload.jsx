import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from 'array-move';
const FileUpload = () => {
    const [files, setFiles] = useState([]);
    // Handle file upload
    const handleFileUpload = (event) => {
        const newFiles = Array.from(event.target.files);
        const fileArray = [...files];
        newFiles.forEach((file) => {
            fileArray.push({ file, tags: [], url: "" });
        });
        setFiles(fileArray);
    };
    // Add tags to files
    const addTag = (tag, index) => {
        if (tag) {
            const updatedFiles = [...files];
            updatedFiles[index].tags.push(tag);
            setFiles(updatedFiles);
        }
    };
    // Copy file URL to clipboard
    const copyFileUrl = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert("File URL copied to clipboard!");
        });
    };
    // Handle API call
    const handleApiCall = () => {
        const formData = new FormData();
        files.forEach((fileData, index) => {
            formData.append(`file-${index}`, fileData.file);
            formData.append(`tags-${index}`, JSON.stringify(fileData.tags));
        });
        fetch("https://your-api-endpoint.com/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                const updatedFiles = files.map((fileData, index) => ({
                    ...fileData,
                    url: data.urls[index],
                }));
                setFiles(updatedFiles);
                console.log("Files uploaded successfully:", data);
            })
            .catch((error) => {
                console.error("Error uploading files:", error);
            });
    };
    // Sortable Element
    const SortableItem = SortableElement(({ fileData, index }) => (
        <tr>
            <td>{fileData.file.name}</td>
            <td>
                <input
                    type="text"
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
    ));
    // Sortable Container
    const SortableList = SortableContainer(({ items }) => (
        <tbody>
            {items.map((fileData, index) => (
                <SortableItem key={index} index={index} fileData={fileData} />
            ))}
        </tbody>
    ));
    // Handle sorting
    const onSortEnd = ({ oldIndex, newIndex }) => {
        setFiles(arrayMoveImmutable(files, oldIndex, newIndex));
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
                <SortableList items={files} onSortEnd={onSortEnd} />
            </table>
            <button onClick={handleApiCall}>Submit Files</button>
        </div>
    );
};
export default FileUpload;