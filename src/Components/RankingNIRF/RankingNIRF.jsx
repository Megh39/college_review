import React, { useState } from "react";
import Agriculture_Data from "../../Data/agricultureranking2024.json";
import Architecture_Data from "../../Data/architectureranking2024.json";
import College_Data from "../../Data/collegeranking2024.json";
import Dental_Data from "../../Data/dentalranking2024.json";
import Engineering_Data from "../../Data/engineeringranking2024.json";
import Innovation_Data from "../../Data/innovationranking2024.json";
import Law_Data from "../../Data/lawranking2024.json";
import Management_Data from "../../Data/managementranking2024.json";
import Medical_Data from "../../Data/medicalranking2024.json";
import Pharmacy_Data from "../../Data/pharmacyranking2024.json";
import Research_Data from "../../Data/researchranking2024.json";
import University_Data from "../../Data/universityranking2024.json";
import "./RankingNIRF.css";

const RankingNIRF = () => {
    const jsonFiles = {
        College_Data: {
            data: College_Data.College_Ranking,
            key: "College_Ranking",
            dataName: "College Ranking"
        },
        University_Data: {
            data: University_Data.University_Ranking,
            key: "University_Ranking",
            dataName: "University Ranking"
        },
        Agriculture_Data: {
            data: Agriculture_Data.Agriculture_Ranking,
            key: "Agriculture_Ranking",
            dataName: "Agriculture Ranking"
        },
        Architecture_Data: {
            data: Architecture_Data.Architecture_Ranking,
            key: "Architecture_Ranking",
            dataName: "Architecture Ranking"
        },
        Dental_Data: {
            data: Dental_Data.Dental_Ranking,
            key: "Dental_Ranking",
            dataName: "Dental Ranking"
        },
        Engineering_Data: {
            data: Engineering_Data.Engineering_Ranking,
            key: "Engineering_Ranking",
            dataName: "Engineering Ranking"
        },
        Innovation_Data: {
            data: Innovation_Data.Innovation_Ranking,
            key: "Innovation_Ranking",
            dataName: "Innovation Ranking"
        },
        Law_Data: {
            data: Law_Data.Law_Ranking,
            key: "Law_Ranking",
            dataName: "Law Ranking"
        },
        Management_Data: {
            data: Management_Data.Management_Ranking,
            key: "Management_Ranking",
            dataName: "Management Ranking"
        },
        Medical_Data: {
            data: Medical_Data.Medical_Ranking,
            key: "Medical_Ranking",
            dataName: "Medical Ranking"
        },
        Pharmacy_Data: {
            data: Pharmacy_Data.Pharmacy_Ranking,
            key: "Pharmacy_Ranking",
            dataName: "Pharmacy Ranking"
        },
        Research_Data: {
            data: Research_Data.Research_Ranking,
            key: "Research_Ranking",
            dataName: "Research Ranking"
        }
    };

    const [selectedFile, setSelectedFile] = useState("College_Data");
    const [data, setData] = useState(jsonFiles[selectedFile].data || []);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [filters, setFilters] = useState({});

    const handleChange = (e) => {
        const newSelection = e.target.value;
        setSelectedFile(newSelection);
        setData(jsonFiles[newSelection].data || []);
        setFilters({});
        setSortConfig({ key: null, direction: "asc" });
    };
    const clearFilters = () => {
        setFilters({});
    };
    // Sorting function
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setData(sortedData);
        setSortConfig({ key, direction });
    };

    // Filtering function
    const handleFilterChange = (e, key) => {
        const value = e.target.value.toLowerCase();
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value
        }));
    };

    const filteredData = data.filter((college) =>
        Object.keys(filters).every((key) =>
            college[key]?.toString().toLowerCase().includes(filters[key])
        )
    );

    return (
        <div>
            <h1>NIRF Rankings</h1>
            <div className="selectorContainer">
                <h3>Select Type of Ranking you want to view: </h3>
                <select onChange={handleChange} value={selectedFile}>
                    {Object.keys(jsonFiles).map((file, index) => (
                        <option key={index} value={file}>
                            {jsonFiles[file].dataName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filtering Inputs */}
            <div className="filterContainer">
                <input type="text" placeholder="Filter Rank" onChange={(e) => handleFilterChange(e, "college_rank")} />
                {/* <input type="text" placeholder="Filter ID" onChange={(e) => handleFilterChange(e, "college_id")} /> */}
                <input type="text" placeholder="Filter College Name" onChange={(e) => handleFilterChange(e, "college_name")} />
                <input type="text" placeholder="Filter City" onChange={(e) => handleFilterChange(e, "college_city")} />
                <input type="text" placeholder="Filter State" onChange={(e) => handleFilterChange(e, "college_state")} />
                <input type="text" placeholder="Filter Ranking Score" onChange={(e) => handleFilterChange(e, "ranking_score")} />
                <button onClick={clearFilters}>Clear Filters</button>

            </div>

            {/* Table Displaying JSON Data */}
            <table className="RankingTable">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("college_rank")}>Rank</th>
                        <th onClick={() => handleSort("college_id")}>ID</th>
                        <th onClick={() => handleSort("college_name")}>College Name</th>
                        <th onClick={() => handleSort("college_city")}>City</th>
                        <th onClick={() => handleSort("college_state")}>State</th>
                        <th onClick={() => handleSort("ranking_score")}>Ranking Score</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((college, index) => (
                            <tr key={index}>
                                <td>{college.college_rank}</td>
                                <td>{college.college_id}</td>
                                <td>{college.college_name}</td>
                                <td>{college.college_city}</td>
                                <td>{college.college_state}</td>
                                <td>{college.ranking_score}</td>
                                <td>
                                    <a href={college["odd href"] || college["even href"]} target="_blank" rel="noopener noreferrer">
                                        View Report
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No Data Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RankingNIRF;
