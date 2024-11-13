import React, { useEffect, useState } from "react";
import DraggableTable from "./DataTable";
import { getFiles, uploadFile } from "../Service/services";
const NewFileUpload = () => {
    const [file, setFile] = useState([]);
    const [filesData,setFilesData] = useState([])
    // Handle file upload
    const handleFileUpload = (event) => {
        const newFile = event.target.files[0];
        setFile(newFile);
    };
    // Handle API call
    const handleApiCall = async () => {
        const formData = new FormData();
        console.log("files",file)
        formData.append("file", file);
        const response = await uploadFile(formData)
        if(response.data) {
            const resp = await getFiles()
            const tableData =  resp.data.map((info) => {
                return { id: info._id,filename:info.filename,fileUrl:info.fileUrl,fileType: info.fileType }
            })
            setFilesData(tableData)
        }
    };

    const fetchFiles = async () => {
        const resp = await getFiles()
            const tableData =  resp.data.map((info) => {
                return { id: info._id,filename:info.filename,fileUrl:info.fileUrl,fileType: info.fileType }
            })
            setFilesData(tableData)
    }

    useEffect(()=>{
        fetchFiles()
    },[])
    return (
        <div className="file-upload-container">
            <h1>File Upload</h1>
            <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="file-input"
            />
            <button onClick={handleApiCall}>Submit File</button>
            <DraggableTable data={filesData}/>
        </div>
    );
};
export default NewFileUpload;