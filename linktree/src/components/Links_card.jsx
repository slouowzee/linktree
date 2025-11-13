const Links_card = ({ links }) => {
	return (
		<div className='flex flex-col items-center space-y-4 w-full max-w-md px-4'>
			{links.map((link,index) => (
				<a
					key={index}
					href={link.url}
					target='_blank'
					rel='noopener noreferrer'
					className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 text-center shadow-sm hover:shadow-md transform hover:-translate-y-1"
				>
					{link.title}
				</a>
			))}
		</div>
	);
}

export default Links_card;
