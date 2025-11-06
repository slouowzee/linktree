const Links = ({ links }) => {
	return (
		<div className='flex flex-col item-center space-y-4 p-4'>
			{links && links.length > 0 ? (
				links.map((link,index) => (
					<a
						key={index}
						href={link.url}
						target='_blank'
						rel='noopener noreferrer'
						className="w-full max-w-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-center"
					>
						{link.title}
					</a>
				))
			) : (
				<p className="text-gray-500">Aucun lien disponible.</p>
			)}
		</div>
	);
}

export default Links;