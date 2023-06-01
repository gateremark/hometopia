import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const PrivateRoute = () => {
	const { loggedIn, checkingStatus } = useAuthStatus();
	if (checkingStatus) {
		return <h3>Loading...</h3>;
	}
	return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;