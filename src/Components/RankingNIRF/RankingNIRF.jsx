import React, { useState } from "react";
import Agriculture_Data from "../../Data/agricultureranking2024.json"; // Direct Import
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
        Agriculture_Data: {
            data: Agriculture_Data.Agriculture_Ranking, // Extract the ranking data
            key: "Agriculture_Ranking",
        },
        Architecture_Data: {
            data: Architecture_Data.Architecture_Ranking,
            key: "Architecture_Ranking",
        },
        College_Data: {
            data: College_Data.College_Ranking,
            key: "College_Ranking",
        },
        Dental_Data: {
            data: Dental_Data.Dental_Ranking,
            key: "Dental_Ranking",
        },
        Engineering_Data: {
            data: Engineering_Data.Engineering_Ranking,
            key: "Engineering_Ranking",
        },
        Innovation_Data: {
            data: Innovation_Data.Innovation_Ranking,
            key: "Innovation_Ranking",
        },
        Law_Data: {
            data: Law_Data.Law_Ranking,
            key: "Law_Ranking",
        },
        Management_Data: {
            data: Management_Data.Management_Ranking,
            key: "Management_Ranking",
        },
        Medical_Data: {
            data: Medical_Data.Medical_Ranking,
            key: "Medical_Ranking",
        },
        Pharmacy_Data: {
            data: Pharmacy_Data.Pharmacy_Ranking,
            key: "Pharmacy_Ranking",
        },
        Research_Data: {
            data: Research_Data.Research_Ranking,
            key: "Research_Ranking",
        },

        University_Data: {
            data: University_Data.University_Ranking,
            key: "University_Ranking",
        },
    };

    const [selectedFile, setSelectedFile] = useState("Agriculture_Data");
    const [data, setData] = useState(jsonFiles[selectedFile].data || []);

    const handleChange = (e) => {
        const newSelection = e.target.value;
        setSelectedFile(newSelection);
        setData(jsonFiles[newSelection].data || []);
    };

    return (
        <div>
            <h1>NIRF Rankings</h1>

            <h3>Select Type of Ranking you want to view: </h3>
            <select onChange={handleChange} value={selectedFile}>
                {Object.keys(jsonFiles).map((file, index) => (
                    <option key={index} value={file}>
                        {file}
                    </option>
                ))}
            </select>

            {/* Table Displaying JSON Data */}
            <table  className="RankingTable">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>ID</th>

                        <th>College Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Ranking Score</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((college, index) => (
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
                            <td colSpan="6">No Data Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RankingNIRF;
