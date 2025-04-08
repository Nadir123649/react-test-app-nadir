import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dummyData = [
            {
                total_entries: 120,
                entries_by_region: 'Somali Coastal Region',
                top_fish_species: 'Tuna',
                avg_catch_size: '15 kg',
                foreign_vessel_sightings: 5,
            },
            {
                total_entries: 95,
                entries_by_region: 'Somali Coastal Region',
                top_fish_species: 'Mackerel',
                avg_catch_size: '12 kg',
                foreign_vessel_sightings: 3,
            },
            {
                total_entries: 150,
                entries_by_region: 'Somali Coastal Region',
                top_fish_species: 'Sardine',
                avg_catch_size: '8 kg',
                foreign_vessel_sightings: 7,
            },
            // Add more data as needed
        ];

        setData(dummyData);
        setLoading(false);
    }, []);

    const columns = [
        {
            name: 'Sr. No.',
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: 'Total Entries',
            selector: (row) => row.total_entries,
            sortable: true,
        },
        {
            name: 'Entries by Region',
            selector: (row) => row.entries_by_region,
            sortable: true,
        },
        {
            name: 'Top Fish Species',
            selector: (row) => row.top_fish_species,
            sortable: true,
        },
        {
            name: 'Average Catch Size',
            selector: (row) => row.avg_catch_size,
            sortable: true,
        },
        {
            name: 'Foreign Vessel Sightings',
            selector: (row) => row.foreign_vessel_sightings,
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
                    <h2 className="text-[24px] font-bold">Vessel and Fishing Data</h2>
                    <button
                        className="bg-[#FF7A32] px-4 py-2 rounded text-white font-medium hover:bg-[#E66928] transition duration-300">
                        Add Vessel Assignment
                    </button>
                </div>
                <div className="bg-white p-4 rounded-lg">
                    <DataTable
                        columns={columns}
                        data={data}
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
