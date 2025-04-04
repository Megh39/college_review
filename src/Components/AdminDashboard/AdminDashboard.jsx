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
    const [showModal, setShowModal] = useState(false);

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
    const handleAddUser = async () => {
        if (!newUser.username || !newUser.email || !newUser.password || !newUser.age || !newUser.college_name || !newUser.course) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await axios.post("https://college-review-backend.vercel.app/api/auth/users", {
                ...newUser,
                age: Number(newUser.age),
            });

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
                await axios.delete(`https://college-review-backend.vercel.app/api/auth/users/${Number(user_id)}`);

                setUsers(users.filter(u => u.user_id !== user_id));
                alert("User deleted successfully!");
            } catch (err) {
                alert(err.response?.data?.message || "Error deleting user.");
            }
        }
    };
    // const handleAddReview = async () => {
    //     if (!newReview.user_id || !newReview.college_name || !newReview.course_name || !newReview.rating || !newReview.feedback) {
    //         alert("All fields are required!");
    //         return;
    //     }

    //     try {
    //         const response = await axios.post("https://college-review-backend.vercel.app/api/auth/submit", {
    //             ...newReview,
    //             user_id: Number(newReview.user_id),
    //             rating: Number(newReview.rating),
    //         });

    //         setReviews([...reviews, response.data.review]);
    //         setNewReview({ user_id: "", college_name: "", course_name: "", rating: 1, feedback: "" });
    //         alert("Review added successfully!");
    //     } catch (err) {
    //         alert(err.response?.data?.message || "Error adding review.");
    //     }
    // };

    const handleUpdateReview = async () => {
        try {
            const response = await axios.put(
                `https://college-review-backend.vercel.app/api/auth/reviews/${editReview.review_id}`,
                editReview
            );
            setReviews(reviews.map(r => r.review_id === editReview.review_id ? response.data.review : r));
            setEditReview(null);
            alert("Review updated successfully!");
        } catch (err) {
            alert(err.response?.data?.message || "Error updating review.");
        }
    };
    const handleApproveReview = async (reviewId, currentApprovalStatus) => {
        try {
            const response = await axios.put(`https://college-review-backend.vercel.app/api/auth/reviews/${reviewId}`, {
                approved: !currentApprovalStatus,  // Toggle approval status
            });

            setReviews(reviews.map(review =>
                review.review_id === reviewId ? { ...review, approved: !currentApprovalStatus } : review
            ));

            alert("Review approval status updated!");
        } catch (err) {
            console.error("Error updating approval status:", err);
            alert(err.response?.data?.message || "Failed to update review approval.");
        }
    };


    const handleDeleteReview = async (reviewId) => {
        if (!reviewId) {
            alert("Invalid review ID.");
            return;
        }

        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await axios.delete(`https://college-review-backend.vercel.app/api/auth/reviews/${reviewId}`);
                setReviews(reviews.filter(r => r.review_id !== reviewId)); // Filter by `review_id`
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




                <div className="userTableContainer">
                    <table className="userTable">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>College</th>
                                <th>Course</th>
                                <th>Password</th>
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
                                    <td>{user.password}</td>
                                    <td>
                                        <button onClick={() => {
                                            setEditUser(user); // Make sure modal opens
                                            setShowModal(true);
                                        }}>Edit</button>                                        <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    className="addnewuserbutton"
                    onClick={() => {
                        setNewUser({
                            username: "",
                            email: "",
                            password: "",
                            age: "",
                            college_name: "",
                            course: ""
                        });
                        setShowModal(true);  // Ensure modal opens
                    }}
                >
                    Add New User
                </button>
                {showModal && (
                    <div className="modal">
                        <h3>{editUser ? "Edit User" : "Add User"}</h3>

                        <input
                            value={editUser ? editUser.username : newUser.username}
                            onChange={(e) =>
                                editUser
                                    ? setEditUser({ ...editUser, username: e.target.value })
                                    : setNewUser({ ...newUser, username: e.target.value })
                            }
                            placeholder="Username"
                        />

                        <input
                            value={editUser ? editUser.email : newUser.email}
                            onChange={(e) =>
                                editUser
                                    ? setEditUser({ ...editUser, email: e.target.value })
                                    : setNewUser({ ...newUser, email: e.target.value })
                            }
                            placeholder="Email"
                        />

                        <input
                            type="password"
                            value={editUser ? editUser.password : newUser.password}
                            onChange={(e) =>
                                editUser
                                    ? setEditUser({ ...editUser, password: e.target.value })
                                    : setNewUser({ ...newUser, password: e.target.value })
                            }
                            placeholder="Password"
                        />

                        <input
                            type="number"
                            value={editUser ? editUser.age : newUser.age}
                            onChange={(e) =>
                                editUser
                                    ? setEditUser({ ...editUser, age: Number(e.target.value) })
                                    : setNewUser({ ...newUser, age: Number(e.target.value) })
                            }
                            placeholder="Age"
                        />

                        <input
                            value={editUser ? editUser.college_name : newUser.college_name}
                            onChange={(e) =>
                                editUser
                                    ? setEditUser({ ...editUser, college_name: e.target.value })
                                    : setNewUser({ ...newUser, college_name: e.target.value })
                            }
                            placeholder="College Name"
                        />

                        <input
                            value={editUser ? editUser.course : newUser.course}
                            onChange={(e) =>
                                editUser
                                    ? setEditUser({ ...editUser, course: e.target.value })
                                    : setNewUser({ ...newUser, course: e.target.value })
                            }
                            placeholder="Course"
                        />

                        <button onClick={editUser ? handleUpdateUser : handleAddUser}>
                            {editUser ? "Update" : "Add"}
                        </button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>

                    </div>
                )}


            </section>

            {/* Reviews Section */}
            <section className="dashboardSection">
                <h2>Reviews</h2>
                {/* <button onClick={() => setEditReview({
                    user_id: "", username: "", college_name: "", course_name: "", rating: 1, feedback: ""
                })}>
                    Add New Review
                </button> */}
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
                                        <button onClick={() => handleApproveReview(review.review_id, review.approved)}>
                                            {review.approved ? "Disapprove" : "Approve"}
                                        </button>
                                        <button onClick={() => handleDeleteReview(review.review_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {/* Review Modal */}
                {editReview && (
                    <div className="modal">
                        <h3>{editReview.review_id ? "Edit Review" : "Add Review"}</h3>
                        <input value={editReview.user_id || ""} onChange={(e) => setEditReview({ ...editReview, user_id: Number(e.target.value) })} placeholder="User ID" type="number" />

                        <input value={editReview.college_name || ""} onChange={(e) => setEditReview({ ...editReview, college_name: e.target.value })} placeholder="College Name" />
                        <input value={editReview.course_name || ""} onChange={(e) => setEditReview({ ...editReview, course_name: e.target.value })} placeholder="Course Name" />
                        <input value={editReview.rating || ""} onChange={(e) => setEditReview({ ...editReview, rating: Number(e.target.value) })} placeholder="Rating (1-10)" type="number" min="1" max="10" />
                        <input value={editReview.feedback || ""} onChange={(e) => setEditReview({ ...editReview, feedback: e.target.value })} placeholder="Feedback" />
                        <button onClick={editReview._id ? handleUpdateReview : handleAddReview}>{editReview.review_id ? "Update" : "Add"}</button>
                        <button onClick={() => setEditReview(null)}>Cancel</button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AdminDashboard;