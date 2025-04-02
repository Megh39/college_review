import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Select, Input } from "antd";
import { Link } from "react-router-dom";
import "./Colleges.css";

const { Option } = Select;

const Colleges = () => {
    const [colleges, setColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter & Sort states
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); // Default: Alphabetical Order (A-Z)

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await axios.get("https://college-review-backend.vercel.app/api/colleges");

                // Sort colleges alphabetically by default (A-Z)
                const sortedColleges = [...response.data].sort((a, b) =>
                    (a.name || "").localeCompare(b.name || "")
                );

                setColleges(sortedColleges);
                setFilteredColleges(sortedColleges);
                setLoading(false);
            } catch (error) {
                setError("Error fetching colleges");
                setLoading(false);
            }
        };

        fetchColleges();
    }, []);

    // Filtering & Sorting Logic
    useEffect(() => {
        let filtered = colleges;

        if (searchQuery) {
            filtered = filtered.filter(college =>
                (college.name || "").toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply Sorting AFTER Filtering
        filtered = [...filtered].sort((a, b) =>
            sortOrder === "asc" ? (a.name || "").localeCompare(b.name || "") 
                                : (b.name || "").localeCompare(a.name || "")
        );

        setFilteredColleges(filtered);
    }, [searchQuery, sortOrder, colleges]);

    if (loading) return <div className="loadingBox">Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Filters & Sorting */}
            <div className="filters">
                <Input
                    placeholder="Search by College Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: "25%", marginRight: "10px" }}
                />

                {/* Sorting Dropdown */}
                <Select
                    value={sortOrder}
                    onChange={(value) => setSortOrder(value)}
                    style={{ width: "20%" }}
                >
                    <Option value="asc">Sort A-Z</Option>
                    <Option value="desc">Sort Z-A</Option>
                </Select>
            </div>

            {/* College Cards */}
            <Row gutter={[16, 16]}>
                {filteredColleges.map(college => (
                    <Col xs={24} sm={12} md={8} lg={8} key={college.id}>
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

                            <Link to={`/college/${college.id}`} className="viewDetailsButton">
                                View Details
                            </Link>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Colleges;
