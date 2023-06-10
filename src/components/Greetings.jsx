const Greetings = () => {
	let myDate = new Date();
	let hours = myDate.getHours();
	let greet;

	if (hours < 12) greet = "Morning";
	else if (hours >= 12 && hours <= 17) greet = "Afternoon";
	else if (hours >= 17 && hours <= 24) greet = "Evening";
	// console.log(greet);

	return (
		<p className=" z-30 font-medium mt-2 text-[#ffffff] hover:text-[#024d66] transition duration-500 ease-in-out">
			<span>Good {greet},</span>
		</p>
	);
};

export default Greetings;
