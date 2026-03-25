import { useRef, useEffect, useState } from 'react';

const ScrollingText = ({ text }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current && textRef.current) {
                setIsOverflowing(textRef.current.scrollWidth > containerRef.current.clientWidth);
            }
        };
        
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [text]);

    return (
        <div ref={containerRef} className="overflow-hidden w-full relative mask-edges">
            <div className={`flex items-center ${isOverflowing ? 'animate-marquee w-max' : 'justify-center w-full'}`}>
                <span 
                    ref={textRef} 
                    className="inline-block text-sm font-medium text-[var(--text-color)] flex-shrink-0 px-4"
                >
                    {text}
                </span>
                {isOverflowing && (
                    <span 
                        className="inline-block text-sm font-medium text-[var(--text-color)] flex-shrink-0 px-4"
                        aria-hidden="true"
                    >
                        {text}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ScrollingText;
