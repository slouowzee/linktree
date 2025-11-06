import Status from '../hooks/Status';

const User = ({ username, userpic }) => {
	const status = Status();
	
	const statusColors = {
		online: 'bg-green-500',
		idle: 'bg-yellow-500',
		dnd: 'bg-red-500',
		offline: 'bg-gray-500',
	};

	return (
		<div className="flex items-center space-x-4 p-4">
			<div className="relative">
				<img
					src={userpic}
					alt={`${username} profile`}
					className="w-16 h-16 rounded-full border-2 border-gray-300"
				/>
				<div
					className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${statusColors[status]}`}
				></div>
			</div>
			<div>
				<h2 className="text-xl font-bold">{username}</h2>
				<p className="text-sm text-gray-600 capitalize">{status}</p>
			</div>
		</div>
	);
};

export default User;