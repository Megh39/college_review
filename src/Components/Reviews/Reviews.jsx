import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Card, Rate, Spin, Alert } from "antd";
import "./ReviewList.css";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("https://college-review-backend.vercel.app/api/auth/approvedreviews");
                setReviews(response.data);
            } catch (error) {
                setError("Error fetching reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) return <Spin tip="Loading Reviews..." />;
    if (error) return <Alert message={error} type="error" />;

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h2>Approved Reviews</h2>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={reviews}
                renderItem={(review) => (
                    <List.Item>
                        <Card title={review.college_name}>
                            <p><strong>Course:</strong> {review.course_name}</p>
                            <p><strong>User:</strong> {review.username}</p>
                            <p><strong>Feedback:</strong> {review.feedback}</p>
                            <Rate disabled defaultValue={review.rating} />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Reviews;
