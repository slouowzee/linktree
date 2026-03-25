import useStatus from '../hooks/useStatus';
import ActivityBadge from './ActivityBadge';

const User = ({ username }) => {
	const { status, activities, loading, avatarURL } = useStatus();
	
	const statusColors = {
		online: 'bg-green-500',
		idle: 'bg-yellow-500',
		dnd: 'bg-red-500',
		offline: 'bg-gray-400',
		loading: 'bg-gray-300 animate-pulse',
	};

	const currentStatus = loading ? 'loading' : status;

	return (
		<div className="flex flex-col items-center mb-6 w-full">
			<div className="relative mb-4">
				<img
					src={avatarURL}
					alt={`${username} profile`}
					className="w-24 h-24 rounded-full border-4 shadow-md object-cover" style={{ borderColor: 'var(--status-ring)' }}
				/>
				<div
					className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 ${statusColors[currentStatus] || statusColors.offline} shadow-sm`} style={{ borderColor: 'var(--status-ring)' }}
				></div>
			</div>
			<div className="text-center w-full">
				<h2 className="text-2xl font-bold text-[var(--text-color)]">@{username}</h2>
				<ActivityBadge activities={activities} loading={loading} />
			</div>
		</div>
	);
};

export default User;
