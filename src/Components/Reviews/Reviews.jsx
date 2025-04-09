import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Card, Rate, Spin, Alert, Divider, Select, Button } from "antd";
import "./ReviewList.css";

const { Option } = Select;

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        overall_rating: null,
        faculty_rating: null,
        facility_rating: null,
        placement_rating: null,
        campus_life_rating: null,
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("https://college-review-backend.vercel.app/api/auth/approvedreviews");
                setReviews(response.data);
                setFilteredReviews(response.data);
            } catch (error) {
                setError("Error fetching reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        let updated = [...reviews];

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null) {
                updated = updated.filter((review) => review[key] === value);
            }
        });

        setFilteredReviews(updated);
    }, [filters, reviews]);

    const handleFilterChange = (type, value) => {
        setFilters((prev) => ({
            ...prev,
            [type]: value ?? null,
        }));
    };

    const resetFilters = () => {
        setFilters({
            overall_rating: null,
            faculty_rating: null,
            facility_rating: null,
            placement_rating: null,
            campus_life_rating: null,
        });
    };

    const renderRatingFilter = (label, key) => (
        <div style={{ marginRight: 15 }}>
            <label><strong>{label}:  </strong></label>
            <Select
                placeholder="All"
                allowClear
                value={filters[key]}
                onChange={(value) => handleFilterChange(key, value)}
                style={{ width: 120 }}
            >
                {[5, 4, 3, 2, 1].map((val) => (
                    <Option key={val} value={val}>{val} Stars</Option>
                ))}
            </Select>
        </div>
    );

    if (loading) return <Spin tip="Loading Reviews..." />;
    if (error) return <Alert message={error} type="error" />;

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Approved Reviews</h2>

            {/* Filters */}
            <div style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px" }}>
                {renderRatingFilter("Overall", "overall_rating")}
                {renderRatingFilter("Faculty", "faculty_rating")}
                {renderRatingFilter("Facilities", "facility_rating")}
                {renderRatingFilter("Placement", "placement_rating")}
                {renderRatingFilter("Campus Life", "campus_life_rating")}
                <Button type="default" onClick={resetFilters}>Reset Filters</Button>
            </div>

            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={filteredReviews}
                renderItem={(review) => (
                    <List.Item>
                        <Card title="Anonymous User" bordered>
                            <p><strong>College:</strong> {review.college_name}</p>
                            <p><strong>Course:</strong> {review.course_name}</p>
                            <p><strong>Feedback:</strong> {review.feedback}</p>

                            <Divider style={{ margin: "12px 0" }} />

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                                <div style={{ border: "1px solid black", padding: "0 10px" }}>
                                    <strong>Overall:</strong><br />
                                    <Rate disabled value={review.overall_rating} count={5} />
                                </div>
                                <div style={{ border: "1px solid black", padding: "0 10px" }}>
                                    <strong>Faculty:</strong><br />
                                    <Rate disabled value={review.faculty_rating} count={5} />
                                </div>
                                <div style={{ border: "1px solid black", padding: "0 10px" }}>
                                    <strong>Facilities:</strong><br />
                                    <Rate disabled value={review.facility_rating} count={5} />
                                </div>
                                <div style={{ border: "1px solid black", padding: "0 10px" }}>
                                    <strong>Placement:</strong><br />
                                    <Rate disabled value={review.placement_rating} count={5} />
                                </div>
                                <div style={{ border: "1px solid black", padding: "0 10px" }}>
                                    <strong>Campus Life:</strong><br />
                                    <Rate disabled value={review.campus_life_rating} count={5} />
                                </div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Reviews;
