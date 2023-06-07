import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	Home,
	Profile,
	Offers,
	ForgotPass,
	Signin,
	Signup,
	PrivateRoute,
	AddListing,
	EditListing,
	SingleListing,
	Category,
} from "./Routes";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="/offers" element={<Offers />} />
					<Route path="/category/:categoryName" element={<Category />} />
					<Route path="/forgot-password" element={<ForgotPass />} />
					<Route path="/sign-in" element={<Signin />} />
					<Route path="/sign-up" element={<Signup />} />
					<Route path="/add-listing" element={<PrivateRoute />}>
						<Route path="/add-listing" element={<AddListing />} />
					</Route>
					<Route path="/edit-listing" element={<PrivateRoute />}>
						<Route path="/edit-listing/:listingId" element={<EditListing />} />
					</Route>
					<Route
						path="/category/:categoryName/:listingId"
						element={<SingleListing />}
					/>
				</Routes>
			</Router>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
}

export default App;
