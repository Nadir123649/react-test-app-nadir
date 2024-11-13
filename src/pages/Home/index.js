import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FileUpload from '../../components/FileUpload';
import NewFileUpload from '../../components/NewFileUpload';

const Home = () => {
    return (
        <div>
            {/* <FileUpload /> */}
            <NewFileUpload />
        </div>
    );
}

export default Home;
