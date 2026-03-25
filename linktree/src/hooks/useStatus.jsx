import { useState, useEffect } from 'react';

const useStatus = () => {
	const [statusData, setStatusData] = useState({ status: 'offline', activities: [], avatarURL: null });
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// En utilisant un chemin relatif, ça fonctionnera aussi bien en dev (via proxy Vite) 
		// qu'en prod (via proxy Nginx) sans avoir besoin de variables d'environnement.
		const endpoint = '/api/discord-status/stream';
		
		const eventSource = new EventSource(endpoint);

		eventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				setStatusData({
					status: data.status,
					activities: data.activities,
					avatarURL: data.avatarURL
				});
				setLoading(false);
			} catch (err) {
				console.error('Error parsing SSE data', err);
			}
		};

		eventSource.onerror = (err) => {
			console.error('SSE connection error', err);
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, []);

	return { ...statusData, loading };
};

export default useStatus;
