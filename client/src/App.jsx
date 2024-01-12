import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterStudent from "./pages/RegisterStudent";
import RegisterOrg from "./pages/RegisterOrg";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import NotFound404 from "./pages/NotFound404";
import axios from "axios";
import { UserContextProvider } from "../hooks/UserContext.jsx";
import RequireAuth from "../hooks/RequireAuth.jsx";
import DashboardOrg from "./pages/DashboardOrg";
import DashboardStudent from "./pages/DashboardStudent";
import Sidebar from "./components/Sidebar";
import ProfileOrg from "./orgPages/ProfileOrg";
import Applications from "./orgPages/Applications";
import ManagePostings from "./orgPages/ManagePostings";
import StudentPostpage from "./pages/StudentPostpage.jsx";
import CreateNewPosting from "./orgPages/CreateNewPosting";
import Postapplication from "./pages/Postapplication.jsx";
import postings from "./components/Postings.jsx";
import Postings from "./components/Postings.jsx";
import ProfileStudent from "./studentPages/ProfileStudent";
import ViewStudentProfile from "./pages/ViewStudentProfile";
import ViewOrgProfile from "./pages/ViewOrgProfile";
import StudentApplications from "./studentPages/StudentApplications.jsx";
import PostApp from "./orgPages/postApp.jsx";
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
    return (
        <UserContextProvider>
             <Toaster position='top-center' toastOptions={{ duration: 3000 }} />
            {/* Navbar is static for all pages - Outside route */}
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/registerStudent" element={<RegisterStudent />} />
                <Route path="/registerOrg" element={<RegisterOrg />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {/* Protected student routes */}
                <Route element={<RequireAuth type={"student"} />}>
                    <Route path="/dashboardstd" element={<DashboardStudent />} />
                    <Route path="/profileStudent" element={<ProfileStudent />} />
                    <Route path="/post/:postID" element={<StudentPostpage />} />
                    <Route path="/post/:postID/postapplication" element={<Postapplication />} />
                    <Route path="/StudentApplications" element={<StudentApplications />} />
                    <Route path={`/viewOrgProfile/:profileID`} element={<ViewOrgProfile />} />
                </Route>

                {/* Protected organization routes */}
                <Route element={<RequireAuth type={"organization"} />}>
                    <Route path="/dashboardorg" element={<DashboardOrg />} />
                    <Route path="/profileOrg" element={<ProfileOrg />} />
                    <Route path="/managePostings" element={<ManagePostings />} />
                    <Route path="/applications" element={<Applications />} />
                    <Route path="/postApp/:postID" element={<PostApp />} />
                    <Route
                        path={`/viewStudentProfile/:profileID`}
                        element={<ViewStudentProfile />}
                    />
                </Route>

                {/* Don't put any routes after this 404 or they won't work */}
                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </UserContextProvider>
    );
}

export default App;
