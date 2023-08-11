# The Script

Created with the idea of making a modular tool for the game Grepolis, this script is a collection of modules that can be activated and deactivated at will.

## Local development

Install node.js and npm. Then, run the following commands:

```bash
npm install
npm run dev
```

It will start a nodemon server that will automatically reload the script when a file is changed.

Add this to tampermonkey to test the script, and change the path to the script:

```
// ==UserScript==
// @name The Script
// @description A script for grepolis
// @version 0.0.1
// @author Sau1707
// @match https://*.grepolis.com/game/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      file://C:\Users\Administrator\Documents\NEW-TOOLS\dist\newTool.user.js
// ==/UserScript==
```

## Create a new module

Under the folder modules, place all the modules. All the modules are automatically imported in the final script:

Each module need to have:

-   The same class name as the filename, for example: \
    `class ModuleName` for the file `ModuleName.js`
-   An activate method that is called when the module is activated
-   A deactivate method that is called when the module is deactivated

```js
import Base from '../setup.js';

class ModuleName extends Base {
	activate() {
		// be sure that the module is properly activated
	}

	deactivate() {
		// make sure that the module is properly deactivated
	}
}
```

## Storage

These utilities provide a simple API for storing, retrieving, and removing items from localStorage. The functions are:

```js
import storage from './src/storage.js';

// Saves a key-value pair to localStorage.
storage.save('key', { foo: 'bar' });

//  Retrieves a value from localStorage. If the value does not exist, it returns a provided default value.
const key = storage.load('key', { foo: 'bar' });

// Removes a key from localStorage. If the key does not exist, this function does nothing.
storage.remove('key');
```

## Translations

The transations can be found under `src/translations.js`. The translations are in a js object, as shown in the example below:

```js
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
```

To use them, simply import the translations and use the `translate` function:

```js
import translations from './src/translations.js';
console.log(translations.greeting); // Hello!
console.log(translations.greeting.en); // this is an error (undefined)
```

The object gets automatically converted so that the default translation is the current game language.
