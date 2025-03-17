import React, { useState } from "react";
import axios from "axios";
import "./Review.css"
const Review = () => {
    const [collegeName, setcollegeName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");

    // Get logged-in user ID from localStorage (or another method)
    const user = JSON.parse(localStorage.getItem("user")); // Parse the stored JSON
    const userId = user?.user_id; // Safely access user_id

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setMessage("User not logged in.");
            return;
        }

        try {
            const response = await axios.post("https://college-review-backend.vercel.app/api/auth/submit", {
                user_id: userId,
                college_name: collegeName,
                course_name: courseName,
                rating,
                feedback,
            });

            setMessage(response.data.message);
            setcollegeName("");
            setCourseName("");
            setRating(1);
            setFeedback("");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error submitting review.");
        }
    };

    return (
        <div className="reviewPage">
            <div className="reviewForm">
                <h2>Submit a Review</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="reviewFormGroup">
                        <label>College Name:</label>
                        <input type="text" value={collegeName} onChange={(e) => setcollegeName(e.target.value)} required />
                    </div>
                    <div className="reviewFormGroup">
                        <label>Course Name:</label>
                        <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
                    </div>
                    <div className="reviewFormGroup">
                        <label>Rating (1-10):</label>
                        <div className="ratingContainer">  {/* Adding ratingContainer here */}
                            {Array.from({ length: 10 }, (_, index) => (
                                <label key={index + 1}>
                                    <input
                                        type="radio"
                                        value={index + 1}
                                        checked={rating === index + 1}
                                        onChange={(e) => setRating(Number(e.target.value))}
                                        required
                                    />
                                    {index + 1}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="reviewFormGroup">
                        <label>Feedback:</label>
                        <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
                    </div>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default Review;
