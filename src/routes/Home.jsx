import { useEffect, useState } from "react";
import HomeSlider from "../components/HomeSlider";
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../firebase";
// import { toast } from "react-toastify";
import { CiLocationArrow1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";

const Home = () => {
	// Fetching data for offers
	const [offerListings, setOfferListings] = useState(null);
	const [darkMode, setdarkMode] = useState(false);

	useEffect(() => {
		const fetchListings = async () => {
			try {
				// get reference
				const listingsRef = collection(db, "listings");
				// create a query
				const q = query(
					listingsRef,
					where("offer", "==", true),
					orderBy("timestamp", "desc"),
					limit(4),
				);
				// execute a query
				const querySnap = await getDocs(q);
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setOfferListings(listings);
				// console.log(listings);
			} catch (error) {
				console.log(error);
				// toast.error("Could not load properties 'On Offer'")
			}
		};
		fetchListings();
	}, []);

	// Places for rent
	const [rentListings, setRentListings] = useState(null);
	useEffect(() => {
		const fetchListings = async () => {
			try {
				// get reference
				const listingsRef = collection(db, "listings");
				// create the query
				const q = query(
					listingsRef,
					where("type", "==", "rent"),
					orderBy("timestamp", "desc"),
					limit(4),
				);
				// execute the query
				const querySnap = await getDocs(q);
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setRentListings(listings);
			} catch (error) {
				console.log(error);
			}
		};
		fetchListings();
	}, []);
	// Places for sales
	const [saleListings, setSaleListings] = useState(null);
	useEffect(() => {
		async function fetchListings() {
			try {
				// get reference
				const listingsRef = collection(db, "listings");
				// create the query
				const q = query(
					listingsRef,
					where("type", "==", "sale"),
					orderBy("timestamp", "desc"),
					limit(4),
				);
				// execute the query
				const querySnap = await getDocs(q);
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setSaleListings(listings);
			} catch (error) {
				console.log(error);
			}
		}
		fetchListings();
	}, []);

	return (
		<div>
			<HomeSlider />
			<div className="max-w-6xl mx-auto pt-4 mt-6 mb-32">
				{offerListings && offerListings.length > 0 && (
					<div className="mb-6">
						<div className="mx-4 mb-6 flex justify-between items-center">
							<h2 className="px-3 text-2xl font-semibold text-[#10192D]">
								On Offer 🎉
							</h2>
							<Link
								to="/offers"
								className="flex items-center gap-1 text-[#004792] hover:text-[#001f41] transition duration-150 ease-in-out"
							>
								<CiLocationArrow1 className="text-2xl" />
								<p className=" text-lg">More Offers</p>
							</Link>
						</div>

						<ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
							{offerListings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
								/>
							))}
						</ul>
					</div>
				)}

				{rentListings && rentListings.length > 0 && (
					<div className="mb-6">
						<div className="mx-4 mb-6 flex justify-between items-center">
							<h2 className="px-3 text-2xl font-semibold text-[#10192D]">
								Rentals
							</h2>
							<Link
								to="/category/rent"
								className="flex items-center gap-1 text-[#004792] hover:text-[#001f41] transition duration-150 ease-in-out"
							>
								<CiLocationArrow1 className="text-2xl" />
								<p className=" text-lg">More Rentals</p>
							</Link>
						</div>

						<ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
							{rentListings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
								/>
							))}
						</ul>
					</div>
				)}

				{saleListings && saleListings.length > 0 && (
					<div className="">
						<div className="mx-4 mb-6 flex justify-between items-center">
							<h2 className="px-3 text-2xl font-semibold text-[#10192D]">
								On Sale
							</h2>
							<Link
								to="/category/sale"
								className="flex items-center gap-1 text-[#004792] hover:text-[#001f41] transition duration-150 ease-in-out"
							>
								<CiLocationArrow1 className="text-2xl" />
								<p className=" text-lg">More On Sale</p>
							</Link>
						</div>

						<ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
							{saleListings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
								/>
							))}
						</ul>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Home;
