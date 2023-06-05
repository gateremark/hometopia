import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

const Contact = ({ userRef, listing }) => {
	const [landlord, setLandlord] = useState(null);
	const [message, setMessage] = useState("");
	useEffect(() => {
		const getLandlord = async () => {
			const docRef = doc(db, "users", userRef);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setLandlord(docSnap.data());
			} else {
				toast.error("Could not get landlord data");
			}
		};
		getLandlord();
	}, [userRef]);
	const onChange = (e) => {
		setMessage(e.target.value);
	};
	return (
		<>
			{landlord !== null && (
				<div className="flex flex-col w-full">
					<p className=" font-medium ">
						Contact{" "}
						<span className="font-bold text-lg text-[#002470] capitalize">
							{landlord.name}
						</span>{" "}
						for the{" "}
						<span className=" font-bold text-lg text-[#002470] capitalize">
							{listing.name}
						</span>{" "}
						property.
					</p>
					<div>
						<textarea
							name="message"
							id="message"
							rows="2"
							value={message}
							onChange={onChange}
							placeholder="Enter Message"
							required
							className=" w-full mt-3 mb-1 text-lg placeholder:text-[#808080] border-[#808080] hover:shadow-xl hover:bg-[#fff] focus:shadow-xl active:shadow-xl rounded transition ease-in-out"
						></textarea>
					</div>
					<a
						href={`mailto:${landlord.email}?.Subject=${listing.name}&body=${message}`}
					>
						<button
							type="button"
							className="w-full bg-[#10192D] text-[#fff] font-medium uppercase shadow-md hover:shadow-lg px-7 py-3 rounded cursor-pointc text-base hover:bg-[#192d41] transition duration-150 ease-in-out focus:bg-[#10192D] focus:shadow-lg text-center"
						>
							Send Message
						</button>
					</a>
				</div>
			)}
		</>
	);
};

export default Contact;
