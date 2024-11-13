// import React, { useEffect, useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import "primereact/resources/themes/lara-light-cyan/theme.css";


// const DraggableTable = (props) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(props.data)
//   },[props.data])

//   const onRowReorder = (e) => {
//     setData(e.value); // Update the data array after reordering
//   };

//   return (
//     <div className="card">
//       <DataTable value={data} reorderableRows onRowReorder={onRowReorder} responsiveLayout="scroll">
//         <Column rowReorder style={{ width: '3em' }} />
//         <Column field="id" header="Id" />
//         <Column field="filename" header="Name" />
//         <Column field="fileUrl" header="Url" />
//         <Column field="fileType" header="Type" />
//       </DataTable>
//     </div>
//   );
// };

// export default DraggableTable;


import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const DraggableTable = (props) => {
  // Sample data
  const initialData = [
    { id: 1, name: 'Item 1', value: '100' },
    { id: 2, name: 'Item 2', value: '200' },
    { id: 3, name: 'Item 3', value: '300' },
  ];

  const [data, setData] = useState(initialData);

  const onRowReorder = (e) => {
    setData(e.value); // Update the data array after reordering
  };

  return (
    <div className="card">
      <DataTable value={data} reorderableRows onRowReorder={onRowReorder} responsiveLayout="scroll">
        <Column rowReorder style={{ width: '3em' }} /> {/* Enable row reorder on the first column */}
        <Column field="name" header="Name" />
        <Column field="value" header="Value" />
      </DataTable>
    </div>
  );
};

export default DraggableTable;
