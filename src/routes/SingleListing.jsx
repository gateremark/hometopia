import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import Loader from "../components/Loader";
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
	return (
		<main>
			<Swiper
				slidesPerView={1}
				navigation
				pagination={{ type: "progressbar" }}
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
			<div className=" fixed text-[#007aff] top-[10%] right-[3%] z-10 cursor-pointc bg-[#e2e2e2] w-10 h-10 flex justify-center items-center rounded-full" onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                toast.success("Link to Property Copied 🎉");
            } }>
				<BsShareFill className="text-lg" />
			</div>
		</main>
	);
};

export default SingleListing;
