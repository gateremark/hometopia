import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
	const navigate = useNavigate();
	const onGoogleClick = async () => {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// Check whether user already exists

			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				await setDoc(docRef, {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			navigate("/");

			// Show a success toast notification
			toast.success(`Welcome ${user.displayName}! 🎉`);
		} catch (error) {
			toast.error("Could not authorize with Google 😢");
		}
	};
	return (
		<div>
			<button
				onClick={onGoogleClick}
				type="button"
				className="flex items-center justify-center w-full bg-[#2d1010] text-[#fff] font-medium uppercase shadow-lg hover:shadow-xl sha p-1 rounded cursor-pointc text-3xl hover:bg-[#411919] transition duration-200 ease-in-out active:bg-[#2d1010]"
				title="Continue With Google"
			>
				<FcGoogle />
			</button>
		</div>
	);
};

export default OAuth;
