import { useState, useEffect } from 'react';

const Status = () => {
	const [status, setStatus] = useState('offline');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStatus = async () => {
			try {
				const response = await fetch('http://localhost:3001/api/discord-status');
				
				if (!response.ok) {
					throw new Error(`API error: ${response.status}`);
				}
				
				const data = await response.json();
				setStatus(data.status || 'offline');
			} catch {
				setStatus('offline');
			} finally {
				setLoading(false);
			}
		};

		fetchStatus();
		const interval = setInterval(fetchStatus, 10000);
		
		return () => clearInterval(interval);
	}, []);

	if (loading) return 'loading';
	return status;
};

export default Status;