const Links_icon = ({ socials }) => {
	if (!socials || socials.length === 0) return null;

	return (
		<div className="flex flex-wrap items-center justify-center gap-6 mt-8">
			{socials.map((social, index) => (
				<a
					key={index}
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					className="group w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300 transform hover:scale-125"
					title={social.platform}
				>
					<img
						src={social.icon}
						alt={`${social.platform} icon`}
						className={`w-full h-full object-contain transition-all duration-300 dark:invert dark:brightness-110 ${social.color || ''}`}
					/>
				</a>
			))}
		</div>
	);
};

export default Links_icon;
