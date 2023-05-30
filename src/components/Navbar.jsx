import Logo from "../assets/logo/logonobg.png";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const {pathname} = useLocation()
  // console.log(pathname)
  const pathRoute = (route) => {
    if (route === pathname){
      // console.log(pathname);
      // console.log(route);
      return true
    }
  } 
	return (
		<div className="bg-navcolor/50 shadow-md sticky top-0 z-99">
			<header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
				<div>
					<img src={Logo} className="h-10" alt="HomeTopia Logo" />
				</div>

				<div>
					<ul className="flex space-x-10">
						<li
							className={`py-3 text-sm font-semibold text-[#18C7FA] ${
								pathRoute("/") && "border-b-[3px] text-[#9dd8eb]"
							} `}
						>
							Home
						</li>
						<li
							className={`py-3 text-sm font-semibold text-[#18C7FA] ${
								pathRoute("/offers") && "border-b-[3px] text-[#9dd8eb]"
							} `}
						>
							Offers
						</li>
						<li
							className={`py-3 text-sm font-semibold text-[#18C7FA] ${
								pathRoute("/sign-in") && "border-b-[3px] text-[#9dd8eb]"
							} `}
						>
							Sign In
						</li>
						<li
							className={`py-3 text-sm font-semibold text-[#18C7FA] ${
								pathRoute("/sign-up") && "border-b-[3px] text-[#9dd8eb]"
							} `}
						>
							Sign Up
						</li>
					</ul>
				</div>
			</header>
		</div>
	);
};

export default Navbar;
