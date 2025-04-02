import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [editReview, setEditReview] = useState(null);
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "", age: "", college_name: "", course: "" });
    const [newReview, setNewReview] = useState({ user_id: "", college_name: "", course_name: "", rating: 1, feedback: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get("https://college-review-backend.vercel.app/api/auth/users");
                setUsers(usersResponse.data);
                const reviewsResponse = await axios.get("https://college-review-backend.vercel.app/api/auth/reviews");
                setReviews(reviewsResponse.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Add User
    const handleAddUser = async () => {
        try {
            const response = await axios.post("https://college-review-backend.vercel.app/api/auth/users", newUser);
            setUsers([...users, response.data.user]);
            setNewUser({ username: "", email: "", password: "", age: "", college_name: "", course: "" });
            alert("User added successfully!");
        } catch (err) {
            alert(err.response?.data?.message || "Error adding user.");
        }
    };

    // Update User
    const handleUpdateUser = async () => {
        try {
            const response = await axios.put(`https://college-review-backend.vercel.app/api/auth/users/${editUser.user_id}`, editUser);
            setUsers(users.map(u => u.user_id === editUser.user_id ? response.data.user : u));
            setEditUser(null);
            alert("User updated successfully!");
        } catch (err) {
            alert(err.response?.data?.message || "Error updating user.");
        }
    };

    // Delete User
    const handleDeleteUser = async (user_id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`https://college-review-backend.vercel.app/api/auth/users/${user_id}`);
                setUsers(users.filter(u => u.user_id !== user_id));
                alert("User deleted successfully!");
            } catch (err) {
                alert(err.response?.data?.message || "Error deleting user.");
            }
        }
    };

    // Add Review
    const handleAddReview = async () => {
        try {
            const response = await axios.post("https://college-review-backend.vercel.app/api/auth/reviews", newReview);
            setReviews([...reviews, response.data.review]);
            setNewReview({ user_id: "", college_name: "", course_name: "", rating: 1, feedback: "" });
            alert("Review added successfully!");
        } catch (err) {
            alert(err.response?.data?.message || "Error adding review.");
        }
    };

    // Update Review
    const handleUpdateReview = async () => {
        try {
            const response = await axios.put(`https://college-review-backend.vercel.app/api/auth/reviews/${editReview._id}`, editReview);
            setReviews(reviews.map(r => r._id === editReview._id ? response.data.review : r));
            setEditReview(null);
            alert("Review updated successfully!");
        } catch (err) {
            alert(err.response?.data?.message || "Error updating review.");
        }
    };

    // Delete Review
    const handleDeleteReview = async (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await axios.delete(`https://college-review-backend.vercel.app/api/auth/reviews/${id}`);
                setReviews(reviews.filter(r => r._id !== id));
                alert("Review deleted successfully!");
            } catch (err) {
                alert(err.response?.data?.message || "Error deleting review.");
            }
        }
    };

    if (loading) return <div className="adminDashboardPage"><h1>Loading...</h1></div>;
    if (error) return <div className="adminDashboardPage"><h1>Error</h1><p>{error}</p></div>;

    return (
        <div className="adminDashboardPage">
            <h1>Welcome to Admin Dashboard!</h1>
            <h3>Manage Site Users and Reviews</h3>

            {/* Users Section */}
            <section className="dashboardSection">
                <h2>Users</h2>
                <button onClick={() => setEditUser({})}>Add New User</button>
                <div className="userTableContainer">
                    <table className="userTable">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>College</th>
                                <th>Course</th>
                                <th>Actions</th>
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
                                    <td>
                                        <button onClick={() => setEditUser(user)}>Edit</button>
                                        <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* User Modal */}
                {editUser && (
                    <div className="modal">
                        <h3>{editUser.user_id ? "Edit User" : "Add User"}</h3>
                        <input value={editUser.username || ""} onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} placeholder="Username" />
                        <input value={editUser.email || ""} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} placeholder="Email" />
                        <input value={editUser.password || ""} onChange={(e) => setEditUser({ ...editUser, password: e.target.value })} placeholder="Password" type="password" />
                        <input value={editUser.age || ""} onChange={(e) => setEditUser({ ...editUser, age: Number(e.target.value) })} placeholder="Age" type="number" />
                        <input value={editUser.college_name || ""} onChange={(e) => setEditUser({ ...editUser, college_name: e.target.value })} placeholder="College Name" />
                        <input value={editUser.course || ""} onChange={(e) => setEditUser({ ...editUser, course: e.target.value })} placeholder="Course" />
                        <button onClick={editUser.user_id ? handleUpdateUser : handleAddUser}>{editUser.user_id ? "Update" : "Add"}</button>
                        <button onClick={() => setEditUser(null)}>Cancel</button>
                    </div>
                )}
            </section>

            {/* Reviews Section */}
            <section className="dashboardSection">
                <h2>Reviews</h2>
                <button onClick={() => setEditReview({})}>Add New Review</button>
                <div className="userTableContainer">
                    <table className="userTable">
                        <thead>
                            <tr>
                                <th>Review ID</th>
                                <th>User ID</th>
                                <th>College</th>
                                <th>Course</th>
                                <th>Rating</th>
                                <th>Feedback</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review._id}>
                                    <td>{review.review_id}</td>
                                    <td>{review.user_id}</td>
                                    <td>{review.college_name}</td>
                                    <td>{review.course_name}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.feedback}</td>
                                    <td>
                                        <button onClick={() => setEditReview(review)}>Edit</button>
                                        <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Review Modal */}
                {editReview && (
                    <div className="modal">
                        <h3>{editReview._id ? "Edit Review" : "Add Review"}</h3>
                        <input value={editReview.user_id || ""} onChange={(e) => setEditReview({ ...editReview, user_id: Number(e.target.value) })} placeholder="User ID" type="number" />
                        <input value={editReview.college_name || ""} onChange={(e) => setEditReview({ ...editReview, college_name: e.target.value })} placeholder="College Name" />
                        <input value={editReview.course_name || ""} onChange={(e) => setEditReview({ ...editReview, course_name: e.target.value })} placeholder="Course Name" />
                        <input value={editReview.rating || ""} onChange={(e) => setEditReview({ ...editReview, rating: Number(e.target.value) })} placeholder="Rating (1-10)" type="number" min="1" max="10" />
                        <input value={editReview.feedback || ""} onChange={(e) => setEditReview({ ...editReview, feedback: e.target.value })} placeholder="Feedback" />
                        <button onClick={editReview._id ? handleUpdateReview : handleAddReview}>{editReview._id ? "Update" : "Add"}</button>
                        <button onClick={() => setEditReview(null)}>Cancel</button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AdminDashboard;