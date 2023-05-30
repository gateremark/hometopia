import {FcGoogle} from "react-icons/fc"

const OAuth = () => {
  return (
		<div>
			<button
				type="submit"
				className="flex items-center justify-center w-full bg-[#2d1010] text-[#fff] font-medium uppercase shadow-lg hover:shadow-xl sha p-1 rounded cursor-pointc text-3xl hover:bg-[#411919] transition duration-200 ease-in-out active:bg-[#2d1010]"
                title="Continue With Google"
			>
			   <FcGoogle />
			</button>
		</div>
	);
}

export default OAuth
