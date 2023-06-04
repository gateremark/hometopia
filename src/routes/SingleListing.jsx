import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import Loader from "../components/Loader";
import { MdLocationPin, MdOutlineChair } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
	EffectFade,
	Autoplay,
	Navigation,
	Pagination,
} from "swiper";
import "swiper/css/bundle";
import { BsShareFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { FaBath, FaBed, FaParking } from "react-icons/fa";

const SingleListing = () => {
	const params = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	
									
	SwiperCore.use([Autoplay, Navigation, Pagination]);
	useEffect(() => {
		const fetchListing = async () => {
			const docRef = doc(db, "listings", "FI5z3uk9eRdU2CBuFvci");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setListing(docSnap.data());
				setLoading(false);
			}
		};
		fetchListing();
	}, [params.listingID]);
	if (loading) {
		return <Loader />;
	}
	const afterDiscount = Number(listing.cost) - Number(listing.discount);
	const afterDiscountKsh = afterDiscount
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return (
		<main>
			<Swiper
				slidesPerView={1}
				navigation
				pagination={{ type: "bullets" }}
				effect="fade"
				modules={[EffectFade]}
				autoplay={{ delay: 3000 }}
			>
				{listing.imgUrls.map((url, i) => (
					<SwiperSlide key={i}>
						<div
							className="relative w-full overflow-hidden h-[400px]"
							style={{
								background: `url(${listing.imgUrls[i]}) center no-repeat`,
								backgroundSize: "cover",
							}}
						></div>
					</SwiperSlide>
				))}
			</Swiper>
			<div
				className=" fixed text-[#007aff] top-[10%] right-[3%] z-10 cursor-pointc bg-[#e2e2e2] w-10 h-10 flex justify-center items-center rounded-full hover:bg-[#007aff] hover:text-[#e2e2e2] transition duration-500 ease-in-out"
				title="Copy Link to Property"
				onClick={() => {
					navigator.clipboard.writeText(window.location.href);
					toast.success("Link to Property Copied 🎉");
				}}
			>
				<BsShareFill className="text-lg" />
			</div>
			<div className="bg-[#e2e2e2] m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg gap-5">
				<div className="w-full h-[200px] lg-[400px]">
					<p className="text-2xl font-bold mb-3 text-[#002470]">
						{listing.name} - Ksh{" "}
						{listing.offer
							? listing.discount
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							: listing.cost
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
						{listing.type === "rent" ? "/month" : ""}
					</p>
					<div className="flex items-center gap-1">
						<MdLocationPin className="h-4 w-4 text-[#10192D]" />
						<p className="font-semibold text-base mb-[2px] text-[#202e3d]">
							{listing.address}
						</p>
					</div>
					<div className="flex justify-start items-center gap-2 w-[75%] my-3">
						<p className="bg-[#421414] text-[#fff] w-full max-w-[200px] rounded-md p-1 text-center font-semibold shadow-md">
							{listing.type === "rent" ? "Rent" : "Sale"}
						</p>
						{listing.offer && (
							<p className="w-full max-w-[200px] bg-[#007aff] text-[#10192D] rounded-md p-1 text-center font-semibold shadow-md">
								Ksh {afterDiscountKsh}{" "}
								<span className=" font-bold">discount</span>
							</p>
						)}
					</div>
					<p className="mb-3">
						{" "}
						<span className=" font-semibold text-lg">Description - </span> "
						{listing.description}"
					</p>
					<div className="flex items-center mt-2 gap-10">
						<div className="flex items-center gap-1">
							<FaBed />
							<p className="font-bold text-sm">
								{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
							</p>
						</div>
						<div className="flex items-center gap-1">
							<FaBath />
							<p className="font-bold text-sm">
								{listing.restrooms > 1
									? `${listing.restrooms} Rests`
									: "1 Rest"}
							</p>
						</div>
						<div className="flex items-center gap-1">
							<FaParking />
							<p className="font-bold text-sm">
								{listing.parking ? "Available Parking" : "No Parking"}
							</p>
						</div>
						<div className="flex items-center gap-1">
							<MdOutlineChair />
							<p className="font-bold text-sm">
								{listing.furnish ? "Furnished" : "Not Furnished"}
							</p>
						</div>
					</div>
				</div>
				<div className=" bg-[#007aff] w-full h-[200px] lg-[400px] z-10 overflow-x-hidden"></div>
			</div>
		</main>
	);
};

export default SingleListing;
