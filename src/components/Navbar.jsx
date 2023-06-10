import Logo from "../assets/logo/logonobg.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const Navbar = () => {
	const [pageState, setPageState] = useState("Sign In");
	const { pathname } = useLocation();
	// console.log(pathname)
	const pathRoute = (route) => {
		if (route === pathname) {
			// console.log(pathname);
			// console.log(route);
			return true;
		}
	};

	const navigate = useNavigate();
	const auth = getAuth();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setPageState("Profile");
			} else {
				setPageState("Sign In");
			}
		});
	}, [auth]);
	return (
		<div className="bg-navcolor shadow-md sticky top-0 z-40">
			<header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
				<div>
					<img
						src={Logo}
						className="hidden sm:block cursor-pointc h-10"
						alt="HomeTopia Logo"
						onClick={() => navigate("/")}
					/>
				</div>

				<div>
					<ul className="flex space-x-10">
						<li
							className={`cursor-pointc py-3 text-lg font-semibold hover:text-[#024d66] ${
								pathRoute("/")
									? "border-b-[3px] border-[#024] text-[#024]"
									: "text-[#18C7FA]"
							} `}
							onClick={() => navigate("/")}
						>
							Home
						</li>
						<li
							className={`cursor-pointc py-3 text-lg font-semibold hover:text-[#024d66] ${
								pathRoute("/offers")
									? "border-b-[3px] border-[#024] text-[#024]"
									: "text-[#18C7FA]"
							} `}
							onClick={() => navigate("/offers")}
						>
							Offers
						</li>
						<li
							className={`cursor-pointc py-3 text-lg text-center font-semibold hover:text-[#024d66] ${
								pathRoute("/sign-in") || pathRoute("/profile")
									? "border-b-[3px] border-[#024] text-[#024]"
									: "text-[#18C7FA]"
							} `}
							onClick={() => navigate("/profile")}
						>
							{pageState}
						</li>
						{pageState !== "Profile" && (
							<li
								className={`cursor-pointc py-3 text-lg text-center font-semibold hover:text-[#024d66] ${
									pathRoute("/sign-up")
										? "border-b-[3px] border-[#024] text-[#024]"
										: "text-[#18C7FA]"
								} `}
								onClick={() => navigate("/sign-up")}
							>
								Sign Up
							</li>
						)}
						<li className="py-4">
							<a
								href="https://github.com/gateremark/hometopia"
								className="cursor-pointc text-xl font-semibold text-[#024] items-center hover:text-[#18C7FA] transition duration-500 ease-in-out focus:outline-none focus:ring-offset-2"
								target="_blank"
							>
								<FaGithub />
							</a>
						</li>
					</ul>
				</div>
			</header>

			{/* Mobile View */}
		</div>
	);
};

export default Navbar;
