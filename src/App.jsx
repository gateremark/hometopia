import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	Home,
	Profile,
	Offers,
	ForgotPass,
	Signin,
	Signup,
} from "./Routes";
import Navbar from "./components/Navbar";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/offers" element={<Offers />} />
					<Route path="/forgot-password" element={<ForgotPass />} />
					<Route path="/sign-in" element={<Signin />} />
					<Route path="/sign-up" element={<Signup />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
