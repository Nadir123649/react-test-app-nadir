import react, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const FileItem = ({ fileData, index, moveFile }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "file",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop(() => ({
        accept: "file",
        hover: (item) => {
            if (item.index !== index) {
                moveFile(item.index, index);
            }
        },
    }));

    return (
        <div
            ref={(node) => drag(drop(node))}
            className="p-4 mb-4 border rounded-md shadow-lg hover:bg-gray-100"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <p className="font-semibold">{fileData.file.name}</p>
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Add tags"
                    className="border rounded px-2 py-1 text-sm"
                    onBlur={(e) => fileData.addTag(e.target.value, index)}
                />
                <p className="text-xs text-gray-500">Priority: {fileData.priority}</p>
            </div>
        </div>
    );
};

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [tags, setTags] = useState("");

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
        updatedFiles[index].tags.push(tag);
        setFiles(updatedFiles);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">File Upload and Tagging</h1>


            <div className="mb-6">
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    multiple
                    className="border p-3 rounded-md w-full bg-white"
                />
            </div>

            <div className="space-y-4">
                {files.map((fileData, index) => (
                    <FileItem
                        key={index}
                        index={index}
                        fileData={{ ...fileData, addTag }}
                        moveFile={moveFile}
                    />
                ))}
            </div>

            <div className="mt-6">
                <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                    Submit Files
                </button>
            </div>
        </div>
    );
};

export default FileUpload;
