import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users and reviews when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users
                const usersResponse = await axios.get("https://college-review-backend.vercel.app/api/auth/users");
                setUsers(usersResponse.data);

                // Fetch reviews
                const reviewsResponse = await axios.get("https://college-review-backend.vercel.app/api/auth/reviews");
                setReviews(reviewsResponse.data);

                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Render loading state
    if (loading) {
        return (
            <div className="adminDashboardPage">
                <h1>Loading...</h1>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="adminDashboardPage">
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    // Render the dashboard with user and review data
    return (
        <div className="adminDashboardPage">
            <h1>Welcome to Admin Dashboard!</h1>
            <h3>Manage Site Users and Reviews</h3>

            {/* Users Section */}
            <section className="dashboardSection">
                <h2>Users</h2>
                <div className="userTableContainer">
                    <table className="userTable">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>College Name</th>
                                <th>Course</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>{user.college_name}</td>
                                    <td>{user.course}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="dashboardSection">
                <h2>Reviews</h2>
                <div className="userTableContainer">
                    <table className="userTable">
                        <thead>
                            <tr>
                                <th>Review ID</th>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>College Name</th>
                                <th>Course Name</th>
                                <th>Rating</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review._id}>
                                    <td>{review.review_id}</td>
                                    <td>{review.user_id}</td>
                                    <td>{review.username}</td>
                                    <td>{review.college_name}</td>
                                    <td>{review.course_name}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.feedback}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;