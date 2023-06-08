import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
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
import { useNavigate } from "react-router";

const HomeSlider = () => {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
    SwiperCore.use([Autoplay, Navigation, Pagination]);
    const navigate = useNavigate()
    

	useEffect(() => {
		const fetchListings = async () => {
			const listingsRef = collection(db, "listings");
			const q = query(listingsRef, orderBy("timestamp", "asc"), limit(5));
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
		fetchListings();
	}, []);
	if (loading) {
		return <Loader />;
	}
	if (listings.length === 0) {
		return <></>;
	}
    // const afterDiscount = Number(data.cost) - Number(data.discount);
    // const withDiscount = afterDiscount
			
	return (
		listings && (
			<>
				<Swiper
					slidesPerView={1}
					navigation
					pagination={{ type: "bullets" }}
					effect="fade"
					modules={[EffectFade]}
					autoplay={{ delay: 3000 }}
				>
					{listings.map(({ data, id }) => (
						<SwiperSlide
							key={id}
							onClick={() => {
								navigate(`/category/${data.type}/${id}`);
							}}
						>
							<div
								style={{
									background: `url("${data.imgUrls[0]}") center, no-repeat`,
									backgroundSize: "cover",
								}}
								className="relative w-full h-[400px] overflow-hidden cursor-pointc"
							>
								{/* {console.log(data.imgUrls[0])} */}
							</div>
							<p className="text-[#e2e2e2] absolute left-1 top-3 font-medium max-w-[90%] bg-[#10192D] shadow-lg opacity-90 p-2 rounded-br-3xl">
								{data.name}
							</p>
							<p className="text-[#10192D] absolute left-1 bottom-3 font-semibold max-w-[90%] bg-[#007aff] shadow-lg opacity-90 p-2 rounded-tr-3xl">
								Ksh{" "}
								{data.discount
									? data.discount
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									: data.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								{data.type === "rent" && " /month"}
							</p>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		)
	);
};

export default HomeSlider;
