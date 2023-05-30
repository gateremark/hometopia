import Logo from "./assets/logo/logo-nobg.png";
import Home from "./assets/homes/home1.png";

function App() {
	return (
		<>
			<div>
				<a href="https://gateremark.hometopia" target="_blank">
					<img src={Logo} className="logo" alt="Main logo" />
				</a>
			</div>
			<h1 className=" text-center text-gray-700 text-xl">
				gateremark
			</h1>
			<p>Hello Everyone</p>
			<img src={Home} className="logo" alt="Home" />
		</>
	);
}

export default App;
