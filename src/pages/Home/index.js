import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    const columns = [
        {
            name: 'Sr. No.',
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => row.first_name,
            sortable: true,
        },
        {
            name: 'Sur name',
            selector: (row) => row.sur_name,
            sortable: true,
        },
        {
            name: 'Email Address',
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: (row) => "User",
            sortable: true,
        },
    ];

    return (
        <section className='bg-black min-h-screen text-white'>
            <Container className='py-5'>
                <h1 className="font-semibold text-[16px] text-[#FF7A32] mt-3 md:text-[28px]">
                    Hello George!
                </h1>
                <div className='flex justify-between items-center mt-4 mb-4'>
                    <h2 className="text-[24px] font-bold">User Details</h2>
                    <button
                        className="bg-[#FF7A32] px-4 py-2 rounded text-white font-medium hover:bg-[#E66928] transition duration-300">
                        Export CSV
                    </button>
                </div>
                <div className="bg-white p-4 rounded-lg">
                    <DataTable
                        columns={columns}
                        data={users}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        responsive
                    />
                </div>
            </Container>
        </section>
    );
}

export default Home;
