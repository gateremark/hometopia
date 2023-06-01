import { useState } from "react";
import Profilepic from "../assets/logo/profile.png";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Profile = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [changeName, setChangeName] = useState(false);
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

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				//update display name in firebase auth
				await updateProfile(auth.currentUser, {
					displayName: name,
				});

				//update name in firestore
				const docRef = doc(db, "users", auth.currentUser.uid);

				await updateDoc(docRef, {
					name,
				});
			}
			toast.success("Profile Details Updated!");
		} catch (error) {
			toast.error("Could not update the Profile Details 😢");
		}
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
							disabled={!changeName}
							onChange={onChange}
							className={`w-full bg-transparent py-2 text-3xl text-[#3c546e] text-center border-[#3c546e] transition ease-in-out rounded cursor-pointa ${
								changeName &&
								"bg-[#16b0df] focus:bg-[#3c546e] focus:text-[#ffffff]"
							}`}
						/>

						<input
							type="email"
							id="email"
							value={email}
							disabled
							className="w-full bg-transparent py-2 text-3xl text-[#3c546e] text-center border-[#3c546e] transition ease-in-out rounded cursor-pointa"
						/>

						<div className="w-full flex justify-between whitespace-nowrap text-sm sm:text-lg mt-6 mb-6">
							<p className="text-[#172431] font-light items-center">
								Want to change your name?
								<span
									onClick={() => {
										changeName && onSubmit();
										setChangeName((prevState) => !prevState);
									}}
									className="text-[#172431] text-xl font-semibold transition duration-500 ease-in-out hover:text-[#3c546e] cursor-pointc"
								>
									{" "}
									{changeName ? "Apply Change" : "Edit"}
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
