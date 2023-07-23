// ==UserScript==
// @name The Script
// @description A script for grepolis
// @version 0.0.1
// @author Sau1707
// @match https://*.grepolis.com/game/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(() => {
	class Base {
		subscribe(type, fnt) {
			$.Observer(GameEvents.window.open).subscribe(fnt.name, (event, data) => {
				if (!data.wnd) return;
				if (data.wnd.type !== type) return;
				fnt(data.wnd);
			});
		}

		unsubscribe(fnt) {
			$.Observer(GameEvents.window.open).unsubscribe(fnt.name);
		}
	}

	const storage = {
		save: function (key, value) {
			var jsonString = JSON.stringify(value);
			localStorage.setItem(key, jsonString);
		},

		load: function (key, missing) {
			var jsonString = localStorage.getItem(key);
			if (jsonString === null) {
				return missing;
			}
			return JSON.parse(jsonString);
		},

		remove: function (key) {
			localStorage.removeItem(key);
		}
	};

	var translations = {
		greeting: {
			en: 'Hello!',
			fr: 'Bonjour!'
		},
		farewell: {
			en: 'Goodbye!',
			fr: 'Au revoir!'
		}
	};

	const language = typeof Game !== 'undefined' && Game.market_id ? Game.market_id : 'en';
	translations = Object.entries(translations).reduce((acc, [key, value]) => ((acc[key] = value[language]), acc), {});

	class BugFixes extends Base {
		activate() {
			this.subscribe(GPWindowMgr.TYPE_PLAYER_SETTINGS, this.onOpenSettings);
		}

		deactivate() {
			this.unsubscribe(this.onOpenSettings);
			let a = 1;
			let b = 2;
			let c = 3;
			let d = 4;
		}

		onOpenSettings() {
			$('#version').css('position', 'unset');
		}
	}

	class BugFixes1 extends Base {
		activate() {
			this.subscribe(GPWindowMgr.TYPE_PLAYER_SETTINGS, this.onOpenSettings);
		}

		deactivate() {
			this.unsubscribe(this.onOpenSettings);
		}

		onOpenSettings() {
			$('#version').css('position', 'unset');
		}
	}
})();
