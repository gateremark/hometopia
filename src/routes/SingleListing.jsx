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
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const SingleListing = () => {
	const auth = getAuth();
	const params = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [contactLandlord, setContactLandlord] = useState(false);

	SwiperCore.use([Autoplay, Navigation, Pagination]);
	useEffect(() => {
		const fetchListing = async () => {
			const docRef = doc(db, "listings", params.listingId);
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
								background: `url("${listing.imgUrls[i]}") center no-repeat`,
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
			<div className="bg-[#e2e2e2] mx-4 mt-4 mb-32 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg gap-5">
				<div className="w-full relative">
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
					<div className="flex justify-start items-center gap-5 w-[75%] my-3">
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
					<p>
						{" "}
						<span className=" font-semibold text-lg text-[#162433]">
							Description:{" "}
						</span>{" "}
						{listing.description}
					</p>
					<div className="flex items-center my-3 gap-10">
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
					{listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
						<div className="static w-full bottom-1 md:absolute">
							<button
								onClick={() => setContactLandlord(true)}
								className=" w-full bg-[#10192D] text-[#fff] font-medium uppercase shadow-md hover:shadow-lg px-7 py-3 rounded cursor-pointc text-base hover:bg-[#192d41] transition duration-150 ease-in-out focus:bg-[#10192D] focus:shadow-lg text-center"
							>
								Contact Landlord
							</button>
						</div>
					)}
					{contactLandlord && (
						<Contact userRef={listing.userRef} listing={listing} />
					)}
				</div>
				<div className=" w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2 rounded">
					<MapContainer
						center={[listing.geolocation.lat, listing.geolocation.lng]}
						zoom={13}
						scrollWheelZoom={false}
						style={{ height: "100%", width: "100%" }}
					>
						{/* <MapContainer
						center={[-0.39728671480506683, 36.96372787556248]}
						zoom={13}
						scrollWheelZoom={false}
						style={{ height: "100%", width: "100%" }}
					> */}
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker
							position={[listing.geolocation.lat, listing.geolocation.lng]}
						>
							<Popup>{listing.address}</Popup>
						</Marker>

						{/* <Marker position={[-0.39728671480506683, 36.96372787556248]}>
							<Popup>{listing.address}</Popup>
						</Marker> */}
					</MapContainer>
				</div>
			</div>
			<Footer />
		</main>
	);
};

export default SingleListing;
