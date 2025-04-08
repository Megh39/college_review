import React, { useState } from "react";
import axios from "axios";
import "./Review.css";

const Review = () => {
    const [collegeName, setcollegeName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [overallRating, setOverallRating] = useState(1);
    const [facultyRating, setFacultyRating] = useState(1);
    const [facilityRating, setFacilityRating] = useState(1);
    const [placementRating, setPlacementRating] = useState(1);
    const [campusLifeRating, setCampusLifeRating] = useState(1);
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;
    const userName = user?.username;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setMessage("User not logged in.");
            return;
        }

        try {
            const response = await axios.post("https://college-review-backend.vercel.app/api/auth/submit", {
                user_id: userId,
                username: userName,
                college_name: collegeName,
                course_name: courseName,
                overall_rating: overallRating,
                faculty_rating: facultyRating,
                facility_rating: facilityRating,
                placement_rating: placementRating,
                campus_life_rating: campusLifeRating,
                feedback,
            });

            setMessage(response.data.message);
            setcollegeName("");
            setCourseName("");
            setOverallRating(1);
            setFacultyRating(1);
            setFacilityRating(1);
            setPlacementRating(1);
            setCampusLifeRating(1);
            setFeedback("");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error submitting review.");
        }
    };
    const renderRatingOptions = (rating, setRating) => {
        const labels = {
            1: "Very Bad",
            2: "Bad to Average",
            3: "Average",
            4: "Good",
            5: "Excellent",
        };

        return (
            <div className="ratingContainer">
                {Object.entries(labels).map(([value, label]) => (
                    <label key={value} className="ratingLabel">
                        <input
                            type="radio"
                            value={value}
                            checked={rating === Number(value)}
                            onChange={(e) => setRating(Number(e.target.value))}
                            required
                        />
                        {value} – {label}
                    </label>
                ))}
            </div>
        );
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
                        <label>Overall Rating:</label>
                        {renderRatingOptions(overallRating, setOverallRating)}
                    </div>
                    <div className="reviewFormGroup">
                        <label>Faculty:</label>
                        {renderRatingOptions(facultyRating, setFacultyRating)}
                    </div>
                    <div className="reviewFormGroup">
                        <label>Facilities:</label>
                        {renderRatingOptions(facilityRating, setFacilityRating)}
                    </div>
                    <div className="reviewFormGroup">
                        <label>Placement:</label>
                        {renderRatingOptions(placementRating, setPlacementRating)}
                    </div>
                    <div className="reviewFormGroup">
                        <label>Campus Life:</label>
                        {renderRatingOptions(campusLifeRating, setCampusLifeRating)}
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
