import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext.jsx";
import "./Dashboardorg.css";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
// import SearchBar from "../components/Searchbar";
import Postings from "../components/Postings.jsx";
import Studentnavbar from "../components/NavbarStd.jsx";
import { useState } from "react";

import { Link } from "react-router-dom";

export default function DashboardStudent() {
    return (
        <div>
            <Studentnavbar />

            <Postings />
        </div>
    );
}

const resultsList = {
    borderColor: "#6aab73",
    borderStyle: "none",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    marginTop: "50px",
    marginLeft: "290px",
    marginRight: "430px",
    maxHeight: "800px",
    overflowY: "scroll",
};

const searchresults = {
    backgroundColor: "white",
    borderColor: "black",
    borderStyle: "solid",
    color: "black",
    padding: "5px",
    paddingTop: "15px",
    margin: "5px",
    textDecoration: "none",
    borderRadius: "5px",
    height: "60px",
    boxShadow: "8px",
};
