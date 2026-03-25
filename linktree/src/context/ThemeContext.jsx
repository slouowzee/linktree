import { createContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext(null);

const VALID_MODES = ['light', 'system', 'dark'];

function getInitialMode() {
	const s = localStorage.getItem('theme');
	return VALID_MODES.includes(s) ? s : 'system';
}

function resolveTheme(mode) {
	if (mode === 'light') return 'light';
	if (mode === 'dark') return 'dark';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(resolved) {
	document.documentElement.classList.toggle('dark', resolved === 'dark');
}

export function ThemeProvider({ children }) {
	const [mode, setModeState] = useState(getInitialMode);
	const [theme, setTheme] = useState(() => resolveTheme(getInitialMode()));

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	useEffect(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = (e) => {
			if (mode === 'system') setTheme(e.matches ? 'dark' : 'light');
		};
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	}, [mode]);

	const setMode = (newMode, x, y) => {
		const newTheme = resolveTheme(newMode);
		const themeChanges = newTheme !== theme;

		const save = () => {
			localStorage.setItem('theme', newMode);
			setModeState(newMode);
			setTheme(newTheme);
		};

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!themeChanges || !document.startViewTransition || prefersReducedMotion) {
			save();
			return;
		}

		document.documentElement.style.setProperty('--vt-x', `${x}px`);
		document.documentElement.style.setProperty('--vt-y', `${y}px`);
		document.documentElement.dataset.vtDir = newTheme === 'dark' ? 'to-dark' : 'to-light';

		const vt = document.startViewTransition(() => {
			flushSync(save);
		});
		vt.finished.then(() => {
			delete document.documentElement.dataset.vtDir;
		});
	};

	return (
		<ThemeContext.Provider value={{ mode, theme, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeContext;
