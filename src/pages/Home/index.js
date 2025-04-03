import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dummyData = [
            { first_name: 'John', sur_name: 'Doe', email: 'john.doe@example.com' },
            { first_name: 'Jane', sur_name: 'Smith', email: 'jane.smith@example.com' },
            { first_name: 'James', sur_name: 'Brown', email: 'james.brown@example.com' },
            { first_name: 'Emily', sur_name: 'Davis', email: 'emily.davis@example.com' },
            { first_name: 'John', sur_name: 'Doe', email: 'john.doe@example.com' },
            { first_name: 'Jane', sur_name: 'Smith', email: 'jane.smith@example.com' },
            { first_name: 'James', sur_name: 'Brown', email: 'james.brown@example.com' },
            { first_name: 'Emily', sur_name: 'Davis', email: 'emily.davis@example.com' },
        ];
        setUsers(dummyData);
        setLoading(false);
    }, []);

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
            <Container fluid className='py-3 px-5'>
                <h1 className="font-semibold text-[18px] text-[#FF7A32] mt-3 md:text-[28px]">
                    Dashboard
                </h1>
                <div className='flex justify-between items-center mt-4 mb-4'>
                    <h2 className="text-[24px] font-bold">Vessels Details!</h2>
                    <button
                        className="bg-[#FF7A32] px-4 py-2 rounded text-white font-medium hover:bg-[#E66928] transition duration-300">
                        Add Vessel Assignment
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
