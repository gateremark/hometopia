import Loading from "../assets/logo/loaderfast.svg";

const Loader = () => {
	return (
		<div className="bg-[#000] bg-opacity-80 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
			<div>
				<img src={Loading} alt="Loading..." className="h-32" />
			</div>
		</div>
	);
};

export default Loader;
