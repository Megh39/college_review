import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Colleges = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await axios.get('https://college-review-backend.vercel.app/api/colleges');
                setColleges(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching colleges');
                setLoading(false);
            }
        };

        fetchColleges();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colleges.map(college => (
                <div key={college.id} className="college-card">
                    <h2>{college.name}</h2>
                    {college.google_map_link && (
                        <a 
                            href={college.google_map_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            View on Google Maps
                        </a>
                    )}
                    <div>
                        <h3>Facilities:</h3>
                        {Array.isArray(college.college_facilities) ? (
                            <ul>
                                {college.college_facilities.map((facility, index) => (
                                    <li key={index}>
                                        {typeof facility === 'string' ? facility : facility.facility_name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No facilities listed.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Colleges;
