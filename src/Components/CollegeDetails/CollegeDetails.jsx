import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Col, Image, Row, Spin, Alert, Card, Select } from 'antd';
import "./CollegeDetails.css";

const { Option } = Select;

const CollegeDetails = () => {
    const { id } = useParams();
    const [college, setCollege] = useState(null);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [levels, setLevels] = useState([]);
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollege = async () => {
            try {
                const response = await axios.get(`https://college-review-backend.vercel.app/api/colleges/${id}`, {
                    timeout: 10000
                });
                const data = response.data;
                setCollege(data);

                const courseList = data.courses || [];
                setFilteredCourses(courseList);

                // Extract unique course levels & departments
                const uniqueDepts = [...new Set(courseList.map(c => c.department).filter(Boolean))];
                const uniqueLevels = [...new Set(courseList.map(c => c.course_level).filter(Boolean))];

                setDepartments(uniqueDepts);
                setLevels(uniqueLevels);
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching college details');
                setLoading(false);
            }
        };

        fetchCollege();
    }, [id]);

    useEffect(() => {
        if (!college || !college.courses) return;

        let filtered = college.courses;

        if (selectedDept) {
            filtered = filtered.filter(course => course.department === selectedDept);
        }

        if (selectedLevel) {
            filtered = filtered.filter(course => course.course_level === selectedLevel);
        }

        setFilteredCourses(filtered);
    }, [selectedDept, selectedLevel, college]);

    if (loading) return <div className="loading-container"><Spin size="large" tip="Loading college details..." /></div>;
    if (error) return <Alert message="Error" description={error} type="error" showIcon className="error-alert" />;

    return (
        <div className="collegeDetailsContainer">
            <Card className="college-header" hoverable>
                <h2>{college.name}</h2>
                {college.image_url && (
                    <Image src={college.image_url} alt={college.name} width={400} height={250} preview className="college-image" />
                )}
                {college.google_map_link && (
                    <a href={college.google_map_link} target="_blank" rel="noopener noreferrer" className="map-link">
                        View on Google Maps
                    </a>
                )}
                <br />
                {college.college_website && (
                    <a href={college.college_website} target='_blank' className='college-link'>
                        Visit College Website
                    </a>
                )}
            </Card>

            {/* Filters */}
            <div style={{ margin: "20px 0", display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <Select
                    placeholder="Filter by Department"
                    value={selectedDept || undefined}
                    onChange={(val) => setSelectedDept(val)}
                    allowClear
                    style={{ width: 200 }}
                >
                    {departments.map((dept, i) => (
                        <Option key={i} value={dept}>{dept}</Option>
                    ))}
                </Select>
                <Select
                    placeholder="Filter by Course Level"
                    value={selectedLevel || undefined}
                    onChange={(val) => setSelectedLevel(val)}
                    allowClear
                    style={{ width: 200 }}
                >
                    {levels.map((level, i) => (
                        <Option key={i} value={level}>{level}</Option>
                    ))}
                </Select>
            </div>

            {/* Courses Section */}
            <section className="coursesSection">
                <h3>Courses</h3>
                <Row gutter={[16, 16]}>
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => (
                            <Col xs={24} sm={12} lg={8} key={index}>
                                <Card className="courseItem" hoverable>
                                    <h4>{course.course_name}</h4>
                                    <p><strong>Department:</strong> {course.department || "N/A"}</p>
                                    <p><strong>Duration:</strong> {course.course_duration || "N/A"}</p>
                                    <p><strong>Level:</strong> {course.course_level || "N/A"}</p>
                                    <p><strong>Eligibility:</strong></p>
                                    <ul className="eligibility-list">
                                        {Array.isArray(course.eligibility)
                                            ? course.eligibility.map((req, i) => <li key={i}>{req}</li>)
                                            : <li>{course.eligibility || "N/A"}</li>}
                                    </ul>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col span={24}><p className="no-data">No courses found for selected filter.</p></Col>
                    )}
                </Row>
            </section>

            {/* Alumni Section */}
            <section className="alumniSection">
                <h3>Alumni</h3>
                {college.alumni?.length > 0 ? (
                    <ul className="alumni-list">
                        {college.alumni.map((alumni, index) => (
                            <li key={index} className="alumni-item">
                                <strong>{alumni.alumni_name}</strong> - {alumni.designation}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-data">No alumni found.</p>
                )}
            </section>

            {/* Facilities Section */}
            <section className="facilitiesSection">
                <h3>Facilities</h3>
                <Row gutter={[16, 16]}>
                    {Array.isArray(college.college_facilities) && college.college_facilities.length > 0 ? (
                        college.college_facilities.map((facility, index) => (
                            <Col xs={24} sm={12} md={8} key={index}>
                                <Card className="facilityItem" hoverable>
                                    <h4>{typeof facility === 'string' ? facility : facility.facility_name}</h4>
                                    {facility.images?.length > 0 && (
                                        <Image.PreviewGroup>
                                            <div className="facilityImages">
                                                {facility.images.map((imgUrl, i) => (
                                                    <Image key={i} src={imgUrl} alt={facility.facility_name} className="facilityImage" />
                                                ))}
                                            </div>
                                        </Image.PreviewGroup>
                                    )}
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col span={24}><p className="no-data">No facilities listed.</p></Col>
                    )}
                </Row>
            </section>
        </div>
    );
};

export default CollegeDetails;
