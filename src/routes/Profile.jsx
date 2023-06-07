import { useEffect, useState } from "react";
import Profilepic from "../assets/logo/profile.png";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
	collection,
	doc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";

const Profile = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [changeName, setChangeName] = useState(false);
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
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
			toast.success("Name Updated!");
		} catch (error) {
			toast.error("Could not update the Profile Details 😢");
		}
	};
	useEffect(() => {
		const fetchUserListings = async () => {
			const listingRef = collection(db, "listings");
			const q = query(
				listingRef,
				where("userRef", "==", auth.currentUser.uid),
				orderBy("timestamp", "desc"),
			);
			const querySnap = await getDocs(q);
			let listings = [];
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings(listings);
			setLoading(false);
		};
		fetchUserListings();
	}, [auth.currentUser.uid]);
	const onDelete = async (listingID) => {
		if (window.confirm("Are you sure you want to delete?")) {
			await deleteDoc(doc(db, "listings", listingID));
			const updatedListings = listings.filter(
				(listing) => listing.id !== listingID,
			);
			setListings(updatedListings);
			toast.success("Successfully Deleted Listing");
		}
	};

	const onEdit = (listingID) => {
		navigate(`/edit-listing/${listingID}`);
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
							className={`w-full py-2 text-3xl text-[#3c546e] text-center border-[#3c546e] transition ease-in-out rounded cursor-pointa ${
								changeName
									? "bg-[#16b0df] focus:bg-[#3c546e] focus:text-[#ffffff]"
									: " bg-transparent"
							}`}
						/>

						<input
							type="email"
							id="email"
							value={email}
							disabled
							className="w-full bg-transparent py-2 text-3xl text-[#3c546e] text-center border-[#3c546e] transition ease-in-out rounded cursor-pointa"
						/>

						<div className="w-full flex flex-col sm:flex-row justify-between items-center whitespace-nowrap text-sm sm:text-lg mt-6 mb-6">
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
					<button
						type="submit"
						className="w-full bg-[#10192D] text-[#fff] font-medium uppercase shadow-lg hover:shadow-xl p-4 rounded cursor-pointc text-2xl hover:bg-[#192d41] transition duration-200 ease-in-out active:bg-[#10192D]"
						title="Sell Or Rent your Home"
					>
						<Link
							to="/add-listing"
							className="flex justify-center items-center gap-4"
						>
							<FaHome className="text-4xl" /> Sell Or Rent
						</Link>
					</button>
				</div>
			</section>
			<div className="mt-6 px-3 max-w-6xl mx-auto mb-32">
				{!loading && listings.length > 0 && (
					<>
						<h1 className="text-2xl text-center font-semibold text-[#202e3d]">
							My Listings
						</h1>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-4">
							{listings.map((listing) => (
								<ListingItem
									key={listing.id}
									id={listing.id}
									listing={listing.data}
									onDelete={() => onDelete(listing.id)}
									onEdit={() => onEdit(listing.id)}
								/>
							))}
						</ul>
					</>
				)}
			</div>
			<Footer />
		</>
	);
};

export default Profile;
