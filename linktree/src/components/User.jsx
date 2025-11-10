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
		<div className="flex items-center justify-center gap-4 mb-8">
			<div className="relative">
				<img
					src={userpic}
					alt={`${username} profile`}
					className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
				/>
				<div
					className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-white ${statusColors[status]} shadow-md`}
				></div>
			</div>
			<div>
				<h2 className="text-2xl font-bold text-gray-800 mb-1">@{username}</h2>
				<p className="text-sm text-gray-500 capitalize flex items-center gap-1">
					{/*<span className={`inline-block w-2 h-2 rounded-full ${statusColors[status]}`}></span>*/}
					{status}
				</p>
			</div>
		</div>
	);
};

export default User;
