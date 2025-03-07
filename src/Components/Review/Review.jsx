import React, { useState } from "react";
import axios from "axios";

const Review = () => {
    const [collegeId, setCollegeId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");

    // Get logged-in user ID from localStorage (or another method)
    const userId = localStorage.getItem("user_id");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setMessage("User not logged in.");
            return;
        }

        try {
            const response = await axios.post("https://college-review-backend.vercel.app/api/auth/submit", {
                user_id: userId,
                college_id: collegeId,
                course_name: courseName,
                rating,
                feedback,
            });

            setMessage(response.data.message);
            setCollegeId("");
            setCourseName("");
            setRating(1);
            setFeedback("");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error submitting review.");
        }
    };

    return (
        <div>
            <h2>Submit a Review</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>College ID:</label>
                    <input type="text" value={collegeId} onChange={(e) => setCollegeId(e.target.value)} required />
                </div>
                <div>
                    <label>Course Name:</label>
                    <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
                </div>
                <div>
                    <label>Rating (1-10):</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>Feedback:</label>
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default Review;
