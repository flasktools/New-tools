var translations = {
	greeting: {
		en: 'Hello!',
		fr: 'Bonjour!',
	},
	farewell: {
		en: 'Goodbye!',
		fr: 'Au revoir!',
	},
};

/* Convert the object, keep the current languge as default and remove all the others */
const language = typeof Game !== 'undefined' && Game.market_id ? Game.market_id : 'en';
translations = Object.entries(translations).reduce(
	(acc, [key, value]) => ((acc[key] = value[language]), acc),
	{},
);

export default translations;
