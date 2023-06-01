import { useState } from "react";
import Profilepic from "../assets/logo/profile.png";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});
	const { name, email } = formData;

	const onLogOut = () => {
		auth.signOut();
		navigate("/");
		toast.info(`See you Again, ${name}!`);
	};
	return (
		<>
			<section>
				<img
					src={Profilepic}
					className="h-24 mt-4 m-auto"
					alt=""
					style={{ transform: "rotateY(180deg)" }}
				/>
				<h1 className="text-4xl mt-2 text-center font-bold text-[#202e3d]">
					My Profile
				</h1>
				<div className="w-[95%] md:w-[50%] m-auto">
					<form action="" className="mt-6">
						<input
							type="text"
							id="name"
							value={name}
							disabled
							className="w-full bg-transparent py-2 text-3xl text-[#3c546e] text-center border-[#3c546e] transition ease-in-out cursor-pointa"
						/>

						<input
							type="email"
							id="email"
							value={email}
							disabled
							className="w-full bg-transparent py-2 text-3xl text-[#3c546e] text-center border-[#3c546e] transition ease-in-out cursor-pointa"
						/>

						<div className="w-full flex justify-between whitespace-nowrap text-sm sm:text-lg mt-6 mb-6">
							<p className="text-[#172431] font-light items-center">
								Want to change your name?
								<span className="text-[#172431] text-xl font-semibold transition duration-500 ease-in-out hover:text-[#3c546e] cursor-pointc">
									{" "}
									Edit
								</span>
							</p>
							<p
								onClick={onLogOut}
								className="text-[#7e1e1e] text-xl font-semibold transition duration-500 ease-in-out hover:text-[#af4646] cursor-pointc"
							>
								Sign Out
							</p>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default Profile;
