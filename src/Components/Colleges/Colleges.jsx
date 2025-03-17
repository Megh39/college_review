import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Typography } from 'antd';

const { Title, Text } = Typography;

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
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                {colleges.map(college => (
                    <Col xs={24} sm={12} md={8} lg={6} key={college.id}>
                        <Card
                            title={<Title level={4}>{college.name}</Title>}
                            bordered={true}
                            hoverable
                            style={{ borderRadius: '10px' }}
                        >
                            {college.google_map_link && (
                                <a
                                    href={college.google_map_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#1890ff', display: 'block', marginBottom: '8px' }}
                                >
                                    View on Google Maps
                                </a>
                            )}
                            <div>
                                <Text strong>Facilities:</Text>
                                {Array.isArray(college.college_facilities) ? (
                                    <ul>
                                        {college.college_facilities.map((facility, index) => (
                                            <li key={index}>
                                                {typeof facility === 'string' ? facility : facility.facility_name}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <Text>No facilities listed.</Text>
                                )}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Colleges;
