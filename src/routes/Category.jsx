import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import Loader from "../components/Loader";
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";
import { useParams } from "react-router";

const Category = () => {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [lastFetchedListing, setLastFetchedListing] = useState(null);
    const params = useParams()

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const listingRef = collection(db, "listings");
				const q = query(
					listingRef,
					where("type", "==", params.categoryName),
					orderBy("timestamp", "desc"),
					limit(8),
				);
				const querySnap = await getDocs(q);
				const lastVisible = querySnap.docs[querySnap.docs.length - 1];
				setLastFetchedListing(lastVisible);
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setListings(listings);
				setLoading(false);
			} catch (error) {
				toast.error("Could not fetch Listings");
			}
		};

		fetchListings();
	}, [params.categoryName]);

	const onFetchMoreListings = async () => {
		try {
			const listingRef = collection(db, "listings");
			const q = query(
				listingRef,
				where("type", "==", params.categoryName),
				orderBy("timestamp", "desc"),
				startAfter(lastFetchedListing),
				limit(4),
			);
			const querySnap = await getDocs(q);
			const lastVisible = querySnap.docs[querySnap.docs.length - 1];
			setLastFetchedListing(lastVisible);
			const listings = [];
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings((prevState) => [...prevState, ...listings]);
			setLoading(false);
		} catch (error) {
			toast.error("Could not fetch Listings");
		}
	};
	return (
		<div>
			<div className="max-w-6xl mx-auto pt-4 mb-32">
				<h1 className="px-3 text-3xl mb-6 font-semibold text-[#10192D] text-center">
					{params.categoryName === "rent" ? "Rentals" : "On Sale"}
				</h1>
				{loading ? (
					<Loader />
				) : listings && listings.length > 0 ? (
					<>
						<main>
							<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
								{listings.map((listing) => (
									<ListingItem
										key={listing.id}
										id={listing.id}
										listing={listing.data}
									/>
								))}
							</ul>
						</main>
						{lastFetchedListing && (
							<div className="flex text-center justify-center">
								<button
									onClick={onFetchMoreListings}
									className="bg-[#6F90B1] py-2 px-1 rounded text-[#e2e2e2] hover:bg-[#53708E] shadow-lg hover:shadow-xl cursor-pointc transition duration-150 ease-in-out active:bg-[#6F90B1]"
								>
									Load More
								</button>
							</div>
						)}
					</>
				) : (
					<p>
						There are no Current 
						{params.categoryName === "rent" ? "Rentals" : "On Sale"}
					</p>
				)}
			</div>
			{!loading && <Footer />}
		</div>
	);
};

export default Category;
