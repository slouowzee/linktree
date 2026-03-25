import './App.css';
import User from './components/User';
import Links_icon from './components/Links_icon';
import ShareButton from './components/ShareButton';
import ThemeToggle from './components/ThemeToggle';

import xIcon from './assets/icons/links/X.svg';
import discordIcon from './assets/icons/links/discord.svg';
import instagramIcon from './assets/icons/links/instagram.svg';
import youtubeIcon from './assets/icons/links/youtube.svg';
import spotifyIcon from './assets/icons/links/spotify.svg';
import githubIcon from './assets/icons/links/github.svg';

function App() {
	const username = 'slouowze';
	
	const socials = [
		{ platform: 'GitHub', url: 'https://github.com/slouowzee', icon: githubIcon, color: 'group-hover:drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] dark:group-hover:drop-shadow-[0_6px_16px_rgba(255,255,255,0.6)]' },
		{ platform: 'Discord', url: 'https://discord.gg/DBMEGwHXDq', icon: discordIcon, color: 'group-hover:drop-shadow-[0_4px_10px_rgba(88,101,242,0.7)] dark:group-hover:drop-shadow-[0_6px_16px_rgba(88,101,242,1)]' },
		{ platform: 'X', url: 'https://twitter.com/slouowze', icon: xIcon, color: 'group-hover:drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] dark:group-hover:drop-shadow-[0_6px_16px_rgba(255,255,255,0.6)]' },
		{ platform: 'Instagram', url: 'https://instagram.com/slouowze', icon: instagramIcon, color: 'group-hover:drop-shadow-[0_4px_10px_rgba(225,48,108,0.7)] dark:group-hover:drop-shadow-[0_6px_16px_rgba(225,48,108,1)]' },
		{ platform: 'YouTube', url: 'https://youtube.com/@bitr-off', icon: youtubeIcon, color: 'group-hover:drop-shadow-[0_4px_10px_rgba(255,0,0,0.7)] dark:group-hover:drop-shadow-[0_6px_16px_rgba(255,0,0,1)]' },
		{ platform: 'Spotify', url: 'https://open.spotify.com/user/31v2yjiat6cdn4sskxacer2aiz6m?si=1dde8192df45449e', icon: spotifyIcon, color: 'group-hover:drop-shadow-[0_4px_10px_rgba(29,185,84,0.7)] dark:group-hover:drop-shadow-[0_6px_16px_rgba(29,185,84,1)]' }
	];

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
            <ThemeToggle />
			<ShareButton />
			<div className="w-full max-w-md relative z-10 mt-12 sm:mt-0">
				<User username={username} />
				<Links_icon socials={socials} />
			</div>
		</div>
	);
}

export default App;
