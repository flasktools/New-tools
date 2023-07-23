import storage from './src/storage.js';
import translations from './src/translations.js';

console.log(storage);
console.log(translations.greeting);
console.log(translations.farewell);

import ITowns from './utility/ITowns.js';

const town = ITowns.getCurrentTown();
