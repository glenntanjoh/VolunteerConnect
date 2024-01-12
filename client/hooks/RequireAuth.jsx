import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ type }) => {
    const { user, loaded } = useContext(UserContext);

    const verify = () => {
        return loaded ? (
            user && user.type == type ? (
                <Outlet />
            ) : (
                <Navigate to={"/login"} replace={true} />
            )
        ) : (
            <p>Verifying Credentials...</p>
        );
    };

    return verify();
};

export default RequireAuth;
