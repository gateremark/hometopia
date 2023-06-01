import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Loader from "./Loader";

const PrivateRoute = () => {
	const { loggedIn, checkingStatus } = useAuthStatus();
	if (checkingStatus) {
		return <Loader />;
	}
	return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
