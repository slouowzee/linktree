import { useState } from 'react';
import { t } from '../utils/i18n';
import shareIcon from '../assets/icons/shares/share.svg';
import checkIcon from '../assets/icons/shares/check.svg';

const ShareButton = () => {
	const [copied, setCopied] = useState(false);

	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	return (
		<div className="absolute top-4 right-4">
			<button
				onClick={handleShare}
				className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 hover:scale-[1.03] group"
				style={{
					background: 'var(--card)',
					borderColor: 'var(--border)',
					boxShadow: 'var(--shadow-sm)',
					color: 'var(--muted-foreground)',
				}}
				title={t('shareProfile')}
			>
				{copied ? (
					<>
						<img src={checkIcon} alt="copied" className="h-5 w-5" style={{ filter: 'invert(58%) sepia(85%) saturate(300%) hue-rotate(85deg) brightness(95%) contrast(100%)' }} />
						<span className="text-sm font-medium text-green-500">{t('copied')}</span>
					</>
				) : (
					<>
						<img src={shareIcon} alt="share" className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity icon-mono" />
						<span className="text-sm font-medium hidden sm:block transition-colors" style={{ color: 'var(--text-muted)' }}>{t('share')}</span>
					</>
				)}
			</button>
		</div>
	);
};

export default ShareButton;
