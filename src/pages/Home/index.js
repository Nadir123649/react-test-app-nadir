import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FileUpload from '../../components/FileUpload';

const Home = () => {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <FileUpload />
            </DndProvider>
        </div>
    );
}

export default Home;
