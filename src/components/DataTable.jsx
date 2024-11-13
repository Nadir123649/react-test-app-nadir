import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/saga-blue/theme.css'; // Use a theme if not already imported
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const DraggableTable = (props) => {

  const [data, setData] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    setData(props.data)
  },[props.data])

  const onRowReorder = (e) => {
    setData(e.value); // Update the data array after reordering
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Url Copied' });
  };

  const fileUrlTemplate = (rowData) => {
    const filter = props.data.filter((info)=>info.id === rowData.id)
    return (
        <div className="copy-icon-container" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        
        <i
          tooltip="Confirm to proceed" tooltipOptions={{ showDelay: 1000, hideDelay: 300 }}
          className="pi pi-copy"
          onClick={() => copyToClipboard(rowData.fileUrl)}
          style={{ fontSize: '1.2rem', color: '#007ad9' }}
          title="Copy URL"
        ></i>
      </div>
    );
  };

  return (
    <div style={{marginTop: 10}}>
      <Toast ref={toast} />
      <DataTable
        value={data}
        reorderableRows
        onRowReorder={onRowReorder}
        responsiveLayout="scroll"
        className="p-datatable-custom"
      >
        <Column rowReorder style={{ width: '4em' }} /> {/* Enable row reorder on the first column */}
        <Column style={{ width: '6em', padding: '8px' }} field="id" header="Id" />
        <Column style={{ width: '12em', padding: '8px' }} field="filename" header="Name" />
        <Column style={{ width: '15em', padding: '8px' }} body={fileUrlTemplate} header="Url" />
        <Column style={{ width: '8em', padding: '8px' }} field="fileType" header="Type" />
      </DataTable>
    </div>
  );
};

export default DraggableTable;
