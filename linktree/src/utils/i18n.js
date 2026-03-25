const getSystemLocale = () => {
    const lang = navigator.language.split('-')[0];
    return lang === 'fr' ? 'fr' : 'en';
};

const getLocale = () => {
    return localStorage.getItem('locale') || getSystemLocale();
};

export const setLocale = (locale) => {
    localStorage.setItem('locale', locale);
    window.location.reload();
};

const translations = {
    fr: {
        unknownArtist: "Artiste inconnu",
        watching: "Regarde",
        browsing: "Cherche un truc à mater",
        viewing: "Regarde",
        editing: "Modifie",
        project: "Projet",
        homepage: "la page d'accueil",
        anime: {
            home: "Visionne la page d'accueil",
            schedule: "Regarde le planning des sorties",
            catalog: "Parcourt le catalogue",
            profile: "Visionne son profil",
            watching: "Regarde",
            watchingPage: "Regarde la page :",
        },
        openLink: "Ouvrir le lien",
        share: "Partager",
        copied: "Copié !",
        shareProfile: "Partager mon profil"
    },
    en: {
        unknownArtist: "Unknown artist",
        watching: "Watching",
        browsing: "Browsing something to watch",
        viewing: "Viewing",
        editing: "Editing",
        project: "Workspace",
        homepage: "home page",
        anime: {
            home: "Viewing home page",
            schedule: "Watching the release schedule",
            catalog: "Browsing the catalog",
            profile: "Viewing their profile",
            watching: "Watching",
            watchingPage: "Watching the page:",
        },
        openLink: "Open link",
        share: "Share",
        copied: "Copied!",
        shareProfile: "Share my profile"
    }
};

export const t = (key) => {
    const locale = getLocale();
    return translations[locale][key] || key;
};

const rules = {
    github: [
        { type: 'regex', 
			regex: /^Viewing\s+(\S+)'s\s+profile$/i, 
			fr: (m) => `Regarde le profil de ${m[1]}`, 
			en: (m) => `Viewing ${m[1]}'s profile` 
		},
        { type: 'regex', 
			regex: /^Viewing\s+(\S+)'s\s+repository$/i, 
			fr: (m) => `Jette un coup d'œil au dépôt de ${m[1]}`, 
			en: (m) => `Viewing ${m[1]}'s repository` 
		},
        { type: 'regex', 
			regex: /^Viewing\s+(\S+)'s\s+repositories$/i, 
			fr: (m) => `Consulte les dépôts de ${m[1]}`, 
			en: (m) => `Viewing ${m[1]}'s repositories` 
		},
        { type: 'regex', 
			regex: /^Viewing\s+(\S+)'s\s+project$/i, 
			fr: (m) => `Consulte le projet de ${m[1]}`, 
			en: (m) => `Viewing ${m[1]}'s project` 
		},
        { type: 'regex', 
			regex: /^Viewing\s+(\S+)'s\s+projects$/i, 
			fr: (m) => `Consulte les projets de ${m[1]}`, 
			en: (m) => `Viewing ${m[1]}'s projects` 
		},
        { type: 'regex', 
			regex: /^Viewing\s+(\S+)'s\s+stars$/i, 
			fr: (m) => `Émerveillé par les stars de ${m[1]}`, 
			en: (m) => `Viewing ${m[1]}'s stars` 
		},
        { type: 'regex', 
			regex: /^Viewing\s+(\S+)'s\s+packages$/i, 
			fr: (m) => `Consulte les paquets de ${m[1]}`, 
			en: (m) => `Viewing ${m[1]}'s packages` 
		},
        { type: 'regex', 
			regex: /^Viewing\s+settings$/i, 
			fr: () => "Modifie ses paramètres", 
			en: () => "Changing settings" 
		},
        { type: 'regex', 
			regex: /^Viewing\s+an\s+organization$/i, 
			fr: () => "Contemple une organisation", 
			en: () => "Viewing an organization" 
		}
    ],
    animeSama: [
        { type: 'exact', 
			match: "Visionne la page d'accueil", 
			fr: (trans) => trans.anime.home, 
			en: (trans) => trans.anime.home 
		},
        { type: 'exact', 
			match: "Regarde le planning des sorties", 
			fr: (trans) => trans.anime.schedule, 
			en: (trans) => trans.anime.schedule 
		},
        { type: 'exact', 
			match: "Parcourt le catalogue", 
			fr: (trans) => trans.anime.catalog, 
			en: (trans) => trans.anime.catalog 
		},
        { type: 'exact', 
			match: "Visionne son profil", 
			fr: (trans) => trans.anime.profile, 
			en: (trans) => trans.anime.profile 
		},
        { type: 'regex', 
			regex: /^Regarde la page de\s+/i, 
			fr: (m, trans, text) => text.replace(/^Regarde la page de\s+/i, `${trans.anime.watchingPage} `), 
			en: (m, trans, text) => text.replace(/^Regarde la page de\s+/i, `${trans.anime.watchingPage} `) 
		},
        { type: 'regex', 
			regex: /^Regarde\s+/i, 
			fr: (m, trans, text) => text.replace(/^Regarde\s+/i, `${trans.anime.watching} `), 
			en: (m, trans, text) => text.replace(/^Regarde\s+/i, `${trans.anime.watching} `) 
		}
    ],
    verb: [
        { type: 'regex', 
			regex: /^browsing/i, 
			fr: (m, trans, text) => text.replace(/^browsing/i, trans.browsing), 
			en: (m, trans, text) => text.replace(/^browsing/i, trans.browsing) 
		},
        { type: 'regex', 
			regex: /^viewing/i, 
			fr: (m, trans, text) => text.replace(/^viewing/i, trans.viewing), 
			en: (m, trans, text) => text.replace(/^viewing/i, trans.viewing) 
		},
        { type: 'regex', 
			regex: /^editing/i, 
			fr: (m, trans, text) => text.replace(/^editing/i, trans.editing), 
			en: (m, trans, text) => text.replace(/^editing/i, trans.editing) 
		}
    ],
    vscode: [
        { type: 'regex', 
			regex: /Workspace:\s*/i, 
			fr: (m, trans) => `${trans.project}: `, 
			en: (m, trans) => `${trans.project}: ` 
		}
    ]
};

export const translate = (text, type = 'verb') => {
    if (!text) return text;
    const locale = getLocale();
    const trans = translations[locale];
    
    const typeRules = rules[type] || rules['verb'];

    for (const rule of typeRules) {
        if (rule.type === 'exact') {
            if (text.toLowerCase().trim() === rule.match.toLowerCase()) {
                return locale === 'fr' ? rule.fr(trans) : rule.en(trans);
            }
        } else if (rule.type === 'regex') {
            const match = text.match(rule.regex);
            if (match) {
                return locale === 'fr' ? rule.fr(match, trans, text) : rule.en(match, trans, text);
            }
        }
    }
    
    if (type === 'github') return locale === 'fr' ? "Scroll sur GitHub" : "Scrolling on GitHub";
    
    return text;
};