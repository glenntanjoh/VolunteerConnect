import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import "./Dashboardorg.css";
import { Link, useNavigate } from "react-router-dom";
import CreateNewPosting from "../orgPages/CreateNewPosting";
import Navbar from "../components/NavbarOrg";

export default function DashboardOrg() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // console.log(user);
    return (
        <div>
            <Navbar />

            <section className="container mt-5 text-center">
                <h3 className="text-center head">
                    Create a new Volunteer Posting
                </h3>
                {isModalOpen ? (
                    <button
                        onClick={handleToggleModal}
                        className="btn btn-success plus-button"
                    >
                        -
                    </button>
                ) : (
                    <button
                        onClick={handleToggleModal}
                        className="btn btn-success plus-button"
                    >
                        +
                    </button>
                )}

            </section>
            {isModalOpen && <CreateNewPosting onClose={handleToggleModal} />}
            <div className="container mt-5 text-center border border-2 rounded-2 col-4 d-flex flex-column align-items-center">
                <div className="row">
                    <div className="d-flex flex-row flex-center text-center">
                        <h4 className="m-3 col-8">Manage your Postings</h4>
                        <div className="col-2 btn btn-outline-success p-2 pb-1 pt-1 m-2 text-center mt-3" onClick={() => navigate("/managePostings")}>Here</div>
                    </div>
                    <div className="d-flex flex-row flex-center text-center mb-2">
                        <h4 className="m-3 col-8">See all student applications</h4>
                        <div className="col-2 btn btn-outline-success p-2 pb-1 pt-1 m-2 text-center mt-3" onClick={() => navigate("/applications")}>View</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
