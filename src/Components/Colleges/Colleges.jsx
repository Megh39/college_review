import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import "./Colleges.css";

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

    if (loading) return <div className='loadingBox'>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ padding: '20px',maxWidth:"1200px",margin:"0 auto" }}>
            <Row gutter={[16, 16]}>
                {colleges.map(college => (
                    <Col xs={24} sm={12} md={8} lg={8} key={college.id}>
                        <div className="collegeCard">
                            <h2>{college.name}</h2>

                            {college.image_url && (
                                <div className="collegeImage">
                                    <Image
                                        src={college.image_url}
                                        alt={college.name}
                                        className="collegeImage"
                                        width={300}
                                        height={200}
                                        style={{ marginBottom: '10px' }}
                                    />
                                </div>
                            )}

                            {college.google_map_link && (
                                <a
                                    href={college.google_map_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mapLink"
                                >
                                    View on Google Maps
                                </a>
                            )}

                            <Link to={`/college/${college.id}`} className="viewDetailsButton">
                                View Details
                            </Link>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Colleges;
