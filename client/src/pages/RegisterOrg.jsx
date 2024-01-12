import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from 'react-hot-toast';

export default function RegisterOrg() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        orgName: "",
        contactName: "",
        contactEmail: "",
        contactPhoneNumber: "",
        description: "",
        more: "",
    });

    const registerOrg = async (e) => {
        e.preventDefault();
        const {
            email,
            password,
            phoneNumber,
            orgName,
            contactName,
            contactEmail,
            contactPhoneNumber,
            description,
            more,
        } = data;


        console.log("Password:", password, "Confirm:", confirmPassword)
        if (data.password !== data.confirmPassword) {
            toast.error("Password and Confirm Password do not match");
            return;
        }

        try {
            const { data } = await axios.post("/registerOrg", {
                email,
                password,
                phoneNumber,
                orgName,
                contactName,
                contactEmail,
                contactPhoneNumber,
                description,
                more,
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData((prevData) => ({
                    ...prevData,
                    // Clearing the password and confirmPassword fields after successful registration
                    password: "",
                    confirmPassword: "",
                }));
                setData({});
                toast.success("Success");
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h3 className="pb-3 text-center">New Organization Registration</h3>
                <form className="border rounded p-4" onSubmit={registerOrg}>
                    <section className="contactinfo">
                        <h5 className="mb-3">Contact Person information</h5>
                        <div className="form-group">
                            <label htmlFor="orgName">Organization Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="orgName"
                                placeholder="Organization name"
                                value={data.orgName}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        orgName: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="example@mail.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-row row">
                                <div className="form-group col-md-6 text-left">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="at least 6 characters"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-6 text-left">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="confirm password"
                                        value={data.confirmPassword}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                            </div>
                            {/* <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="at least 6 characters"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-6 text-left">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="confirm password"
                                        value={data.confirmPassword}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div> */}
                        </div>
                    </section>
                    <section className="information">
                        <div className="form-group">
                            <label htmlFor="desciption">Desciption about Organization</label>
                            <textarea
                                className="form-control"
                                id="desciption"
                                placeholder="tell us more about this Organization..."
                                value={data.description}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        description: e.target.value,
                                    })
                                }
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="moreInfo">More information</label>
                            <textarea
                                className="form-control"
                                id="moreInfo"
                                placeholder="anything more?"
                                value={data.more}
                                onChange={(e) => setData({ ...data, more: e.target.value })}
                            ></textarea>
                        </div>
                    </section>

                    <div className="contactPerson">
                        <h5 className="mb-3 mt-5">Contact Person information</h5>
                        <div className="form-row row">
                            <div className="form-group col-md-6">
                                <label htmlFor="personName">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="personName"
                                    placeholder="full name"
                                    value={data.contactName}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            contactName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="number">Contact Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="number"
                                    placeholder="1234567890"
                                    value={data.contactPhoneNumber}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            contactPhoneNumber: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="personEmail">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="personEmail"
                            placeholder="example@mail.com"
                            value={data.contactEmail}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    contactEmail: e.target.value,
                                })
                            }
                        />
                    </div>
                    <button type="submit" className="btn btn-primary col-md-3 btn-lg">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
