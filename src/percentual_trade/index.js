export default (function () {
	var active = null;
	const ratio = {
		attack_ship: { w: 1, s: 0.2308, i: 0.6154 },
		bireme: { w: 1, s: 0.875, i: 0.225 },
		trireme: { w: 1, s: 0.65, i: 0.65 },
		slinger: { w: 0.55, s: 1, i: 0.4 },
		rider: { w: 0.6666, s: 0.3333, i: 1 },
		sword: { w: 1, s: 0, i: 0.8947 },
		hoplite: { w: 0, s: 0.5, i: 1 },
		archer: { w: 1, s: 0, i: 0.625 },
		chariot: { w: 0.4545, s: 1, i: 0.7273 },
		wall_level: { w: 0, s: 1, i: 0.7 },
	};

	function addResources() {
		if (!active) return;
		const town = uw.ITowns.getCurrentTown();
		let wood, stone, iron;

		const getCountWithTrade = () => {
			let resources = town.resources();
			let d_wood = resources.wood / ratio[active].w;
			let d_stone = resources.stone / ratio[active].s;
			let d_iron = resources.iron / ratio[active].i;
			let min_resouces = Math.min(d_wood, d_stone, d_iron); // min ammount

			let trade = town.getAvailableTradeCapacity();
			let max_trade = trade / (ratio[active].w + ratio[active].s + ratio[active].i); // max tradable

			if (max_trade < min_resouces) return max_trade;
			else return min_resouces;
		};

		const trade = town.getAvailableTradeCapacity();
		const resources = town.getCurrentResources();
		const min = getCountWithTrade();

		wood = ratio[active].w * min;
		stone = ratio[active].s * min;
		iron = ratio[active].i * min;

		const windowOpened = uw.GPWindowMgr.getOpen(uw.GPWindowMgr.TYPE_TOWN);
		/* aggiorniamo tutte le finestre delle meraviglie con le materie bilanciare */
		for (const window of windowOpened) {
			const windowID = `#gpwnd_${window.getID()} `;
			requestAnimationFrame(() =>
				uw.$(`${windowID} #trade_type_wood [type="text"]`).select().val(wood).blur(),
			);
			requestAnimationFrame(() =>
				uw.$(`${windowID} #trade_type_stone [type="text"]`).select().val(stone).blur(),
			);
			requestAnimationFrame(() =>
				uw.$(`${windowID} #trade_type_iron [type="text"]`).select().val(iron).blur(),
			);
		}
	}

	function activate(name) {
		uw.$('#app_trade div').css('box-shadow', '');

		if (name !== active) {
			uw.$(`#app_trade .${name}`).css('box-shadow', '0px 0px 10px 5px rgb(34 255 0)');
			active = name;
			addResources();
		} else {
			active = null;
			const windowOpened = uw.GPWindowMgr.getOpen(uw.GPWindowMgr.TYPE_TOWN);
			/* aggiorniamo tutte le finestre delle meraviglie con le materie bilanciare */
			for (const window of windowOpened) {
				const windowID = `#gpwnd_${window.getID()} `;

				requestAnimationFrame(() =>
					uw.$(`${windowID} #trade_type_wood [type="text"]`).select().val(0).blur(),
				);
				requestAnimationFrame(() =>
					uw.$(`${windowID} #trade_type_stone [type="text"]`).select().val(0).blur(),
				);
				requestAnimationFrame(() =>
					uw.$(`${windowID} #trade_type_iron [type="text"]`).select().val(0).blur(),
				);
			}
		}
	}

	uw.$(document).ajaxComplete(function (event, xhr, options) {
		const urlParams = options.url.split('?');
		const queryParams = urlParams[1] ? urlParams[1].split('&') : [];
		const actionParam = queryParams[1] ? queryParams[1].split('=')[1] : '';
		const action = `${urlParams[0].substr(5)}/${actionParam.substr(7)}`;

		if (action === '/town_info/') {
			/* Get the current town */
			addResources();

			if (uw.$('#app_trade').length) return;
			uw.$('#trade .content').append(
				"<div id='app_trade' style='width:56%; margin:20px auto; grid-template-columns: repeat(5, 20%); display:grid'></div>",
			);

			var troops = [
				'attack_ship',
				'bireme',
				'trireme',
				'sword',
				'slinger',
				'archer',
				'hoplite',
				'rider',
				'chariot',
			];

			troops.forEach((e) => {
				uw.$('#app_trade').append(
					uw.$('<div>', {
						class: 'option_s unit index_unit unit_icon40x40 ' + e,
						click: () => activate(e),
						style: e === active ? 'box-shadow: 0px 0px 10px 5px rgb(34 255 0)' : '',
					}),
				);
			});

			uw.$('#app_trade').append(
				uw.$('<div>', {
					class: 'option_s unit index_unit place_image wall_level',
					click: () => activate('wall_level'),
					style:
						'wall_level' === active ? 'box-shadow: 0px 0px 10px 5px rgb(34 255 0)' : '',
				}),
			);
		}
	});
})();
