import './App.css';
import User from './components/User';
import Links from './components/links';

function App() {
  const username = 'VotrePseudo';
  const userpic = 'https://via.placeholder.com/150';
  const links = [
    { url: 'https://github.com', title: 'GitHub' },
    { url: 'https://linkedin.com', title: 'LinkedIn' },
  ];

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <User username={username} userpic={userpic} />
      <Links links={links} />
    </div>
  );
}

export default App;