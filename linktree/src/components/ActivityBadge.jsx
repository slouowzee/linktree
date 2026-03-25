import { useRef, useEffect, useState } from 'react';
import { t, translate } from '../utils/i18n';
import externalLinkIcon from '../assets/icons/badges/external-link.svg';
import animesamaIcon from '../assets/icons/badges/animesama.svg';
import spotifyIcon from '../assets/icons/badges/spotify.svg';
import youtubeIcon from '../assets/icons/badges/youtube.svg';
import twitchIcon from '../assets/icons/badges/twitch.svg';
import netflixIcon from '../assets/icons/badges/netflix.svg';
import primevideoIcon from '../assets/icons/badges/primevideo.svg';
import githubIcon from '../assets/icons/badges/github.svg';
import vscodeIcon from '../assets/icons/badges/vscode.svg';
import gameIcon from '../assets/icons/badges/game.svg';

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

const BadgeIcon = ({ icon, isMono }) => {
    if (typeof icon === 'string') {
        return <img src={icon} alt="icon" className={`w-5 h-5 flex-shrink-0 object-contain rounded-md block${isMono ? ' icon-mono' : ''}`} />;
    }
    return icon;
};

const ActivityBadge = ({ activities, loading }) => {
    if (loading || !activities || activities.length === 0) return null;

    const rules = [
        {
            check: a => a.name === 'Spotify',
            render: a => ({
                icon: spotifyIcon,
                text: `${a.details} - ${a.state || t('unknownArtist')}`,
                colorClass: 'border-green-500/30 bg-green-500/10 hover:bg-green-500/20 cursor-pointer',
                linkUrl: (() => `https://open.spotify.com/track/${a.syncId}`)() || null
            })
        },
        {
            check: a => a.name && a.name.toLowerCase().includes('youtube'),
            render: a => {
                let isBrowsing = a.details && a.details.toLowerCase().includes('viewing');
                let linkUrl;
                
                if (!isBrowsing) {
                    linkUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(a.details)}`;
                } else {
                    linkUrl = 'https://youtube.com';
                }

                let displayText = a.details;
                if (/^viewing home page$/i.test(a.details)) {
                    displayText = `${t('viewing')} ${t('homepage')}`;
                } else {
                    displayText = translate(a.details, 'verb');
                }

                return {
                    icon: youtubeIcon,
                    text: displayText,
                    colorClass: 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20 cursor-pointer transition-colors',
                    linkUrl: linkUrl
                };
            }
        },
        {
            check: a => a.name.toLowerCase().includes('twitch') || (a.button && a.button.toLowerCase().includes('stream')),
            render: a => {
                let isBrowsing = a.details && a.details.toLowerCase().includes('browsing');
                let linkUrl;

                if (!isBrowsing) {
                    linkUrl = `https://twitch.tv/${encodeURIComponent(a.name)}`;
                } else {
                    linkUrl = 'https://twitch.tv';
                }

                return {
                    icon: twitchIcon,
                    text: translate(a.details, 'verb'),
                    colorClass: 'border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 cursor-pointer transition-colors',
                    linkUrl: linkUrl
                };
            }
        },
        {
            check: a => (a.name && a.name.toLowerCase().includes('netflix')) || (a.button && a.button.toLowerCase().includes('episode')) || (a.button && a.button.toLowerCase().includes('movie')),
            render: a => {
                const isBrowsing = a.details && a.details.toLowerCase().includes('browsing');
                let displayText;

				if (!a.state) {
					displayText = isBrowsing ? t('browsing') : `${t('watching')} - ${a.details}`;
				} else {
					displayText = `${t('watching')} - ${a.name}`;
				}

                return {
                    icon: netflixIcon,
                    text: displayText,
                    colorClass: 'border-red-600/30 bg-red-600/10'
                };
            }
        },
        {
            //TODO: finir ici quand je pourrais me connecter
            check: a => a.name && a.name.toLowerCase().includes('prime video'),
            render: a => {
                return {
                    icon: primevideoIcon,
                    text: a.details,
                    colorClass: 'border-blue-500/30 bg-blue-500/10',
                    linkUrl: null
                };
            }
        },
        {
            check: a => a.name && a.name.toLowerCase().includes('anime sama'),
            render: a => {
				console.log(a);
                let linkUrl;

				const button = a.button?.toLowerCase() || '';
				const details = a.details?.trim() || '';

				if (button.includes('voir la page') || button.includes('regarder')) {
					const animeTitle =
						details.match(/\bde\s+(.+)$/i)?.[1]?.trim() ||
						details.match(/^(?:regarde|watching)\s+(.+)$/i)?.[1]?.trim();

					const slug = animeTitle
						? animeTitle
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, '')
							.toLowerCase()
							.replace(/[^a-z0-9\s-]/g, '')
							.trim()
							.replace(/\s+/g, '-')
						: null;

					if (slug) {
						linkUrl = `https://anime-sama.to/catalogue/${slug}/`;
					}
				}

                return {
                    icon: animesamaIcon,
                    text: translate(a.details, 'animeSama'),
                    colorClass: 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20 cursor-pointer transition-colors',
                    linkUrl: linkUrl || 'https://anime-sama.to/'
                };
            }
        },
        {
            check: a => a.name && a.name.toLowerCase().includes('github'),
            render: a => {
                let linkUrl;
                let displayTest;

                const repoMatch = a.state?.match(/\b([a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+)\b/);
                const profileMatch = a.details?.match(/^Viewing\s+(\S+)'s\s+profile$/i);

                if (repoMatch) {
                    const repo = repoMatch[1];
                    displayTest = repo;
                    linkUrl = `https://github.com/${repo}`;
                } else if (profileMatch) {
                    linkUrl = `https://github.com/${profileMatch[1]}`;
                }

                return {
                    icon: githubIcon,
                    text: displayTest || translate(a.details, 'github'),
                    colorClass: 'border-gray-500/30 bg-gray-500/10 hover:bg-gray-500/20 cursor-pointer',
                    monoIcon: true,
                    linkUrl: linkUrl
                };
            }
        },
        {
            check: a => a.name === 'Visual Studio Code',
            render: a => {
                const details = translate(a.details, 'verb');
                const state = translate(a.state, 'vscode');
                return {
                    icon: vscodeIcon,
                    text: [details, state].filter(Boolean).join(' • '),
                    colorClass: 'border-blue-600/30 bg-blue-600/10',
                };
            }
        },
        {
            check: a => a.type === 0 || a.type === 1 || a.type === 3,
            render: a => {
                return {
                    icon: gameIcon,
                    text: [a.details, a.state].filter(Boolean).join(' • '),
                    colorClass: 'border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors cursor-pointer',
                    linkUrl: `https://www.google.com/search?q=${encodeURIComponent(a.name)}`
                };
            }
        }
    ];

    const matches = [];
    const seenNames = new Set();
    for (const activity of activities) {
        for (const rule of rules) {
            if (rule.check(activity)) {
                const baseName = activity.name.toLowerCase();
                if (!seenNames.has(baseName)) {
                    seenNames.add(baseName);
                    matches.push(rule.render(activity));
                }
                break;
            }
        }
    }

    if (matches.length === 0) return null;

    return (
        <div className="flex flex-col gap-2 mt-3 w-full max-w-[260px] mx-auto relative">
            {matches.map((match, index) => {
                const { icon, text, colorClass, linkUrl, monoIcon } = match;
                const content = (
                    <div className={`badge-container border shadow-sm rounded-full py-2 px-4 flex items-center gap-3 transition-colors w-full h-[42px] ${colorClass}`}>
                        <BadgeIcon icon={icon} isMono={monoIcon} />
                        <div className="flex-1 min-w-0 flex items-center overflow-hidden">
                            <ScrollingText text={text} />
                        </div>
                        {linkUrl ? (
                            <img src={externalLinkIcon} alt="external link" className="w-4 h-4 opacity-50 flex-shrink-0 ml-1 icon-mono" />
                        ) : (
                            <div className="w-4 ml-1"></div>
                        )}
                    </div>
                );
                return linkUrl ? (
                    <a key={index} href={linkUrl} target="_blank" rel="noopener noreferrer" className="block outline-none w-full" title={t('openLink')}>{content}</a>
                ) : <div key={index} className="w-full">{content}</div>;
            })}
        </div>
    );
};

export default ActivityBadge;