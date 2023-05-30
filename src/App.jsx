import Logo from './assets/logo/logo-nobg.png'
import Home from "./assets/homes/home1.png";

function App() {

  return (
		<>
			<div>
				<a href="https://gateremark.hometopia" target="_blank">
					<img src={Logo} className="logo" alt="Main logo" />
				</a>
			</div>
			<img src={Home} className="logo" alt="Home" />
      <h1 className=' text-center'>Hello Here!</h1>
		</>
	);
}

export default App
