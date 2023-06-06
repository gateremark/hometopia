import { useReducer, useState } from "react";
import SigninImage from "../assets/logo/keyamico.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const Signin = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;
	const navigate = useNavigate();
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);

			if (userCredential.user) {
				const user = userCredential.user;
				console.log(user);
				navigate("/");

				// Show a success toast notification
				toast.success(`Welcome ${user.displayName}! 🎉`);
			}
		} catch (error) {
			const errorMessage = error.message;
			// console.log(errorMessage);
			// console.log(typeof errorMessage);
			// toast.error("Wrong user Credentials");

			const errorMessageArray = errorMessage.split(" ");
			{
				errorMessageArray.includes("(auth/invalid-email).") &&
					toast.error("Invalid Email 😢");
			}
			{
				errorMessageArray.includes("(auth/missing-password).") &&
					toast.error("Missing Password 😢");
			}
			{
				errorMessageArray.includes("(auth/user-not-found).") &&
					toast.error("User Not Found 😢");
			}
			{
				errorMessageArray.includes("(auth/wrong-password).") &&
					toast.error("Wrong Password 😢");
			}
		}
	};
	return (
		<section>
			<h1 className="text-4xl text-center mt-6 font-bold text-[#202e3d]">
				Sign In
			</h1>
			<div className="flex justify-center flex-wrap items-center p-6 max-w-6xl mx-auto">
				<div className="md:w-[67%] lg:w-[45%] mb-12 mb:mb-6">
					<img src={SigninImage} alt="Signin Image" className="w-full" />
				</div>
				<div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
					<form action="" onSubmit={onSubmit}>
						<input
							type="email"
							id="email"
							value={email}
							onChange={onChange}
							placeholder="Email Address"
							className="mb-6 w-full px-4 py-2 text-xl text-[#ffffff] bg-[#3c546e] placeholder:text-[#808080] rounded transition ease-in-out"
						/>
						<div className="relative mb-6">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								value={password}
								onChange={onChange}
								placeholder="Password"
								className="w-full px-4 py-2 text-xl text-[#ffffff] bg-[#3c546e] placeholder:text-[#808080] rounded transition ease-in-out"
							/>
							{showPassword ? (
								<FaEye
									className="absolute right-3 top-3 text-xl cursor-pointc"
									onClick={() => setShowPassword((prevState) => !prevState)}
								/>
							) : (
								<FaEyeSlash
									className="absolute right-3 top-3 text-xl cursor-pointc"
									onClick={() => setShowPassword((prevState) => !prevState)}
								/>
							)}
						</div>
						<div className="flex flex-col sm:flex-row justify-between items-center whitespace-nowrap text-sm sm:text-lg mb-6">
							<p className="text-[#172431] font-light">
								Don't Have an Account?
								<Link
									to="/sign-up"
									className="text-[#172431] text-xl font-semibold transition duration-500 ease-in-out hover:text-[#3c546e]"
								>
									{" "}
									Register
								</Link>
							</p>
							<p>
								<Link
									to="/forgot-password"
									className="text-[#7e1e1e] text-xl font-semibold transition duration-500 ease-in-out hover:text-[#af4646]"
								>
									Forgot Password?
								</Link>
							</p>
						</div>
						<button
							type="submit"
							className="w-full bg-[#10192D] text-[#fff] font-medium uppercase shadow-lg hover:shadow-xl p-2 rounded cursor-pointc text-xl hover:bg-[#192d41] transition duration-200 ease-in-out active:bg-[#10192D]"
							title="Sign In"
						>
							Sign In
						</button>
						<div className="flex my-4 items-center before:border-t before:flex-1 before:border-[#6f859b] after:border-t after:flex-1 after:border-[#6f859b]">
							<p className="text-center font-semibold mx-4 text-[#42505e]">
								OR
							</p>
						</div>
						<OAuth />
					</form>
				</div>
			</div>
		</section>
	);
};

export default Signin;
