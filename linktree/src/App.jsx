import './App.css';
import User from './components/User';
import Links_card from './components/Links_card';
import userpicImg from './assets/images/pfp.svg';

function App() {
	const username = 'slouowze';
	const userpic = userpicImg;
	const links = [
		
	];

	return (
		<div className="App min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-md">
				<User username={username} userpic={userpic} />
				<Links_card links={links} />
			</div>
		</div>
	);
}

export default App;
