import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/NavbarStd";
import CommentArea from "../components/CommentArea";

export default function ViewOrgProfile() {
    const { profileID } = useParams();

    const [userData, setUserData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log("Check 1");
                const response = await axios.get(`/viewOrgProfile/${profileID}`);
                // console.log("Check 2");
                // console.log(response);
                if (!response.data) {
                    throw new Error("No data received");
                }
                // console.log("Check 3");
                setUserData(response.data);
                setUserInfo(response.data.profileInfo);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData(); // Call the async function
    }, [profileID]);

    // console.log(userInfo);

    return (
        <div>
            <Navbar />
            {userInfo && userData ? (
                <div className="container mt-5 main-content">
                    <div>
                        <div className="p-3 mb-2 bg-success-light text-emphasis-success border border-success p-2 mb-2 border-top-10 border-3 rounded-2">
                            <h1 className="text-center border border-2 bg-white p-1 rounded-3 mb-5 mt-2">
                                Organization Profile
                            </h1>
                            <div>
                                <div className="container-flex">
                                    {/* <h2 className='container'>Welcome</h2> */}

                                    <div className="container row">
                                        <div className="col-9">
                                            {/* Org name */}
                                            <h4 className="mb-4">{userInfo.orgName}</h4>

                                            {/* Description */}
                                            <h4>Description</h4>
                                            <p
                                                className="border border-white border-3 rounded-1 p-2 mb-2 "
                                                style={{
                                                    whiteSpace: "pre-line",
                                                }}
                                            >
                                                {userInfo.description}
                                            </p>

                                            {/* Check for data in more , if found, only then show this field */}
                                            {userInfo.more && (
                                                <div>
                                                    <h4>More Info</h4>
                                                    <p
                                                        style={{
                                                            whiteSpace: "pre-line",
                                                        }}
                                                    >
                                                        {userInfo.more}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        {/* <div className="col-auto"></div> */}
                                        <div className="col-3">
                                            <h4 className="text-center border rounded-2 bg-warning">
                                                Contact Us
                                            </h4>

                                            <h5>Name</h5>
                                            <p className="">{userInfo.contactName}</p>

                                            <h5>Organization Email</h5>
                                            <p typeof="email">{userData.email}</p>

                                            <h5>Email</h5>
                                            <p typeof="email">{userInfo.contactEmail}</p>

                                            <h5>Number</h5>
                                            <p>{userInfo.contactPhoneNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="border border-success border-3 rounded-3 ">
                            <CommentArea />
                        </section>
                    </div>
                </div>
            ) : (
                <p>User not logged in</p>
            )}
        </div>
    );
}
