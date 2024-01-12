import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";

export default function RegisterStudent() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        exp: "",
    });

    const registerStd = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword, name, phoneNumber, bio, skills, exp } = data;

        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password do not match");
            return;
        }

        try {
            const { data } = await axios.post("/registerStudent", {
                email,
                password,
                name,
                phoneNumber,
                bio,
                skills,
                exp,
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                toast.success("Registeration Successful");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mb-5">
            <Navbar />
            <div className="container mt-5">
                <h3 className="pb-3 text-center">New Student Registration</h3>
                <form className="border rounded p-4" onSubmit={registerStd}>
                    <section className="contactinfo">
                        <div className="form-row text-left row">
                            <div className="form-group col-md-6 text-left">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    id="name"
                                    placeholder="full name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6 text-left">
                                <label htmlFor="number">Contact Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="number"
                                    name="number"
                                    placeholder="1234567890"
                                    value={data.phoneNumber}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            phoneNumber: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-group text-left">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
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
                    </section>
                    <section className="information text-left">
                        <div className="form-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                className="form-control"
                                id="bio"
                                name="bio"
                                placeholder="I am the coolest..."
                                value={data.bio}
                                onChange={(e) => setData({ ...data, bio: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills">Skills and Interests</label>
                            <textarea
                                className="form-control"
                                id="skills"
                                name="skills"
                                placeholder="I am good at filling out forms..."
                                value={data.skills}
                                onChange={(e) => setData({ ...data, skills: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exp">Experience</label>
                            <textarea
                                className="form-control"
                                id="exp"
                                name="exp"
                                placeholder="I worked at a city hospital..."
                                value={data.exp}
                                onChange={(e) => setData({ ...data, exp: e.target.value })}
                            ></textarea>
                        </div>
                    </section>

                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
