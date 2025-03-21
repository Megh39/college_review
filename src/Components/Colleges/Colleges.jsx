import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Colleges.css";
import { Row, Col, Image } from 'antd'

const Colleges = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedCollegeId, setExpandedCollegeId] = useState(null);

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

    const toggleExpand = (id) => {
        setExpandedCollegeId(expandedCollegeId === id ? null : id);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                {colleges.map(college => (
                    <Col xs={24} sm={12} md={8} lg={12} key={college.id}>
                        <div className="collegeCard">
                            <h2>{college.name}</h2>

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

                            <button
                                className="expandButton"
                                onClick={() => toggleExpand(college.id)}
                            >
                                {expandedCollegeId === college.id ? "Hide Details" : "Show Details"}
                            </button>

                            {expandedCollegeId === college.id && (
                                <div>
                                    {/* Courses Section */}
                                    <div className="coursesSection">
                                        <h3>Courses</h3>
                                        {college.courses?.length > 0 ? (
                                            college.courses.map((course, index) => (
                                                <div key={index} className="courseItem">
                                                    <h4>{course.course_name}</h4>
                                                    <p><strong>Department:</strong> {course.department || "N/A"}</p>
                                                    <p><strong>Duration:</strong> {course.course_duration}</p>
                                                    <p><strong>Level:</strong> {course.course_level}</p>
                                                    <p><strong>Eligibility:</strong></p>
                                                    <ul>
                                                        {Array.isArray(course.eligibility) ? 
                                                            course.eligibility.map((req, i) => <li key={i}>{req}</li>) : 
                                                            <li>{course.eligibility}</li>
                                                        }
                                                    </ul>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No courses available.</p>
                                        )}
                                    </div>

                                    {/* Alumni Section */}
                                    {college.alumni?.length > 0 && (
                                        <div className="alumniSection">
                                            <h3>Alumni</h3>
                                            <ul>
                                                {college.alumni.map((alumnus, index) => (
                                                    <li key={index}>
                                                        <strong>{alumnus.alumni_name}</strong> - {alumnus.designation}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Facilities Section */}
                                    <div className="facilitiesSection">
                                        <h3>Facilities</h3>
                                        {Array.isArray(college.college_facilities) ? (
                                            college.college_facilities.map((facility, index) => (
                                                <div key={index} className="facilityItem">
                                                    <h4>{typeof facility === 'string' ? facility : facility.facility_name}</h4>
                                                    {facility.images?.length > 0 && (
                                                        <div className="facilityImages">
                                                            {facility.images.map((imgUrl, i) => (
                                                                <Image
                                                                    key={i}
                                                                    src={imgUrl}
                                                                    alt={facility.facility_name}
                                                                    className="facilityImage"
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No facilities listed.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Colleges;
